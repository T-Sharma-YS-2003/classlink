const features = [
  {
    icon: "bi-camera-video-fill",
    iconBg: "#dbeafe",
    iconColor: "#1d4ed8",
    title: "HD Live Classes",
    desc: "Crystal-clear 1080p video with adaptive bitrate. Classes run smoothly even on slow connections.",
    bullets: [
      "Virtual whiteboard & annotations",
      "Screen & slide sharing",
      "Up to 200 students per session",
    ],
  },
  {
    icon: "bi-clipboard2-check-fill",
    iconBg: "#dcfce7",
    iconColor: "#15803d",
    title: "Smart Attendance",
    desc: "Automatic attendance marking the moment a student joins. Generate reports in one click.",
    bullets: [
      "Auto mark on join/leave",
      "PDF & Excel export",
      "Parent notification alerts",
    ],
  },
  {
    icon: "bi-camera-reels-fill",
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
    title: "Session Recordings",
    desc: "Every class is recorded and stored securely in the cloud. Students can catch up anytime.",
    bullets: [
      "Cloud storage included",
      "Searchable transcripts",
      "Share links with expiry",
    ],
  },
  {
    icon: "bi-people-fill",
    iconBg: "#fef3c7",
    iconColor: "#b45309",
    title: "Breakout Rooms",
    desc: "Split your class into small groups for activities. Bring everyone back with one click.",
    bullets: [
      "Up to 50 breakout rooms",
      "Assign students automatically",
      "Timer & broadcast tools",
    ],
  },
  {
    icon: "bi-bar-chart-line-fill",
    iconBg: "#fee2e2",
    iconColor: "#b91c1c",
    title: "Learning Analytics",
    desc: "Track engagement and quiz scores across your school. Identify at-risk students early.",
    bullets: [
      "Engagement heatmaps",
      "Quiz & assignment scoring",
      "District-wide dashboards",
    ],
  },
  {
    icon: "bi-calendar-check-fill",
    iconBg: "#e0f2fe",
    iconColor: "#0369a1",
    title: "Class Scheduler",
    desc: "Schedule recurring classes and sync with Google Calendar. Students get notified automatically.",
    bullets: [
      "Google & Outlook sync",
      "Recurring class templates",
      "Student & parent reminders",
    ],
  },
];

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="text-center mb-5">
          <span
            className="badge text-bg-primary rounded-pill px-3 py-2 mb-3"
            style={{ fontSize: "0.78rem" }}
          >
            Everything you need
          </span>
          <h2 className="section-title mb-3">
            Built for teachers.
            <br />
            Loved by students.
          </h2>
          <p className="section-subtitle">
            Every feature is designed around how schools actually work — not how
            tech companies think they do.
          </p>
        </div>

        <div className="row g-4">
          {features.map((f) => (
            <div className="col-md-6 col-lg-4" key={f.title}>
              <div className="feature-card">
                <div className="feature-icon" style={{ background: f.iconBg }}>
                  <i
                    className={"bi " + f.icon}
                    style={{ color: f.iconColor }}
                  />
                </div>
                <h5 style={{ fontWeight: 700 }} className="mb-2">
                  {f.title}
                </h5>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {f.bullets.map((b) => (
                    <li
                      key={b}
                      className="d-flex align-items-center gap-2 mt-1"
                      style={{ fontSize: "0.82rem", color: "#475569" }}
                    >
                      <i
                        className="bi bi-check-circle-fill"
                        style={{ color: "#16a34a", fontSize: "0.7rem" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
