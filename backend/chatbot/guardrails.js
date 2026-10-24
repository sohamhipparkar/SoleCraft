// Safety checks ("guardrails") for the chatbot.
// Each function is small and independent so it is easy to read and test.

const crypto = require("crypto");

// ---------------------------------------------------------------------------
// 1. Rate limiting — stops one person (or a bot) from using up your Gemini quota.
//    In-memory, per IP address. Limits can be changed in .env.
// ---------------------------------------------------------------------------
function createRateLimiter({ perMinute = 15, perDay = 200 } = {}) {
  const hits = new Map(); // ip -> array of timestamps (last 24h)
  const DAY = 24 * 60 * 60 * 1000;

  // clean up old entries every 10 minutes so memory doesn't grow forever
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [ip, times] of hits) {
      const recent = times.filter((t) => now - t < DAY);
      if (recent.length) hits.set(ip, recent);
      else hits.delete(ip);
    }
  }, 10 * 60 * 1000);
  timer.unref?.();

  return function check(ip) {
    const now = Date.now();
    const times = (hits.get(ip) || []).filter((t) => now - t < DAY);
    const lastMinute = times.filter((t) => now - t < 60 * 1000).length;
    if (lastMinute >= perMinute) {
      return { allowed: false, message: "You're sending messages too quickly. Please wait a minute and try again." };
    }
    if (times.length >= perDay) {
      return { allowed: false, message: "You've reached today's chat limit. Please contact support@solecraft.com for more help." };
    }
    times.push(now);
    hits.set(ip, times);
    return { allowed: true };
  };
}

// ---------------------------------------------------------------------------
// 2. Origin check — only your own website may call the chat API from a browser.
//    Localhost is always allowed for development. Add your deployed site in
//    CHAT_ALLOWED_ORIGINS (comma separated), e.g. https://solecraft.vercel.app
// ---------------------------------------------------------------------------
function isOriginAllowed(origin, allowedList = []) {
  if (!origin) return true; // non-browser tools send no Origin; they are still rate limited
  try {
    const { hostname } = new URL(origin);
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  } catch {
    return false;
  }
  return allowedList.includes(origin.replace(/\/$/, ""));
}

// ---------------------------------------------------------------------------
// 3. Personal-data redaction — card numbers, Aadhaar, OTPs/passwords, emails and
//    phone numbers are removed BEFORE the message is sent to Google.
// ---------------------------------------------------------------------------
function luhnValid(digits) {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

function redactPersonalData(text) {
  let redacted = false;
  const mark = () => {
    redacted = true;
    return "[REDACTED]";
  };
  let out = text;

  // card numbers: 13–19 digits, optionally separated by spaces/dashes, must pass Luhn check
  out = out.replace(/\b(?:\d[ -]?){12,18}\d\b/g, (m) => {
    const digits = m.replace(/\D/g, "");
    return digits.length >= 13 && digits.length <= 19 && luhnValid(digits) ? mark() : m;
  });
  // Aadhaar: 12 digits, usually 4-4-4
  out = out.replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4}\b/g, mark);
  // passwords / OTP / CVV / PIN followed by a value
  out = out.replace(/\b(password|passcode|pwd|otp|cvv|cvc|pin)\b(\s*(?:is|=|:)?\s*)\S+/gi, (m, word, sep) => `${word}${sep}${mark()}`);
  // emails
  out = out.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, mark);
  // phone numbers (Indian & international formats, 10+ digits)
  out = out.replace(/(?:\+?\d{1,3}[ -]?)?(?:\(?\d{2,5}\)?[ -]?)?\d{3,5}[ -]?\d{4,5}\b/g, (m) =>
    m.replace(/\D/g, "").length >= 10 ? mark() : m
  );

  return { text: out, redacted };
}

// ---------------------------------------------------------------------------
// 4. Signed history — the browser sends the conversation back each time. Every
//    bot reply is signed with a secret so nobody can insert fake "assistant"
//    messages to trick the bot. Unsigned/forged bot messages are dropped.
// ---------------------------------------------------------------------------
function signAssistantMessage(secret, text, recommendedIds = []) {
  return crypto
    .createHmac("sha256", secret)
    .update(`${text}\u0000${recommendedIds.join(",")}`)
    .digest("hex");
}

function verifyAssistantMessage(secret, msg) {
  if (typeof msg.sig !== "string" || msg.sig.length !== 64) return false;
  const expected = signAssistantMessage(secret, msg.text, msg.recommendedIds || []);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(msg.sig));
}

// ---------------------------------------------------------------------------
// 5. Input validation — size limits and allowed roles only.
// ---------------------------------------------------------------------------
const LIMITS = { maxMessages: 20, maxUserChars: 1000, maxAssistantChars: 3000 };

function validateMessages(messages, secret) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { error: "Please send a message." };
  }
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user" || typeof last.text !== "string" || !last.text.trim()) {
    return { error: "The last message must be your question." };
  }
  if (last.text.length > LIMITS.maxUserChars) {
    return { error: `Please keep messages under ${LIMITS.maxUserChars} characters.` };
  }

  let dropped = 0;
  const clean = [];
  for (const m of messages.slice(-LIMITS.maxMessages)) {
    if (!m || typeof m.text !== "string") continue;
    if (m.role === "user") {
      clean.push({ role: "user", text: m.text.trim().slice(0, LIMITS.maxUserChars) });
    } else if (m.role === "assistant") {
      const ids = Array.isArray(m.recommendedIds) ? m.recommendedIds.filter((x) => typeof x === "string").slice(0, 3) : [];
      if (m.text.length <= LIMITS.maxAssistantChars && verifyAssistantMessage(secret, { ...m, recommendedIds: ids })) {
        clean.push({ role: "assistant", text: m.text, recommendedIds: ids });
      } else {
        dropped++;
      }
    }
  }
  while (clean.length && clean[0].role !== "user") clean.shift();
  return { messages: clean.filter((m) => m.text), droppedForged: dropped };
}

// ---------------------------------------------------------------------------
// 6. Output checks — canary token detects prompt leaks; text is length-capped.
// ---------------------------------------------------------------------------
function createCanary() {
  return `SC-CANARY-${crypto.randomBytes(6).toString("hex")}`;
}

function sanitizeReply(text, canary) {
  if (typeof text !== "string") return { text: "", leaked: false };
  if (canary && text.includes(canary)) return { text: "", leaked: true };
  return { text: text.trim().slice(0, 1500), leaked: false };
}

// Gemini's own content filters, set to the strictest level.
const SAFETY_SETTINGS = [
  "HARM_CATEGORY_HARASSMENT",
  "HARM_CATEGORY_HATE_SPEECH",
  "HARM_CATEGORY_SEXUALLY_EXPLICIT",
  "HARM_CATEGORY_DANGEROUS_CONTENT",
].map((category) => ({ category, threshold: "BLOCK_LOW_AND_ABOVE" }));

module.exports = {
  createRateLimiter,
  isOriginAllowed,
  redactPersonalData,
  signAssistantMessage,
  verifyAssistantMessage,
  validateMessages,
  createCanary,
  sanitizeReply,
  SAFETY_SETTINGS,
  LIMITS,
};
