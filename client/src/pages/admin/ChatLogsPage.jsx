import { useEffect, useState } from "react";
import axios from "../../api";
import AdminSidebar from "../../components/AdminSidebar";

export default function ChatLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/chatlogs")
      .then((r) => setLogs(r.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const selectedLog = logs.find((l) => l._id === selected);

  function getPreview(log) {
    const first = log.messages.find((m) => m.role === "user");
    return first ? first.content : "No messages yet";
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  }

  function formatTime(dateStr) {
    return new Date(dateStr).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="admin-main">
        {/* Top bar */}
        <div className="admin-topbar">
          <div>
            <h5 className="mb-0 fw-bold" style={{ fontSize: "1rem" }}>
              Chatbot Conversations
            </h5>
            <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
              {logs.length} conversations logged
            </span>
          </div>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : (
            <div className="row g-3">
              {/* Left — conversation list */}
              <div className="col-md-4">
                <div
                  className="bg-white rounded-3 overflow-hidden"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #e2e8f0",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: "#374151",
                    }}
                  >
                    All Conversations
                  </div>

                  {logs.length === 0 ? (
                    <div
                      className="text-center py-4"
                      style={{ color: "#94a3b8" }}
                    >
                      <i
                        className="bi bi-chat-dots"
                        style={{
                          fontSize: "2rem",
                          display: "block",
                          marginBottom: 8,
                        }}
                      />
                      <span style={{ fontSize: "0.85rem" }}>
                        No conversations yet
                      </span>
                    </div>
                  ) : (
                    logs.map((log) => (
                      <div
                        key={log._id}
                        onClick={() =>
                          setSelected(selected === log._id ? null : log._id)
                        }
                        style={{
                          padding: "12px 16px",
                          cursor: "pointer",
                          borderBottom: "1px solid #f1f5f9",
                          background:
                            selected === log._id ? "#eff6ff" : "transparent",
                          borderLeft:
                            selected === log._id
                              ? "3px solid #1a73e8"
                              : "3px solid transparent",
                          transition: "all 0.15s",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div
                            style={{
                              fontWeight: 500,
                              fontSize: "0.85rem",
                              color: "#1e293b",
                            }}
                          >
                            <i
                              className="bi bi-person-circle me-1"
                              style={{ color: "#94a3b8" }}
                            />
                            {log.visitorEmail
                              ? log.visitorEmail
                              : "Anonymous visitor"}
                          </div>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              color: "#94a3b8",
                              whiteSpace: "nowrap",
                              marginLeft: 8,
                            }}
                          >
                            {formatDate(log.createdAt)}
                          </span>
                        </div>

                        <p
                          style={{
                            fontSize: "0.78rem",
                            color: "#64748b",
                            margin: "4px 0",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {getPreview(log)}
                        </p>

                        <div className="d-flex align-items-center gap-2 mt-1">
                          <span
                            style={{ fontSize: "0.7rem", color: "#94a3b8" }}
                          >
                            {log.messages.length} messages
                          </span>
                          {log.linkedLead && (
                            <span
                              style={{
                                fontSize: "0.68rem",
                                background: "#d1fae5",
                                color: "#065f46",
                                padding: "1px 7px",
                                borderRadius: 10,
                                fontWeight: 600,
                              }}
                            >
                              <i className="bi bi-link-45deg me-1" />
                              {log.linkedLead.fullName}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right — thread view */}
              <div className="col-md-8">
                {!selectedLog ? (
                  <div
                    className="bg-white rounded-3 d-flex align-items-center justify-content-center"
                    style={{ border: "1px solid #e2e8f0", minHeight: 400 }}
                  >
                    <div className="text-center" style={{ color: "#94a3b8" }}>
                      <i
                        className="bi bi-chat-left-text"
                        style={{
                          fontSize: "3rem",
                          display: "block",
                          marginBottom: 12,
                        }}
                      />
                      <p style={{ fontSize: "0.9rem" }}>
                        Select a conversation to view the full thread
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="bg-white rounded-3"
                    style={{ border: "1px solid #e2e8f0" }}
                  >
                    {/* Thread header */}
                    <div
                      style={{
                        padding: "14px 18px",
                        borderBottom: "1px solid #e2e8f0",
                        background: "#f8fafc",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                            {selectedLog.visitorEmail
                              ? selectedLog.visitorEmail
                              : "Anonymous visitor"}
                          </div>
                          <div
                            style={{ fontSize: "0.75rem", color: "#64748b" }}
                          >
                            {new Date(selectedLog.createdAt).toLocaleString(
                              "en-IN",
                            )}
                            &nbsp;&middot;&nbsp;
                            {selectedLog.messages.length} messages
                          </div>
                        </div>

                        {selectedLog.linkedLead && (
                          <div
                            style={{
                              background: "#d1fae5",
                              color: "#065f46",
                              padding: "5px 12px",
                              borderRadius: 20,
                              fontSize: "0.78rem",
                              fontWeight: 600,
                            }}
                          >
                            <i className="bi bi-person-check me-1" />
                            Lead: {selectedLog.linkedLead.fullName} —{" "}
                            {selectedLog.linkedLead.status}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Messages thread */}
                    <div
                      style={{
                        padding: 16,
                        maxHeight: 480,
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {selectedLog.messages.map((msg, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems:
                              msg.role === "user" ? "flex-end" : "flex-start",
                          }}
                        >
                          <div
                            style={{
                              maxWidth: "75%",
                              background:
                                msg.role === "user" ? "#1a73e8" : "#f1f5f9",
                              color: msg.role === "user" ? "#fff" : "#1e293b",
                              padding: "9px 13px",
                              borderRadius: 14,
                              borderBottomRightRadius:
                                msg.role === "user" ? 4 : 14,
                              borderBottomLeftRadius:
                                msg.role === "assistant" ? 4 : 14,
                              fontSize: "0.87rem",
                              lineHeight: 1.55,
                            }}
                          >
                            {msg.content}
                          </div>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              color: "#94a3b8",
                              marginTop: 3,
                            }}
                          >
                            {msg.role === "user" ? "Visitor" : "ClassLink Bot"}
                            &nbsp;&middot;&nbsp;
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
