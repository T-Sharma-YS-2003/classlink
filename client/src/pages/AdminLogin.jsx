import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  if (user) {
    return <Navigate to="/admin/leads" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin/leads");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f3e8ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg,#1a73e8,#4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
            }}
          >
            <i
              className="bi bi-camera-video-fill text-white"
              style={{ fontSize: "1.4rem" }}
            />
          </div>
          <h4 style={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
            ClassLink Admin
          </h4>
          <p style={{ color: "#64748b", fontSize: "0.88rem" }}>
            Sign in to manage your portal
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-4 p-4"
          style={{
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-3">
              <label
                className="form-label fw-semibold"
                style={{ fontSize: "0.88rem" }}
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-lg rounded-3"
                placeholder="you@classlink.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                className="form-label fw-semibold"
                style={{ fontSize: "0.88rem" }}
              >
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPw ? "text" : "password"}
                  className="form-control form-control-lg"
                  style={{ borderRadius: "10px 0 0 10px" }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  style={{ borderRadius: "0 10px 10px 0" }}
                  onClick={() => setShowPw((prev) => !prev)}
                >
                  {showPw ? (
                    <i className="bi bi-eye-slash" />
                  ) : (
                    <i className="bi bi-eye" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="alert alert-danger py-2 mb-3"
                style={{ fontSize: "0.85rem" }}
              >
                <i className="bi bi-exclamation-circle me-2" />
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="btn btn-classlink btn-lg w-100 rounded-3 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Signing in...
                </span>
              ) : (
                <span>
                  <i className="bi bi-box-arrow-in-right me-2" />
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Test credentials */}
          <div
            className="mt-4 p-3 rounded-3"
            style={{ background: "#f8faff", border: "1px solid #dbeafe" }}
          >
            <p
              style={{
                fontSize: "0.78rem",
                color: "#1d4ed8",
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              <i className="bi bi-info-circle me-1" />
              Test Credentials
            </p>
            <div style={{ fontSize: "0.78rem", color: "#374151" }}>
              <div className="mb-1">
                <strong>Super Admin:</strong> superadmin@classlink.io /
                Admin@123
              </div>
              <div>
                <strong>Member:</strong> member@classlink.io / Member@123
              </div>
            </div>
            <p
              style={{
                fontSize: "0.72rem",
                color: "#64748b",
                marginTop: 8,
                marginBottom: 0,
              }}
            >
              First run POST /api/auth/seed to create these accounts.
            </p>
          </div>
        </div>

        {/* Back link */}
        <p className="text-center mt-3" style={{ fontSize: "0.8rem" }}>
          <a href="/" style={{ color: "#1a73e8", textDecoration: "none" }}>
            <i className="bi bi-arrow-left me-1" />
            Back to ClassLink.io
          </a>
        </p>
      </div>
    </div>
  );
}
