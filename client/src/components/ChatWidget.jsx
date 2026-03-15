import { useState, useRef, useEffect } from "react";

const SESSION_KEY = "cl_chat_session";

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = "session_" + Date.now() + "_" + Math.random().toString(36).slice(2);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const welcomeMessage = {
  role: "assistant",
  content:
    "Hi! I am the ClassLink assistant. Ask me anything about our video classroom platform — features, pricing, how it works, or how to get started!",
};

const quickQuestions = [
  "What are the key features?",
  "How much does it cost?",
  "Is it free to start?",
];

const API_URL = "https://classlink-api.onrender.com";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map(({ role, content }) => ({ role, content }));

      const response = await fetch(API_URL + "/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          message: trimmed,
          history,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I ran into an issue. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleQuickQuestion(q) {
    sendMessage(q);
  }

  return (
    <>
      <button
        className="chat-widget-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open chat assistant"
      >
        <i className={"bi " + (open ? "bi-x-lg" : "bi-chat-dots-fill")} />
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="avatar-sm">
              <i className="bi bi-robot" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>
                ClassLink Assistant
              </div>
              <div style={{ fontSize: "0.72rem", opacity: 0.8 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4ade80",
                    marginRight: 4,
                  }}
                />
                Online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1rem",
                cursor: "pointer",
                opacity: 0.7,
              }}
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  "chat-bubble " + (msg.role === "user" ? "user" : "bot")
                }
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div
                className="chat-bubble bot d-flex gap-1 align-items-center"
                style={{ padding: "10px 14px" }}
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="d-flex flex-column gap-1 mt-1">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    style={{
                      background: "#f1f5f9",
                      border: "1px solid #e2e8f0",
                      borderRadius: 20,
                      padding: "5px 12px",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "#475569",
                      alignSelf: "flex-start",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="chat-input-area">
            <input
              ref={inputRef}
              className="form-control"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            <button
              className="btn btn-classlink d-flex align-items-center justify-content-center"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
            >
              <i className="bi bi-send-fill" style={{ fontSize: "0.85rem" }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
