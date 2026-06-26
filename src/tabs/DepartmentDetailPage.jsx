import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function DepartmentDetailsPage() {
  const { id } = useParams();
  const { navigate } = useNavigate();
  const { token } = useAuth();
  const { dept, setDept } = useState(null);

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
}
