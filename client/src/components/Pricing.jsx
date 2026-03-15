const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    desc: "Perfect for individual teachers getting started.",
    included: [
      "Up to 40 students per class",
      "40-minute session limit",
      "HD video and audio",
      "Basic attendance reports",
      "Screen sharing",
      "1 GB recording storage",
    ],
    notIncluded: [
      "Unlimited session time",
      "Session recordings",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Get Started Free",
    ctaClass: "btn btn-outline-primary w-100 mb-4 py-2 rounded-3",
    popular: false,
    badgeBg: "#f1f5f9",
    badgeColor: "#64748b",
  },
  {
    name: "Pro",
    price: "29",
    period: "per teacher / month",
    desc: "Everything a serious educator needs to run a full school online.",
    included: [
      "Unlimited students per class",
      "Unlimited session time",
      "HD video and audio",
      "Auto attendance and reports",
      "Session recordings (50 GB)",
      "Breakout rooms",
      "Quiz and assignment tools",
      "Google and Outlook sync",
      "Priority email support",
    ],
    notIncluded: [],
    cta: "Start 14-Day Free Trial",
    ctaClass: "btn btn-classlink w-100 mb-4 py-2 rounded-3",
    popular: true,
    badgeBg: "#dbeafe",
    badgeColor: "#1d4ed8",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "for your district",
    desc: "For school districts and universities with advanced needs.",
    included: [
      "Everything in Pro",
      "Unlimited storage",
      "SSO and Active Directory",
      "District-wide analytics",
      "Custom branding",
      "Dedicated account manager",
      "SLA guarantee 99.9%",
      "On-premise option",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    ctaClass: "btn btn-outline-dark w-100 mb-4 py-2 rounded-3",
    popular: false,
    badgeBg: "#f1f5f9",
    badgeColor: "#64748b",
  },
];

export default function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="text-center mb-5">
          <span
            className="badge text-bg-success rounded-pill px-3 py-2 mb-3"
            style={{ fontSize: "0.78rem" }}
          >
            Simple pricing
          </span>
          <h2 className="section-title mb-3">No hidden fees. Ever.</h2>
          <p className="section-subtitle">
            Start free, upgrade when you are ready. No credit card required.
          </p>
        </div>

        <div className="row g-4 justify-content-center align-items-stretch">
          {plans.map((plan) => (
            <div className="col-md-6 col-lg-4" key={plan.name}>
              <div
                className="pricing-card h-100"
                style={{ border: plan.popular ? "2px solid #1a73e8" : "" }}
              >
                {plan.popular && (
                  <span className="popular-badge">Most Popular</span>
                )}

                {/* Plan name badge */}
                <div className="mb-3">
                  <span
                    className="badge rounded-pill px-3"
                    style={{
                      background: plan.badgeBg,
                      color: plan.badgeColor,
                      fontSize: "0.78rem",
                    }}
                  >
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-2">
                  {plan.price === "Custom" ? (
                    <span className="price-amount" style={{ fontSize: "2rem" }}>
                      Custom
                    </span>
                  ) : (
                    <span>
                      <span
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          verticalAlign: "top",
                          marginTop: 8,
                          display: "inline-block",
                        }}
                      >
                        $
                      </span>
                      <span className="price-amount">{plan.price}</span>
                    </span>
                  )}
                  <br />
                  <span className="price-period">{plan.period}</span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    marginBottom: "1.2rem",
                  }}
                >
                  {plan.desc}
                </p>

                {/* CTA button */}
                <a
                  href="#contact"
                  className={plan.ctaClass}
                  style={{ fontWeight: 600 }}
                >
                  {plan.cta}
                </a>

                {/* Feature list */}
                <ul className="feature-list">
                  {plan.included.map((f) => (
                    <li key={f}>
                      <i
                        className="bi bi-check-circle-fill"
                        style={{ color: "#16a34a" }}
                      />
                      <span style={{ fontSize: "0.87rem" }}>{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} style={{ opacity: 0.4 }}>
                      <i
                        className="bi bi-x-circle"
                        style={{ color: "#94a3b8" }}
                      />
                      <span style={{ fontSize: "0.87rem" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-4"
          style={{ fontSize: "0.83rem", color: "#94a3b8" }}
        >
          All plans include 256-bit encryption, FERPA compliance, and free
          onboarding support.
        </p>
      </div>
    </section>
  );
}
