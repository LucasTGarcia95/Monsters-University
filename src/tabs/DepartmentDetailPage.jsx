import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Spinner } from "../Components/Spinner";
import { ConfirmDialog } from "../Components/ConfirmDialogue";
import { DeptForm } from "../Components/DeptForm";
import { useAuth } from "../auth/AuthContext";

const [loading, setLoading] = useState(true);
const [showEdit, setShowEdit] = useState(false);
const [showDelete, setShowDelete] = useState(false);
const [saving, setSaving] = useState(false);

export default function DepartmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [dept, setDept] = useState(null);

  useEffect(() => {
    api.departments
      .get(id)
      .then(setDept)
      .finally(() => setLoading(false));
  }, [id]);

  const handleEdit = async (data) => {
    setSaving(true);
    try {
      const updated = await api.departments.update(id, data);
      setDept(updated);
      setShowEdit(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    await api.departments.remove(id);
    navigate("/departments");
  };

  if (loading)
    return (
      <div className="page-center">
        <Spinner />
      </div>
    );
  if (!dept)
    return (
      <div className="page-center">
        <p>Department not found.</p>
      </div>
    );

  return (
    <div className="page page--detail">
      Banner
      <div
        className="detail-banner"
        style={{
          backgroundImage: dept.bannerImage
            ? `url(${dept.bannerImage})`
            : undefined,
        }}
      >
        <div className="detail-banner-overlay">
          <Link to="/departments" className="back-link">
            ← Departments
          </Link>
          <h1 className="detail-title">{dept.name}</h1>
          <div className="detail-meta">
            {dept.founded && <span>Founded {dept.founded}</span>}
            {dept.students && (
              <span>🎓 {dept.students.toLocaleString()} students</span>
            )}
          </div>
        </div>
      </div>
      <div className="detail-body">
        Admin controls
        {token && (
          <div className="admin-bar">
            <span className="admin-badge">Admin mode</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowEdit(true)}
            >
              Edit department
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>
          </div>
        )}
        About
        <section className="detail-section">
          <h2 className="section-title">About</h2>
          <p className="section-body">{dept.description}</p>
        </section>
        Gallery
        {dept.images?.length > 0 && (
          <section className="detail-section">
            <h2 className="section-title">Gallery</h2>
            <div className="gallery">
              {dept.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${dept.name} ${i + 1}`}
                  className="gallery-img"
                />
              ))}
            </div>
          </section>
        )}
        Contact
        {dept.contact && (
          <section className="detail-section">
            <h2 className="section-title">Contact</h2>
            <div className="contact-grid">
              <ContactItem
                label="Email"
                value={dept.contact.email}
                href={`mailto:${dept.contact.email}`}
              />
              <ContactItem
                label="Phone"
                value={dept.contact.phone}
                href={`tel:${dept.contact.phone}`}
              />
              <ContactItem label="Office" value={dept.contact.office} />
              <ContactItem label="Hours" value={dept.contact.hours} />
            </div>
          </section>
        )}
      </div>
      {showEdit && (
        <div className="modal-backdrop" onClick={() => setShowEdit(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Edit department</h2>
            <DeptForm
              initial={dept}
              onSave={handleEdit}
              onCancel={() => setShowEdit(false)}
              loading={saving}
            />
          </div>
        </div>
      )}
      {showDelete && (
        <ConfirmDialog
          title="Delete department"
          message={`Permanently delete "${dept.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}

function ContactItem({ icon, label, value, href }) {
  return (
    <div className="contact-item">
      <span className="contact-icon">{icon}</span>
      <div>
        <div className="contact-label">{label}</div>
        {href ? (
          <a href={href} className="contact-value link">
            {value}
          </a>
        ) : (
          <div className="contact-value">{value}</div>
        )}
      </div>
    </div>
  );
}
