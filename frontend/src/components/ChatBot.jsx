import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Footprints,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
  Calendar,
  Locate,
  ShieldAlert,
  Map as MapIcon,
} from "lucide-react";

// Same backend the rest of the site uses. Set VITE_API_URL in frontend/.env to override.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const STORAGE_KEY = "solecraft-chat";

const WELCOME = {
  role: "assistant",
  isWelcome: true, // UI only — never sent to the server
  text: "Hi! I'm **Sole** 👟 Tell me what's wrong with your shoes (or what you'd like done) and I'll find the right cobbler for you in Pune.",
};

const STARTERS = [
  "My shoe sole came off",
  "Polish my leather shoes",
  "Restore old vintage shoes",
  "Custom paint my sneakers",
  "I need a quick repair today",
];

function loadSaved() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    if (saved && Array.isArray(saved.messages) && saved.messages.length) return saved;
  } catch {
    /* storage unavailable */
  }
  return { messages: [WELCOME], location: null };
}

// ------------- tiny safe markdown: **bold**, [links](/path), bullet lists -------------
function renderInline(text, onInternalLink, keyPrefix) {
  const parts = [];
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      parts.push(
        <strong key={`${keyPrefix}-b${i++}`} className="text-white font-semibold">
          {m[1]}
        </strong>
      );
    } else {
      const [label, href] = [m[2], m[3]];
      const cls = "text-amber-400 font-medium underline underline-offset-2 hover:text-amber-300";
      if (href.startsWith("/")) {
        parts.push(
          <a
            key={`${keyPrefix}-l${i++}`}
            href={href}
            className={cls}
            onClick={(e) => {
              e.preventDefault();
              onInternalLink(href);
            }}
          >
            {label}
          </a>
        );
      } else if (/^(https?:|mailto:|tel:)/i.test(href)) {
        parts.push(
          <a key={`${keyPrefix}-l${i++}`} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {label}
          </a>
        );
      } else {
        parts.push(label);
      }
    }
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function FormattedText({ text, onInternalLink }) {
  const blocks = [];
  let list = null;
  text.split("\n").forEach((raw) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
    if (bullet) {
      if (!list) {
        list = { ordered: /^\s*\d+\./.test(line), items: [] };
        blocks.push(list);
      }
      list.items.push(bullet[1]);
      return;
    }
    list = null;
    if (line.trim()) blocks.push({ text: line.replace(/^#{1,6}\s+(.*)$/, "**$1**") });
  });
  return (
    <div className="space-y-1.5">
      {blocks.map((b, bi) =>
        b.items ? (
          React.createElement(
            b.ordered ? "ol" : "ul",
            { key: bi, className: `${b.ordered ? "list-decimal" : "list-disc"} pl-5 space-y-0.5` },
            b.items.map((it, k) => <li key={k}>{renderInline(it, onInternalLink, `${bi}-${k}`)}</li>)
          )
        ) : (
          <p key={bi}>{renderInline(b.text, onInternalLink, `${bi}`)}</p>
        )
      )}
    </div>
  );
}

// ------------------------------ cobbler card ------------------------------
function CobblerCard({ cobbler, rank, onBook, onMap }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 hover:border-amber-500/50 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            {rank === 0 && (
              <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-500 text-gray-900 px-1.5 py-0.5 rounded">
                Best match
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="font-semibold text-white truncate">{cobbler.name}</span>
            {cobbler.verified && <CheckCircle className="w-4 h-4 text-green-400 shrink-0" aria-label="Verified" />}
          </div>
          {cobbler.speciality && <div className="text-xs text-amber-400">{cobbler.speciality}</div>}
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 text-sm text-white font-semibold">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            {cobbler.rating}
          </div>
          <div className="text-[11px] text-gray-400">{cobbler.reviews} reviews</div>
        </div>
      </div>

      {cobbler.reason && <p className="text-xs text-gray-300 mt-2 leading-relaxed">{cobbler.reason}</p>}

      <div className="mt-2 space-y-1 text-[11px] text-gray-400">
        <div className="flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 mt-px shrink-0" />
          <span>
            {cobbler.distance && <span className="text-gray-200 font-medium">{cobbler.distance} · </span>}
            {cobbler.address}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>{cobbler.hours}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {cobbler.services.map((s) => (
          <span
            key={s}
            className={`text-[10px] px-1.5 py-0.5 rounded border ${
              s === cobbler.suggestedService
                ? "border-amber-500/60 bg-amber-500/10 text-amber-300"
                : "border-gray-700 text-gray-400"
            }`}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onBook(cobbler)}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-lg py-2 hover:from-amber-400 hover:to-amber-500 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book{cobbler.suggestedService ? ` ${cobbler.suggestedService}` : ""}
        </button>
        <button
          onClick={() => onMap(cobbler)}
          className="px-2.5 rounded-lg border border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
          title="Show on map"
          aria-label={`Show ${cobbler.name} on map`}
        >
          <MapIcon className="w-4 h-4" />
        </button>
        {cobbler.phone && (
          <a
            href={`tel:${cobbler.phone.replace(/\s/g, "")}`}
            className="px-2.5 flex items-center rounded-lg border border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
            title={`Call ${cobbler.phone}`}
            aria-label={`Call ${cobbler.name}`}
          >
            <Phone className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

// ------------------------------- the widget -------------------------------
const ChatBot = () => {
  const saved = useRef(loadSaved()).current;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(saved.messages);
  const [userLocation, setUserLocation] = useState(saved.location);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: messages.slice(-30), location: userLocation }));
    } catch {
      /* ignore */
    }
  }, [messages, userLocation]);

  useEffect(() => {
    const box = scrollRef.current;
    if (!box) return;
    const last = messages[messages.length - 1];
    // For replies with cobbler cards, scroll to the start of the reply so the
    // "Best match" card is visible; otherwise stick to the bottom.
    if (!isLoading && last?.role === "assistant" && last.cobblers?.length) {
      const el = box.querySelector(`[data-msg="${messages.length - 1}"]`);
      if (el) {
        box.scrollTop = el.offsetTop - box.offsetTop - 8;
        return;
      }
    }
    box.scrollTop = box.scrollHeight;
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen && window.innerWidth >= 640) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const sendMessage = async (text, locOverride) => {
    const content = text.trim();
    if (!content || isLoading) return;

    const history = [...messages, { role: "user", text: content }];
    setMessages(history);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: location.pathname,
          location: locOverride || userLocation || undefined,
          messages: history
            .filter((m) => !m.isWelcome && !m.isLocal)
            .map(({ role, text, recommendedIds, sig }) => ({ role, text, recommendedIds, sig })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || `Request failed (${res.status})`);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
          cobblers: data.cobblers || [],
          recommendedIds: data.recommendedIds || [],
          quickReplies: data.quickReplies || [],
          needsLocation: !!data.needsLocation,
          redacted: !!data.redacted,
          sig: data.sig,
        },
      ]);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Can't reach the assistant. Make sure the backend server is running."
          : err.message
      );
      setMessages((prev) => prev.slice(0, -1));
      setInput(content);
    } finally {
      setIsLoading(false);
    }
  };

  const shareLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser can't share location. Just tell me your area instead (e.g. \"I'm in Kothrud\").");
      return;
    }
    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setLocating(false);
        sendMessage("I've shared my location. Which cobblers are closest for my need?", loc);
      },
      () => {
        setLocating(false);
        setError("Location access was blocked. You can type your area instead (e.g. \"I'm in Kothrud\").");
      },
      { timeout: 10000 }
    );
  };

  const resetChat = () => {
    setMessages([WELCOME]);
    setError("");
    setInput("");
  };

  const closeOnMobile = () => {
    if (window.innerWidth < 640) setIsOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    closeOnMobile();
  };

  // Hand off to the existing booking form on the Find Cobblers page
  const bookCobbler = (c) => {
    navigate("/find-cobblers", {
      state: { bookCobblerId: c.id, serviceType: c.suggestedService || "", requestedAt: Date.now() },
    });
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        isLocal: true,
        text: `Opening the booking form for **${c.name}**. Pick a date and time slot there. You'll need to be logged in.`,
      },
    ]);
    closeOnMobile();
  };

  const showOnMap = (c) => {
    navigate("/find-cobblers", { state: { focusCobblerId: c.id, requestedAt: Date.now() } });
    closeOnMobile();
  };

  const lastMsg = messages[messages.length - 1];
  const showStarters = messages.length <= 1 && !isLoading;
  const quickReplies = !isLoading && lastMsg?.role === "assistant" && !lastMsg.isLocal ? lastMsg.quickReplies || [] : [];
  const askLocation = !isLoading && lastMsg?.needsLocation && !userLocation;

  return (
    <>
      <div
        className={`fixed z-[35] bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-[400px] flex flex-col bg-gray-800 text-gray-100 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden origin-bottom-right transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{ height: "min(640px, calc(100vh - 11.5rem))" }}
        role="dialog"
        aria-label="SoleCraft cobbler assistant"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                <Footprints className="h-5 w-5 text-gray-900" />
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-gray-900" />
            </div>
            <div>
              <div className="font-semibold leading-tight text-white">Sole · Cobbler Finder</div>
              <div className="text-xs text-gray-400">
                {userLocation ? (
                  <span className="text-green-400">📍 Using your location</span>
                ) : (
                  "AI assistant · Pune"
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={resetChat}
              className="p-2 rounded-full text-gray-400 hover:text-amber-400 hover:bg-gray-800 transition-colors"
              title="Start a new chat"
              aria-label="Start a new chat"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3 bg-gray-800">
          {messages.map((m, i) => (
            <div key={i} data-msg={i} className="space-y-2">
              <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="h-7 w-7 mr-2 mt-1 shrink-0 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Footprints className="h-3.5 w-3.5 text-gray-900" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed break-words ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-medium rounded-2xl rounded-br-md whitespace-pre-wrap"
                      : "bg-gray-700/70 text-gray-200 border border-gray-700 rounded-2xl rounded-bl-md"
                  }`}
                >
                  {m.role === "user" ? m.text : <FormattedText text={m.text} onInternalLink={goTo} />}
                </div>
              </div>

              {m.redacted && (
                <div className="ml-9 flex items-start gap-1.5 text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 mt-px shrink-0" />
                  <span>For your safety, personal details were hidden from the assistant. You'll enter contact details in the booking form.</span>
                </div>
              )}

              {m.cobblers?.length > 0 && (
                <div className="ml-9 space-y-2">
                  {m.cobblers.map((c, k) => (
                    <CobblerCard key={c.id} cobbler={c} rank={k} onBook={bookCobbler} onMap={showOnMap} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center">
              <div className="h-7 w-7 mr-2 shrink-0 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <Footprints className="h-3.5 w-3.5 text-gray-900" />
              </div>
              <div className="bg-gray-700/70 border border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="h-2 w-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          )}

          {(showStarters || quickReplies.length > 0 || askLocation) && (
            <div className="pl-9 flex flex-wrap gap-2">
              {askLocation && (
                <button
                  onClick={shareLocation}
                  disabled={locating}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500 text-gray-900 hover:bg-amber-400 flex items-center gap-1 disabled:opacity-60 transition-colors"
                >
                  <Locate className="w-3.5 h-3.5" />
                  {locating ? "Locating..." : "Share my location"}
                </button>
              )}
              {(showStarters ? STARTERS : quickReplies).map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-amber-500/40 text-amber-300 bg-gray-900/40 hover:bg-amber-500/10 hover:border-amber-400 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && <div className="px-4 py-2 text-xs text-red-300 bg-red-500/10 border-t border-red-500/20">{error}</div>}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="p-3 border-t border-gray-700 bg-gray-900 flex items-end gap-2"
        >
          {!userLocation && (
            <button
              type="button"
              onClick={shareLocation}
              disabled={locating || isLoading}
              className="h-10 w-10 shrink-0 rounded-xl border border-gray-700 text-gray-400 flex items-center justify-center hover:text-amber-400 hover:border-amber-500 disabled:opacity-40 transition-colors"
              title="Share my location to find nearby cobblers"
              aria-label="Share my location"
            >
              <Locate className="h-4 w-4" />
            </button>
          )}
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            maxLength={1000}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Describe your shoe problem..."
            className="flex-1 resize-none max-h-28 rounded-xl border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500 px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 flex items-center justify-center shadow-md hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Launcher */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed z-[35] bottom-6 right-4 sm:right-6 h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-gray-900 shadow-xl shadow-amber-500/20 flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label={isOpen ? "Close chat" : "Open cobbler finder chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-400 border-2 border-gray-900" />}
      </button>
    </>
  );
};

export default ChatBot;
