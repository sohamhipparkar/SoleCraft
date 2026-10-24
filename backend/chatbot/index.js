// POST /api/chat — the SoleCraft chatbot endpoint.
// Registered from server.js with:  registerChatbot(app, { Cobbler });

const crypto = require("crypto");
const { buildSystemPrompt } = require("./knowledge");
const { askGemini, ChatError } = require("./gemini");
const guard = require("./guardrails");

const MAX_COBBLERS_IN_PROMPT = 40;

function distanceKm(a, b) {
  const R = 6371;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function formatDistance(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function parseLocation(loc) {
  if (!loc || typeof loc !== "object") return null;
  const lat = Number(loc.lat);
  const lng = Number(loc.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng };
}

async function loadCobblers(Cobbler, location) {
  const docs = await Cobbler.find({ isActive: true })
    .select("cobblerId name address location rating reviews hours services speciality verified availableSlots phone")
    .limit(500)
    .lean();

  let list = docs.map((c) => {
    const coords = c.location?.coordinates;
    const km =
      location && Array.isArray(coords) && coords.length === 2
        ? distanceKm(location, { lat: coords[1], lng: coords[0] })
        : null;
    return { ...c, km };
  });

  if (location) list.sort((a, b) => (a.km ?? Infinity) - (b.km ?? Infinity));
  else list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  return list.slice(0, MAX_COBBLERS_IN_PROMPT);
}

// One line per cobbler. Coordinates and emails are NOT sent to Gemini.
function cobblersToText(list) {
  return list
    .map((c) =>
      [
        c.cobblerId,
        c.name,
        `services: ${(c.services || []).join(", ") || "none"}`,
        `speciality: ${c.speciality || "general"}`,
        `rating ${c.rating}/5 (${c.reviews} reviews)`,
        c.verified ? "verified" : "not verified",
        `hours ${c.hours}`,
        `address: ${c.address}`,
        c.km != null ? `distance ${formatDistance(c.km)}` : null,
      ]
        .filter(Boolean)
        .join(" | ")
    )
    .join("\n");
}

function toCard(c, rec) {
  return {
    id: String(c._id), // MongoDB id, used by the Find Cobblers page to open the booking form
    cobblerId: c.cobblerId,
    name: c.name,
    rating: c.rating,
    reviews: c.reviews,
    verified: !!c.verified,
    speciality: c.speciality,
    services: c.services || [],
    hours: c.hours,
    address: c.address,
    phone: c.phone,
    distance: c.km != null ? formatDistance(c.km) : null,
    availableSlots: (c.availableSlots || []).slice(0, 4),
    reason: String(rec.reason || "").slice(0, 300),
    suggestedService: (c.services || []).includes(rec.suggestedService) ? rec.suggestedService : null,
  };
}

function registerChatbot(app, { Cobbler }) {
  const secret = process.env.CHAT_SIGNING_SECRET || process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");
  const allowedOrigins = (process.env.CHAT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim().replace(/\/$/, ""))
    .filter(Boolean);
  const rateLimit = guard.createRateLimiter({
    perMinute: Number(process.env.CHAT_RATE_LIMIT_PER_MINUTE) || 15,
    perDay: Number(process.env.CHAT_RATE_LIMIT_PER_DAY) || 200,
  });

  app.post("/api/chat", async (req, res) => {
    const ip = req.ip || req.socket?.remoteAddress || "unknown";
    const fail = (status, error) => res.status(status).json({ success: false, error });

    try {
      // Guardrail: only our own website may call this from a browser
      if (!guard.isOriginAllowed(req.get("origin"), allowedOrigins)) {
        console.warn(`[chat] blocked origin ${req.get("origin")}`);
        return fail(403, "This chat can only be used from the SoleCraft website.");
      }

      // Guardrail: rate limit per IP
      const limit = rateLimit(ip);
      if (!limit.allowed) {
        console.warn(`[chat] rate limited ${ip}`);
        return fail(429, limit.message);
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "your_gemini_api_key_here") {
        return fail(500, "The chatbot isn't set up yet: add GEMINI_API_KEY to backend/.env and restart the server.");
      }

      // Guardrail: validate input + drop forged bot messages
      const checked = guard.validateMessages(req.body?.messages, secret);
      if (checked.error) return fail(400, checked.error);
      if (checked.droppedForged) console.warn(`[chat] dropped ${checked.droppedForged} unsigned assistant message(s) from ${ip}`);

      // Guardrail: remove personal data before anything is sent to Google
      const contents = checked.messages.map((m) => {
        if (m.role === "assistant") {
          const note = m.recommendedIds.length ? `\n[Recommended cobblers: ${m.recommendedIds.join(", ")}]` : "";
          return { role: "model", parts: [{ text: m.text + note }] };
        }
        return { role: "user", parts: [{ text: guard.redactPersonalData(m.text).text }] };
      });
      const lastWasRedacted = guard.redactPersonalData(checked.messages[checked.messages.length - 1].text).redacted;

      const location = parseLocation(req.body?.location);
      const cobblers = await loadCobblers(Cobbler, location);
      const canary = guard.createCanary();
      const page = typeof req.body?.page === "string" ? req.body.page.slice(0, 60).replace(/[^\w/-]/g, "") : "";

      const { data, blocked } = await askGemini({
        apiKey,
        preferredModel: process.env.GEMINI_MODEL,
        systemPrompt: buildSystemPrompt({ cobblersText: cobblersToText(cobblers), page, hasLocation: !!location, canary }),
        contents,
      });

      const safeFallback = "Sorry, I can't help with that. I can help you find the right cobbler or answer questions about SoleCraft.";
      let reply = safeFallback;
      let cards = [];
      let quickReplies = [];
      let needsLocation = false;

      if (blocked) {
        console.warn(`[chat] Gemini safety filter blocked a message from ${ip}`);
      } else if (data) {
        // Guardrail: block prompt leaks, cap length
        const out = guard.sanitizeReply(data.reply, canary);
        if (out.leaked) console.warn(`[chat] canary leak blocked for ${ip}`);
        else if (out.text) reply = out.text;

        if (!out.leaked) {
          // Guardrail: only cobblers that really exist in the database can be shown
          const byId = new Map(cobblers.map((c) => [c.cobblerId, c]));
          const seen = new Set();
          for (const rec of Array.isArray(data.recommendations) ? data.recommendations : []) {
            const c = byId.get(rec?.cobblerId);
            if (!c || seen.has(c.cobblerId)) continue;
            seen.add(c.cobblerId);
            cards.push(toCard(c, rec));
            if (cards.length === 3) break;
          }
          quickReplies = (Array.isArray(data.quickReplies) ? data.quickReplies : [])
            .filter((q) => typeof q === "string" && q.trim())
            .map((q) => q.trim().slice(0, 40))
            .slice(0, 4);
          needsLocation = data.needsLocation === true && !location;
        }
      }

      const recommendedIds = cards.map((c) => c.cobblerId);
      return res.json({
        success: true,
        reply,
        cobblers: cards,
        recommendedIds,
        quickReplies,
        needsLocation,
        redacted: lastWasRedacted,
        sig: guard.signAssistantMessage(secret, reply, recommendedIds),
      });
    } catch (err) {
      const status = err instanceof ChatError ? err.status : 500;
      console.error("[chat]", err.message);
      return fail(status, err instanceof ChatError ? err.message : "Something went wrong. Please try again.");
    }
  });
}

module.exports = { registerChatbot, cobblersToText, loadCobblers, distanceKm };
