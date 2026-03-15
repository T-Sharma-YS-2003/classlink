import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { useAuth } from "../../context/AuthContext";

const ALL_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Demo Scheduled",
  "Closed Won",
  "Closed Lost",
];

function getStatusClass(status) {
  if (status === "New") return "status-New";
  if (status === "Contacted") return "status-Contacted";
  if (status === "Qualified") return "status-Qualified";
  if (status === "Demo Scheduled") return "status-Demo";
  if (status === "Closed Won") return "status-Won";
  if (status === "Closed Lost") return "status-Lost";
  return "status-New";
}

export default function LeadsPage() {
  const { user } = useAuth();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    axios
      .get("/api/admin/leads")
      .then((r) => setLeads(r.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id, status) {
    try {
      const { data } = await axios.patch("/api/admin/leads/" + id + "/status", {
        status,
      });
      setLeads((prev) => prev.map((l) => (l._id === id ? data : l)));
    } catch (err) {
      alert("Failed to update status.");
    }
  }

  function toggleExpand(id) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  const filtered = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      lead.fullName.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.companyName.toLowerCase().includes(q);
    const matchStatus = filterStatus === "All" || lead.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="admin-main">
        {/* Top bar */}
        <div className="admin-topbar">
          <div>
            <h5 className="mb-0 fw-bold" style={{ fontSize: "1rem" }}>
              Lead Management
            </h5>
            <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
              {leads.length} total submissions
            </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Logged in as
            </span>
            <span
              className="badge"
              style={{
                background:
                  user && user.role === "super_admin" ? "#dbeafe" : "#f1f5f9",
                color:
                  user && user.role === "super_admin" ? "#1d4ed8" : "#64748b",
                fontSize: "0.72rem",
              }}
            >
              {user && user.role === "super_admin" ? "Super Admin" : "Member"}
            </span>
          </div>
        </div>

        <div className="p-4">
          {/* Stat cards */}
          <div className="row g-3 mb-4">
            {[
              {
                label: "Total Leads",
                val: leads.length,
                icon: "bi-people",
                color: "#1a73e8",
              },
              {
                label: "New",
                val: leads.filter((l) => l.status === "New").length,
                icon: "bi-inbox",
                color: "#1d4ed8",
              },
              {
                label: "Demo Scheduled",
                val: leads.filter((l) => l.status === "Demo Scheduled").length,
                icon: "bi-calendar-check",
                color: "#7c3aed",
              },
              {
                label: "Closed Won",
                val: leads.filter((l) => l.status === "Closed Won").length,
                icon: "bi-trophy",
                color: "#16a34a",
              },
            ].map(({ label, val, icon, color }) => (
              <div className="col-6 col-lg-3" key={label}>
                <div
                  className="bg-white rounded-3 p-3 d-flex align-items-center gap-3"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: color + "18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className={"bi " + icon}
                      style={{ color, fontSize: "1.1rem" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "1.4rem",
                        lineHeight: 1,
                      }}
                    >
                      {val}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      {label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search + filter */}
          <div
            className="bg-white rounded-3 p-3 mb-3 d-flex gap-3 flex-wrap align-items-center"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <div className="input-group" style={{ maxWidth: 280 }}>
              <span className="input-group-text bg-transparent border-end-0">
                <i
                  className="bi bi-search"
                  style={{ fontSize: "0.85rem", color: "#94a3b8" }}
                />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search name, email, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontSize: "0.88rem" }}
              />
            </div>

            <div className="d-flex gap-1 flex-wrap">
              {["All", ...ALL_STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={
                    "btn btn-sm rounded-pill " +
                    (filterStatus === s
                      ? "btn-primary"
                      : "btn-outline-secondary")
                  }
                  style={{ fontSize: "0.75rem", padding: "3px 12px" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div
            className="bg-white rounded-3 overflow-hidden"
            style={{ border: "1px solid #e2e8f0" }}
          >
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-5" style={{ color: "#94a3b8" }}>
                <i
                  className="bi bi-inbox"
                  style={{
                    fontSize: "2.5rem",
                    display: "block",
                    marginBottom: 8,
                  }}
                />
                No leads found
              </div>
            ) : (
              <div className="table-responsive">
                <table
                  className="table table-hover mb-0"
                  style={{ fontSize: "0.86rem" }}
                >
                  <thead
                    style={{
                      background: "#f8fafc",
                      borderBottom: "2px solid #e2e8f0",
                    }}
                  >
                    <tr>
                      {[
                        "Name",
                        "Email",
                        "Company",
                        "Size",
                        "Date",
                        "Status",
                        "",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            fontWeight: 600,
                            color: "#64748b",
                            padding: "12px 16px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead) => (
                      <>
                        {/* Main row */}
                        <tr
                          key={lead._id}
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleExpand(lead._id)}
                        >
                          <td style={{ padding: "12px 16px", fontWeight: 500 }}>
                            {lead.fullName}
                          </td>
                          <td
                            style={{ padding: "12px 16px", color: "#1a73e8" }}
                          >
                            {lead.email}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            {lead.companyName}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            {lead.companySize}
                          </td>
                          <td
                            style={{
                              padding: "12px 16px",
                              color: "#64748b",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {new Date(lead.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            {user && user.role === "super_admin" ? (
                              <select
                                className={
                                  "form-select form-select-sm status-badge " +
                                  getStatusClass(lead.status)
                                }
                                style={{
                                  border: "none",
                                  fontWeight: 600,
                                  fontSize: "0.73rem",
                                  cursor: "pointer",
                                  width: "auto",
                                  padding: "3px 24px 3px 8px",
                                }}
                                value={lead.status}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) =>
                                  updateStatus(lead._id, e.target.value)
                                }
                              >
                                {ALL_STATUSES.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span
                                className={
                                  "status-badge " + getStatusClass(lead.status)
                                }
                              >
                                {lead.status}
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <i
                              className={
                                "bi " +
                                (expanded === lead._id
                                  ? "bi-chevron-up"
                                  : "bi-chevron-down")
                              }
                              style={{ color: "#94a3b8" }}
                            />
                          </td>
                        </tr>

                        {/* Expanded detail row */}
                        {expanded === lead._id && (
                          <tr
                            key={lead._id + "-detail"}
                            style={{ background: "#f8faff" }}
                          >
                            <td colSpan={7} style={{ padding: "0 16px 16px" }}>
                              <div
                                className="p-3 rounded-3 mt-2"
                                style={{
                                  background: "#fff",
                                  border: "1px solid #dbeafe",
                                }}
                              >
                                <div className="row g-3">
                                  <div className="col-md-6">
                                    <div
                                      style={{
                                        fontSize: "0.75rem",
                                        color: "#94a3b8",
                                        marginBottom: 4,
                                        fontWeight: 600,
                                      }}
                                    >
                                      PHONE
                                    </div>
                                    <div>{lead.phone}</div>
                                  </div>
                                  <div className="col-md-6">
                                    <div
                                      style={{
                                        fontSize: "0.75rem",
                                        color: "#94a3b8",
                                        marginBottom: 4,
                                        fontWeight: 600,
                                      }}
                                    >
                                      SUBMITTED
                                    </div>
                                    <div>
                                      {new Date(lead.createdAt).toLocaleString(
                                        "en-IN",
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div
                                      style={{
                                        fontSize: "0.75rem",
                                        color: "#94a3b8",
                                        marginBottom: 4,
                                        fontWeight: 600,
                                      }}
                                    >
                                      MESSAGE
                                    </div>
                                    <div
                                      style={{
                                        background: "#f8fafc",
                                        padding: "10px 14px",
                                        borderRadius: 8,
                                        fontSize: "0.88rem",
                                        lineHeight: 1.7,
                                      }}
                                    >
                                      {lead.message}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
