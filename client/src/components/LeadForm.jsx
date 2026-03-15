import { useState } from "react";
import axios from "axios";

const emptyForm = {
  fullName: "",
  email: "",
  companyName: "",
  phone: "",
  message: "",
  companySize: "",
};

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.companyName.trim()) errors.companyName = "School name is required";
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  if (!form.message.trim()) errors.message = "Please tell us about your needs";
  if (!form.companySize) errors.companySize = "Please select your school size";
  return errors;
}

export default function LeadForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMsg, setServerMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    try {
      const { data } = await axios.post("/api/leads", form);
      setServerMsg(data.message);
      setStatus("success");
      setForm(emptyForm);
    } catch (err) {
      setServerMsg(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="form-section" id="contact">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center py-5">
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}
              >
                <i
                  className="bi bi-check-circle-fill text-white"
                  style={{ fontSize: "2.5rem" }}
                />
              </div>
              <h3 className="text-white fw-bold mb-3">You are on the list!</h3>
              <p className="text-white mb-4" style={{ opacity: 0.85 }}>
                {serverMsg}
              </p>
              <button
                className="btn btn-outline-light px-4"
                onClick={() => setStatus("idle")}
              >
                Submit another request
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="form-section" id="contact">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left copy */}
          <div className="col-lg-5 text-white">
            <span
              className="badge bg-white text-primary rounded-pill px-3 py-2 mb-3"
              style={{ fontSize: "0.78rem" }}
            >
              Request a Demo
            </span>
            <h2
              style={{ fontWeight: 800, fontSize: "2.2rem", lineHeight: 1.2 }}
            >
              See ClassLink in action
            </h2>
            <p
              style={{
                fontSize: "1rem",
                opacity: 0.85,
                lineHeight: 1.7,
                marginTop: "1rem",
              }}
            >
              Our team will set up a personalised demo for your school. We will
              show you exactly how ClassLink fits your teaching workflow — no
              generic slide decks.
            </p>

            <div className="mt-4 d-flex flex-column gap-3">
              {[
                { icon: "bi-clock", text: "30-minute guided walkthrough" },
                {
                  icon: "bi-person-check",
                  text: "Dedicated onboarding specialist",
                },
                {
                  icon: "bi-patch-check",
                  text: "Free 30-day trial after demo",
                },
                {
                  icon: "bi-headset",
                  text: "White-glove setup for your school",
                },
              ].map(({ icon, text }) => (
                <div key={text} className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className={"bi " + icon + " text-white"} />
                  </div>
                  <span style={{ fontSize: "0.92rem", opacity: 0.9 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <div
              className="p-4 p-md-5 rounded-4"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <h4 className="text-white fw-bold mb-4">Book your free demo</h4>

              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1 */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label
                      className="form-label text-white fw-semibold"
                      style={{ fontSize: "0.88rem" }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className={
                        "form-control form-control-lg rounded-3 " +
                        (errors.fullName ? "is-invalid" : "")
                      }
                      style={{ fontSize: "0.92rem" }}
                      placeholder="Jane Smith"
                      value={form.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label
                      className="form-label text-white fw-semibold"
                      style={{ fontSize: "0.88rem" }}
                    >
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className={
                        "form-control form-control-lg rounded-3 " +
                        (errors.email ? "is-invalid" : "")
                      }
                      style={{ fontSize: "0.92rem" }}
                      placeholder="jane@school.edu"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label
                      className="form-label text-white fw-semibold"
                      style={{ fontSize: "0.88rem" }}
                    >
                      School Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      className={
                        "form-control form-control-lg rounded-3 " +
                        (errors.companyName ? "is-invalid" : "")
                      }
                      style={{ fontSize: "0.92rem" }}
                      placeholder="Delhi Public School"
                      value={form.companyName}
                      onChange={handleChange}
                    />
                    {errors.companyName && (
                      <div className="invalid-feedback">
                        {errors.companyName}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label
                      className="form-label text-white fw-semibold"
                      style={{ fontSize: "0.88rem" }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className={
                        "form-control form-control-lg rounded-3 " +
                        (errors.phone ? "is-invalid" : "")
                      }
                      style={{ fontSize: "0.92rem" }}
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                </div>

                {/* School size */}
                <div className="mb-3">
                  <label
                    className="form-label text-white fw-semibold"
                    style={{ fontSize: "0.88rem" }}
                  >
                    Number of Students *
                  </label>
                  <select
                    name="companySize"
                    className={
                      "form-select form-select-lg rounded-3 " +
                      (errors.companySize ? "is-invalid" : "")
                    }
                    style={{ fontSize: "0.92rem" }}
                    value={form.companySize}
                    onChange={handleChange}
                  >
                    <option value="">Select school size</option>
                    <option value="1-10">1 to 10 students</option>
                    <option value="11-50">11 to 50 students</option>
                    <option value="51-200">51 to 200 students</option>
                    <option value="200+">200+ students</option>
                  </select>
                  {errors.companySize && (
                    <div className="invalid-feedback">{errors.companySize}</div>
                  )}
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label
                    className="form-label text-white fw-semibold"
                    style={{ fontSize: "0.88rem" }}
                  >
                    What are you hoping to achieve? *
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    className={
                      "form-control rounded-3 " +
                      (errors.message ? "is-invalid" : "")
                    }
                    style={{ fontSize: "0.92rem", resize: "vertical" }}
                    placeholder="Tell us about your school and what you are looking for..."
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>

                {/* Server error */}
                {status === "error" && (
                  <div
                    className="alert alert-danger py-2 mb-3"
                    style={{ fontSize: "0.88rem" }}
                  >
                    {serverMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-light btn-lg w-100 py-3 rounded-3 fw-bold"
                  style={{ color: "#1a73e8", fontSize: "0.98rem" }}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill me-2" />
                      Book My Free Demo
                    </>
                  )}
                </button>

                <p
                  className="text-white text-center mt-3 mb-0"
                  style={{ fontSize: "0.75rem", opacity: 0.65 }}
                >
                  We never spam. You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
