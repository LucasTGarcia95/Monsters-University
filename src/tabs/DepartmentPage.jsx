import { useEffect, useState } from "react";
import { DepartmentList } from "./DepartmentList";
import { DeptForm } from "../Components/DeptForm";
import { useAuth } from "../auth/AuthContext";
import { Spinner } from "../Components/Spinner";
import { api } from "../api";

export default function DepartmentsPage() {
  const { isAdmin } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.departments
      .getAll()
      .then(setDepartments)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data) => {
    setSaving(true);
    try {
      const newDept = await api.departments.create(data);
      setDepartments((prev) => [...prev, newDept]);
      setShowCreate(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="page-center">
        <Spinner />
      </div>
    );

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Departments</h1>
        {isAdmin && (
          <button
            className="btn btn-primary"
            onClick={() => setShowCreate(true)}
          >
            + New Department
          </button>
        )}
      </div>

      <DepartmentList departments={departments} />

      {showCreate && (
        <div className="modal-backdrop" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">New department</h2>
            <DeptForm
              onSave={handleCreate}
              onCancel={() => setShowCreate(false)}
              loading={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
}
