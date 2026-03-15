import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import LeadForm from "../components/LeadForm";
import ChatWidget from "../components/ChatWidget";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <LeadForm />
      <Footer />
      <ChatWidget />
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{ background: "#0f172a", color: "#94a3b8", padding: "3rem 0" }}
    >
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg,#1a73e8,#4f46e5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="bi bi-camera-video-fill text-white"
                  style={{ fontSize: "0.85rem" }}
                />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  color: "#e2e8f0",
                  fontSize: "1.1rem",
                }}
              >
                ClassLink
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
              Bringing schools online without the complexity. Built for
              teachers, trusted by administrators.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a
                href="#"
                style={{
                  color: "#475569",
                  fontSize: "1.1rem",
                  textDecoration: "none",
                }}
              >
                <i className="bi bi-twitter" />
              </a>
              <a
                href="#"
                style={{
                  color: "#475569",
                  fontSize: "1.1rem",
                  textDecoration: "none",
                }}
              >
                <i className="bi bi-linkedin" />
              </a>
              <a
                href="#"
                style={{
                  color: "#475569",
                  fontSize: "1.1rem",
                  textDecoration: "none",
                }}
              >
                <i className="bi bi-youtube" />
              </a>
              <a
                href="#"
                style={{
                  color: "#475569",
                  fontSize: "1.1rem",
                  textDecoration: "none",
                }}
              >
                <i className="bi bi-instagram" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="col-md col-6">
            <div
              style={{
                fontWeight: 600,
                color: "#e2e8f0",
                fontSize: "0.85rem",
                marginBottom: 12,
              }}
            >
              Product
            </div>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Features
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Pricing
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Security
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Changelog
            </a>
          </div>

          {/* Company links */}
          <div className="col-md col-6">
            <div
              style={{
                fontWeight: 600,
                color: "#e2e8f0",
                fontSize: "0.85rem",
                marginBottom: 12,
              }}
            >
              Company
            </div>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              About
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Blog
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Careers
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Press
            </a>
          </div>

          {/* Support links */}
          <div className="col-md col-6">
            <div
              style={{
                fontWeight: 600,
                color: "#e2e8f0",
                fontSize: "0.85rem",
                marginBottom: 12,
              }}
            >
              Support
            </div>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Help Center
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Contact Us
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Status
            </a>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "block",
                marginBottom: 6,
              }}
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #1e293b",
            marginTop: "2rem",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ fontSize: "0.8rem" }}>
            2026 ClassLink Technologies Pvt. Ltd. All rights reserved.
          </span>
          <span style={{ fontSize: "0.8rem" }}>
            Made with love for educators everywhere
          </span>
        </div>
      </div>
    </footer>
  );
}
