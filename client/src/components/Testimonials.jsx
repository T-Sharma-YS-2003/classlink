const testimonials = [
  {
    quote:
      "ClassLink transformed how we run our school. Attendance used to take 20 minutes — now it is automatic. Our teachers love the recording feature for students who are sick.",
    name: "Sunita Mehta",
    title: "Principal, Delhi Public School, Noida",
    initials: "SM",
    color: "#1a73e8",
  },
  {
    quote:
      "We piloted 4 platforms before choosing ClassLink. The video quality is exceptional even with 150+ students, and the breakout rooms are the best I have used for group activities.",
    name: "James Fernandez",
    title: "Head of Technology, St. Xavier's College",
    initials: "JF",
    color: "#7c3aed",
  },
  {
    quote:
      "As a maths teacher I was skeptical. But the whiteboard tool is incredible — I can annotate over slides, draw diagrams, and students can request control. Better than a real classroom!",
    name: "Ananya Krishnan",
    title: "Senior Maths Teacher, Kendriya Vidyalaya",
    initials: "AK",
    color: "#0891b2",
  },
  {
    quote:
      "Our district rolled out ClassLink across 18 schools in two weeks. The onboarding team was exceptional and the analytics dashboard gives real visibility into engagement.",
    name: "Robert Tanaka",
    title: "IT Director, Pune Municipal School District",
    initials: "RT",
    color: "#059669",
  },
  {
    quote:
      "The parent notification feature is a game changer. Parents get alerted when their child misses class. It improved our attendance rates by 34% in just one semester.",
    name: "Preethi Rajan",
    title: "Vice Principal, Amrita Vidyalayam",
    initials: "PR",
    color: "#dc2626",
  },
  {
    quote:
      "ClassLink made online assessments stress-free. Students cannot switch tabs during quizzes and results are auto-graded. It saves me hours every week.",
    name: "Vikram Nair",
    title: "Science Teacher, Ryan International School",
    initials: "VN",
    color: "#b45309",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="text-center mb-5">
          <span
            className="badge text-bg-warning rounded-pill px-3 py-2 mb-3"
            style={{ fontSize: "0.78rem" }}
          >
            Loved by educators
          </span>
          <h2 className="section-title mb-3">Teachers do not lie.</h2>
          <p className="section-subtitle">
            Over 2,000 schools across India trust ClassLink to power their
            virtual classrooms every day.
          </p>
        </div>

        {/* Stats bar */}
        <div className="row g-3 justify-content-center mb-5">
          {[
            { val: "2,000+", label: "Schools" },
            { val: "1.2M+", label: "Students" },
            { val: "98%", label: "Satisfaction" },
            { val: "4.9/5", label: "App Store" },
          ].map(({ val, label }) => (
            <div className="col-6 col-md-3" key={label}>
              <div
                className="text-center p-3"
                style={{
                  background: "#f8faff",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.6rem",
                    color: "#1a73e8",
                  }}
                >
                  {val}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="row g-4">
          {testimonials.map((t) => (
            <div className="col-md-6 col-lg-4" key={t.name}>
              <div className="testimonial-card">
                {/* Stars */}
                <div className="mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i
                      key={s}
                      className="bi bi-star-fill"
                      style={{ color: "#f59e0b", fontSize: "0.8rem" }}
                    />
                  ))}
                </div>

                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "#374151",
                    lineHeight: 1.7,
                    marginBottom: "1.2rem",
                  }}
                >
                  "{t.quote}"
                </p>

                <div className="d-flex align-items-center gap-3">
                  <div className="avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      {t.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
