// Calls the Google Gemini API and asks for a structured (JSON) answer,
// so the website can show cobbler recommendations as cards.

const { SAFETY_SETTINGS } = require("./guardrails");

// Tried in order. GEMINI_MODEL from .env is tried first. If Google has retired a
// model name (HTTP 404), the next one is used automatically.
const FALLBACK_MODELS = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-flash-lite"];

const SERVICE_TYPES = ["Repair", "Polish", "Custom", "Exchange", "Restoration"];

// The exact shape of answer Gemini must return.
const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    reply: { type: "STRING", description: "Short friendly message shown to the customer." },
    recommendations: {
      type: "ARRAY",
      description: "0 to 3 cobblers from the COBBLER LIST, best first.",
      items: {
        type: "OBJECT",
        properties: {
          cobblerId: { type: "STRING", description: "Exact cobblerId from the list, e.g. COB003" },
          reason: { type: "STRING", description: "One sentence: why this cobbler fits the need." },
          suggestedService: { type: "STRING", enum: SERVICE_TYPES },
        },
        required: ["cobblerId", "reason", "suggestedService"],
      },
    },
    quickReplies: { type: "ARRAY", items: { type: "STRING" } },
    needsLocation: { type: "BOOLEAN" },
  },
  required: ["reply", "recommendations", "quickReplies", "needsLocation"],
};

class ChatError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function parseModelJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        /* fall through */
      }
    }
  }
  // Not JSON at all: show it as a plain reply with no recommendations.
  return { reply: text, recommendations: [], quickReplies: [], needsLocation: false };
}

/**
 * @returns {Promise<{ data: object|null, blocked: boolean, model: string }>}
 */
async function askGemini({ apiKey, preferredModel, systemPrompt, contents }) {
  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents,
    safetySettings: SAFETY_SETTINGS,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    },
  };

  const models = [...new Set([preferredModel, ...FALLBACK_MODELS].filter(Boolean))];
  let lastError = "unknown error";

  for (const model of models) {
    let res;
    try {
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(30000),
        }
      );
    } catch {
      throw new ChatError(502, "Couldn't reach the Gemini API. Check the server's internet connection.");
    }
    const json = await res.json().catch(() => ({}));

    if (res.ok) {
      if (json.promptFeedback?.blockReason) return { data: null, blocked: true, model };
      const candidate = json.candidates?.[0];
      if (!candidate || candidate.finishReason === "SAFETY" || candidate.finishReason === "PROHIBITED_CONTENT") {
        return { data: null, blocked: true, model };
      }
      const text = (candidate.content?.parts || []).map((p) => p.text || "").join("").trim();
      if (!text) {
        lastError = "empty answer";
        continue;
      }
      return { data: parseModelJson(text), blocked: false, model };
    }

    const message = json.error?.message || `HTTP ${res.status}`;
    if (res.status === 404) {
      lastError = message;
      continue;
    }
    if (res.status === 400 && /api key/i.test(message)) {
      throw new ChatError(500, "The Gemini API key was rejected. Check GEMINI_API_KEY in backend/.env.");
    }
    if (res.status === 403) {
      throw new ChatError(500, "Gemini refused the request (403). Check that the API key is valid.");
    }
    if (res.status === 429) {
      throw new ChatError(429, "The assistant is busy right now. Please try again in a few seconds.");
    }
    throw new ChatError(502, `Gemini error: ${message}`);
  }

  throw new ChatError(502, `No Gemini model was available (${lastError}). Try setting GEMINI_MODEL in backend/.env.`);
}

module.exports = { askGemini, ChatError, SERVICE_TYPES };
