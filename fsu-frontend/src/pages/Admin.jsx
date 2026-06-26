import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../api/auth";
import {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
} from "../api/departments";
import { getAllFaculty, createFaculty, deleteFaculty } from "../api/faculty";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState([]);

  // Department form state
  const [deptName, setDeptName] = useState("");
  const [deptDescription, setDeptDescription] = useState("");
  const [deptContact, setDeptContact] = useState("");

  // Faculty form state
  const [facName, setFacName] = useState("");
  const [facBio, setFacBio] = useState("");
  const [facContact, setFacContact] = useState("");
  const [facDeptId, setFacDeptId] = useState("");

  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const depts = await getAllDepartments();
    const fac = await getAllFaculty();
    setDepartments(depts);
    setFaculty(fac);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddDepartment = async () => {
    if (!deptName) return;
    await createDepartment(
      {
        name: deptName,
        description: deptDescription,
        contact_info: deptContact,
      },
      token,
    );
    setDeptName("");
    setDeptDescription("");
    setDeptContact("");
    fetchData();
  };

  const handleDeleteDepartment = async (id) => {
    await deleteDepartment(id, token);
    fetchData();
  };

  const handleAddFaculty = async () => {
    if (!facName) return;
    await createFaculty(
      {
        name: facName,
        bio: facBio,
        contact_info: facContact,
        department_id: facDeptId,
      },
      token,
    );
    setFacName("");
    setFacBio("");
    setFacContact("");
    setFacDeptId("");
    fetchData();
  };

  const handleDeleteFaculty = async (id) => {
    await deleteFaculty(id, token);
    fetchData();
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🏫 Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Departments Section */}
      <section className="admin-section">
        <h2>Departments</h2>
        <div className="admin-form">
          <input
            type="text"
            placeholder="Department name"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={deptDescription}
            onChange={(e) => setDeptDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact email"
            value={deptContact}
            onChange={(e) => setDeptContact(e.target.value)}
          />
          <button className="add-button" onClick={handleAddDepartment}>
            Add Department
          </button>
        </div>
        <ul className="admin-list">
          {departments.map((dept) => (
            <li key={dept.id} className="admin-list-item">
              <span>{dept.name}</span>
              <button
                className="delete-button"
                onClick={() => handleDeleteDepartment(dept.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Faculty Section */}
      <section className="admin-section">
        <h2>Faculty</h2>
        <div className="admin-form">
          <input
            type="text"
            placeholder="Faculty name"
            value={facName}
            onChange={(e) => setFacName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bio"
            value={facBio}
            onChange={(e) => setFacBio(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact email"
            value={facContact}
            onChange={(e) => setFacContact(e.target.value)}
          />
          <select
            value={facDeptId}
            onChange={(e) => setFacDeptId(e.target.value)}
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          <button className="add-button" onClick={handleAddFaculty}>
            Add Faculty
          </button>
        </div>
        <ul className="admin-list">
          {faculty.map((fac) => (
            <li key={fac.id} className="admin-list-item">
              <span>{fac.name}</span>
              <button
                className="delete-button"
                onClick={() => handleDeleteFaculty(fac.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Admin;
