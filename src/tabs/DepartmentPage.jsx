import { useEffect, useState } from "react";

import { DepartmentList } from "./DepartmentList";

import { useAuth } from "./auth/AuthContext";

export default function DepartmentsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const departmentCreate = async (data) => {
    setSaving(true);
    try {
      const newDept = await api.departments.create(data);
      setDepartments((prev) => [...prev, newDept]);
      setShowCreate(false);
    } finally {
      setSaving(false);
    }
  };

  const departmentDelete = async () => {
    await api.departments.remove(deleteTarget.id);
    setDepartments((prev) => prev.filter((d) => d.id !== deleteTarget.id));
    setDeleteTarget(null);
  };
}
