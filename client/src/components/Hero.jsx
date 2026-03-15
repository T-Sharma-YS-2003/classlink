const tiles = [
  { initials: 'MS', bg: '#1a73e8', name: 'Ms. Sharma',  active: true },
  { initials: 'RK', bg: '#7c3aed', name: 'Rahul K.' },
  { initials: 'PD', bg: '#0891b2', name: 'Priya D.' },
  { initials: 'AT', bg: '#059669', name: 'Arjun T.' },
];

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* ── Left copy ── */}
          <div className="col-lg-6">
            <div className="hero-badge">
              <i className="bi bi-lightning-charge-fill" />
              Trusted by 2,000+ schools across India
            </div>

            <h1 className="hero-title mb-3">
              Virtual classrooms<br />
              your students will<br />
              <span className="highlight">actually love</span>
            </h1>

            <p className="hero-subtitle mb-4">
              ClassLink brings HD live classes, attendance tracking, and
              session recordings to every school — no downloads, no IT
              headaches, just teaching.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <a href="#contact" className="btn btn-classlink btn-lg px-4 py-2 rounded-3">
                <i className="bi bi-play-circle me-2" />Start Free Trial
              </a>
              <a href="#features" className="btn btn-outline-secondary btn-lg px-4 py-2 rounded-3">
                See How It Works
              </a>
            </div>

            <div className="d-flex gap-4 flex-wrap">
              {[
                { icon: 'bi-shield-check',  text: 'FERPA Compliant' },
                { icon: 'bi-credit-card',   text: 'No credit card needed' },
                { icon: 'bi-arrow-repeat',  text: 'Cancel anytime' },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="d-flex align-items-center gap-2"
                  style={{ fontSize: '0.83rem', color: '#64748b' }}
                >
                  <i className={`bi ${icon}`} style={{ color: '#16a34a' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — video grid mockup ── */}
          <div className="col-lg-6">
            <div className="hero-mockup">

              {/* Window bar */}
              <div className="mockup-bar">
                <div className="mockup-dot" style={{ background: '#ef4444' }} />
                <div className="mockup-dot" style={{ background: '#f59e0b' }} />
                <div className="mockup-dot" style={{ background: '#22c55e' }} />
                <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#64748b' }}>
                  Math — Grade 9 &bull; 24 students online
                </span>
              </div>

              {/* Video tiles grid */}
              <div className="mockup-content">
                {tiles.map((t) => (
                  <div key={t.name} className={`video-tile${t.active ? ' active' : ''}`}>
                    <div className="initials" style={{ background: t.bg }}>
                      {t.initials}
                    </div>
                    <span className="name-tag">{t.name}</span>
                    {t.active && (
                      <span style={{
                        position: 'absolute', top: 6, right: 6,
                        background: '#1a73e8', borderRadius: 4,
                        fontSize: '0.6rem', color: '#fff', padding: '2px 6px',
                      }}>
                        ● LIVE
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Controls bar */}
              <div style={{
                background: '#0f172a', padding: '10px 12px',
                display: 'flex', justifyContent: 'center', gap: 10,
              }}>
                {[
                  'mic-fill',
                  'camera-video-fill',
                  'display',
                  'hand-index-thumb-fill',
                  'x-circle-fill',
                ].map((icon, i) => (
                  <button key={icon} style={{
                    width: 36, height: 36, borderRadius: '50%', border: 'none',
                    background: i === 4 ? '#ef4444' : '#1e293b',
                    color: '#fff', fontSize: '0.85rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <i className={`bi bi-${icon}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="row g-2 mt-2">
              {[
                { val: '99.9%',  label: 'Uptime SLA' },
                { val: '< 80ms', label: 'Avg. latency' },
                { val: '200+',   label: 'Students/class' },
              ].map(({ val, label }) => (
                <div className="col-4" key={label}>
                  <div className="text-center p-2" style={{
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: 10, border: '1px solid #e2e8f0',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1a73e8' }}>
                      {val}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}