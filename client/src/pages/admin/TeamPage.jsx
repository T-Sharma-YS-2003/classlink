import { useEffect, useState } from 'react';
import axios from "../../api";
import AdminSidebar from '../../components/AdminSidebar';
import { useAuth } from '../../context/AuthContext';

const emptyForm = { name: '', email: '', password: '', role: 'member' };

export default function TeamPage() {
  const { user } = useAuth();

  const [members, setMembers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]         = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [adding, setAdding]     = useState(false);

  function fetchTeam() {
    axios.get('/api/admin/team')
      .then((r) => setMembers(r.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchTeam(); }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setFormError('All fields are required');
      return;
    }
    setAdding(true);
    setFormError('');
    try {
      await axios.post('/api/admin/team', form);
      setForm(emptyForm);
      setShowModal(false);
      fetchTeam();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to add member');
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id, name) {
    if (!window.confirm('Remove ' + name + ' from the team?')) return;
    try {
      await axios.delete('/api/admin/team/' + id);
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove member');
    }
  }

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="admin-main">

        {/* Top bar */}
        <div className="admin-topbar">
          <div>
            <h5 className="mb-0 fw-bold" style={{ fontSize: '1rem' }}>
              Team Management
            </h5>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              {members.length} team members
            </span>
          </div>
          <button
            className="btn btn-classlink btn-sm d-flex align-items-center gap-2"
            onClick={() => { setShowModal(true); setFormError(''); setForm(emptyForm); }}
          >
            <i className="bi bi-person-plus-fill" />
            Add Member
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : (
            <div
              className="bg-white rounded-3 overflow-hidden"
              style={{ border: '1px solid #e2e8f0' }}
            >
              <table className="table table-hover mb-0" style={{ fontSize: '0.88rem' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <tr>
                    {['Name', 'Email', 'Role', 'Added', ''].map((h) => (
                      <th
                        key={h}
                        style={{ fontWeight: 600, color: '#64748b', padding: '12px 16px' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m._id}>
                      <td style={{ padding: '12px 16px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: m.role === 'super_admin' ? '#dbeafe' : '#f1f5f9',
                            color: m.role === 'super_admin' ? '#1d4ed8' : '#64748b',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '0.85rem',
                          }}>
                            {m.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 500 }}>{m.name}</div>
                            {m.email === user?.email && (
                              <span style={{ fontSize: '0.68rem', color: '#16a34a' }}>You</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#1a73e8' }}>{m.email}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span
                          className="status-badge"
                          style={{
                            background: m.role === 'super_admin' ? '#dbeafe' : '#f1f5f9',
                            color: m.role === 'super_admin' ? '#1d4ed8' : '#64748b',
                          }}
                        >
                          {m.role === 'super_admin' ? 'Super Admin' : 'Member'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.82rem' }}>
                        {new Date(m.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {m.email !== user?.email && (
                          <button
                            onClick={() => handleRemove(m._id, m.name)}
                            style={{
                              background: '#fee2e2', color: '#dc2626',
                              border: 'none', borderRadius: 8,
                              fontSize: '0.78rem', padding: '4px 10px',
                              cursor: 'pointer',
                            }}
                          >
                            <i className="bi bi-trash3 me-1" />
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add member modal */}
        {showModal && (
          <div
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.45)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', zIndex: 1050,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 16,
                padding: '2rem', width: '100%', maxWidth: 440,
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Add Team Member</h5>
                <button
                  onClick={() => setShowModal(false)}
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#94a3b8' }}
                >
                  <i className="bi bi-x-lg" />
                </button>
              </div>

              <form onSubmit={handleAdd} noValidate>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control rounded-3"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-3"
                    placeholder="jane@classlink.io"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>
                    Temporary Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-3"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.85rem' }}>
                    Role
                  </label>
                  <select
                    name="role"
                    className="form-select rounded-3"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="member">Member</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                {formError && (
                  <div className="alert alert-danger py-2 mb-3" style={{ fontSize: '0.85rem' }}>
                    {formError}
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary flex-fill rounded-3"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-classlink flex-fill rounded-3"
                    disabled={adding}
                  >
                    {adding ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Adding...
                      </span>
                    ) : (
                      'Add Member'
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}