import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  function goTo(path) {
    navigate(path);
  }

  const currentPath = window.location.pathname;

  return (
    <div className="admin-sidebar d-flex flex-column">
      {/* Brand */}
      <div className="brand d-flex align-items-center gap-2">
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "linear-gradient(135deg,#1a73e8,#4f46e5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bi bi-camera-video-fill text-white"
            style={{ fontSize: "0.75rem" }}
          />
        </div>
        <span style={{ fontWeight: 700, color: "#e2e8f0", fontSize: "1rem" }}>
          ClassLink
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.62rem",
            background: "#1a73e8",
            color: "#fff",
            padding: "2px 7px",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav flex-grow-1">
        <div
          style={{
            padding: "0 1.4rem",
            marginBottom: 6,
            fontSize: "0.7rem",
            color: "#475569",
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          MAIN MENU
        </div>

        {/* Leads */}
        <button
          onClick={() => goTo("/admin/leads")}
          className={
            currentPath === "/admin/leads"
              ? "sidebar-link active"
              : "sidebar-link"
          }
          style={{
            width: "100%",
            background: "none",
            border: "none",
            textAlign: "left",
          }}
        >
          <i className="bi bi-people-fill" style={{ fontSize: "0.95rem" }} />
          Leads
        </button>

        {/* Chat Logs */}
        <button
          onClick={() => goTo("/admin/chatlogs")}
          className={
            currentPath === "/admin/chatlogs"
              ? "sidebar-link active"
              : "sidebar-link"
          }
          style={{
            width: "100%",
            background: "none",
            border: "none",
            textAlign: "left",
          }}
        >
          <i
            className="bi bi-chat-left-text-fill"
            style={{ fontSize: "0.95rem" }}
          />
          Chat Logs
        </button>

        {/* Team — super admin only */}
        {user && user.role === "super_admin" && (
          <button
            onClick={() => goTo("/admin/team")}
            className={
              currentPath === "/admin/team"
                ? "sidebar-link active"
                : "sidebar-link"
            }
            style={{
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
            }}
          >
            <i
              className="bi bi-person-badge-fill"
              style={{ fontSize: "0.95rem" }}
            />
            Team
          </button>
        )}
      </nav>

      {/* User footer */}
      <div style={{ padding: "1rem 1.4rem", borderTop: "1px solid #334155" }}>
        <div className="d-flex align-items-center gap-2 mb-3">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#94a3b8",
            }}
          >
            {user && user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <div
              style={{ fontSize: "0.82rem", color: "#e2e8f0", fontWeight: 600 }}
            >
              {user ? user.name : ""}
            </div>
            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
              {user && user.role === "super_admin" ? "Super Admin" : "Member"}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            background: "rgba(239,68,68,0.1)",
            color: "#f87171",
            border: "none",
            borderRadius: 8,
            fontSize: "0.82rem",
            padding: "6px 0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <i className="bi bi-box-arrow-right" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
