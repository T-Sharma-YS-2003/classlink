export default function Navbar() {
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-classlink sticky-top">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center gap-2" href="/">
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "linear-gradient(135deg,#1a73e8,#4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="bi bi-camera-video-fill text-white"
              style={{ fontSize: "0.95rem" }}
            ></i>
          </div>

          <span className="brand-text">
            Class<span className="brand-dot">Link</span>
          </span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-1">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.label}>
                <a
                  className="nav-link px-3"
                  style={{ color: "#475569", fontSize: "0.92rem" }}
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Buttons */}
          <div className="d-flex gap-2 align-items-center">
            <a
              href="/admin/login"
              className="btn btn-sm btn-outline-secondary px-3"
              style={{ fontSize: "0.88rem" }}
            >
              Sign In
            </a>

            <a
              href="#contact"
              className="btn btn-sm btn-classlink px-3"
              style={{ fontSize: "0.88rem" }}
            >
              Request Demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
