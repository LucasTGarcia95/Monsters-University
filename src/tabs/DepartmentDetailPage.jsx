import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Spinner } from "../Components/Spinner";
import { ConfirmDialog } from "../Components/ConfirmDialogue";
import { DeptForm } from "../Components/DeptForm";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api";

export default function DepartmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [dept, setDept] = useState(null);

  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [saving, setSaving] = useState(false);

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
      <div
        className="detail-banner"
        style={{
          backgroundImage: dept.banner_image_url
            ? `url(${dept.banner_image_url})`
            : undefined,
        }}
      >
        <div className="detail-banner-overlay">
          <Link to="/departments" className="back-link">
            Departments
          </Link>
          <h1 className="detail-title">{dept.name}</h1>
        </div>
      </div>

      <div className="detail-body">
        {isAdmin && (
          <div className="admin-bar">
            <span className="admin-badge">Admin mode</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowEdit(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>
          </div>
        )}

        <section className="detail-section">
          <h2 className="section-title">About</h2>
          <p className="section-body">{dept.description}</p>
        </section>

        {dept.contact_info && (
          <section className="detail-section">
            <h2 className="section-title">Contact</h2>
            <p className="section-body">{dept.contact_info}</p>
          </section>
        )}

        {dept.faculty?.length > 0 && (
          <section className="detail-section">
            <h2 className="section-title">Faculty</h2>
            <ul className="faculty-list">
              {dept.faculty.map((member) => (
                <li key={member.id} className="faculty-item">
                  <span className="faculty-name">{member.name}</span>
                  {member.title && (
                    <span className="faculty-title">{member.title}</span>
                  )}
                </li>
              ))}
            </ul>
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
