import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../api/auth";
import {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "../api/departments";
import {
  getAllFaculty,
  createFaculty,
  deleteFaculty,
  updateFaculty,
} from "../api/faculty";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const [deptName, setDeptName] = useState("");
  const [deptDescription, setDeptDescription] = useState("");
  const [deptContact, setDeptContact] = useState("");
  const [deptImage, setDeptImage] = useState("");

  const [editingDept, setEditingDept] = useState(null);
  const [editDeptName, setEditDeptName] = useState("");
  const [editDeptDescription, setEditDeptDescription] = useState("");
  const [editDeptContact, setEditDeptContact] = useState("");
  const [editDeptImage, setEditDeptImage] = useState("");

  const [facName, setFacName] = useState("");
  const [facBio, setFacBio] = useState("");
  const [facContact, setFacContact] = useState("");
  const [facDeptId, setFacDeptId] = useState("");
  const [facImage, setFacImage] = useState("");

  const [editingFac, setEditingFac] = useState(null);
  const [editFacName, setEditFacName] = useState("");
  const [editFacBio, setEditFacBio] = useState("");
  const [editFacContact, setEditFacContact] = useState("");
  const [editFacDeptId, setEditFacDeptId] = useState("");
  const [editFacImage, setEditFacImage] = useState("");

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
        banner_image_url:
          deptImage || "https://placehold.co/800x300?text=" + deptName,
      },
      token,
    );
    setDeptName("");
    setDeptDescription("");
    setDeptContact("");
    setDeptImage("");
    fetchData();
  };

  const handleDeleteDepartment = async (id) => {
    await deleteDepartment(id, token);
    fetchData();
  };

  const handleEditDept = (dept) => {
    setEditingDept(dept.id);
    setEditDeptName(dept.name);
    setEditDeptDescription(dept.description);
    setEditDeptContact(dept.contact_info);
    setEditDeptImage(dept.banner_image_url || "");
  };

  const handleUpdateDepartment = async () => {
    await updateDepartment(
      editingDept,
      {
        name: editDeptName,
        description: editDeptDescription,
        contact_info: editDeptContact,
        banner_image_url: editDeptImage,
      },
      token,
    );
    setEditingDept(null);
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
        profile_image_url:
          facImage || "https://placehold.co/200x200?text=" + facName,
      },
      token,
    );
    setFacName("");
    setFacBio("");
    setFacContact("");
    setFacDeptId("");
    setFacImage("");
    fetchData();
  };

  const handleDeleteFaculty = async (id) => {
    await deleteFaculty(id, token);
    fetchData();
  };

  const handleEditFac = (fac) => {
    setEditingFac(fac.id);
    setEditFacName(fac.name);
    setEditFacBio(fac.bio);
    setEditFacContact(fac.contact_info);
    setEditFacDeptId(fac.department_id);
    setEditFacImage(fac.profile_image_url || "");
  };

  const handleUpdateFaculty = async () => {
    await updateFaculty(
      editingFac,
      {
        name: editFacName,
        bio: editFacBio,
        contact_info: editFacContact,
        department_id: editFacDeptId,
        profile_image_url: editFacImage,
      },
      token,
    );
    setEditingFac(null);
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
          <input
            type="text"
            placeholder="Banner image URL (optional)"
            value={deptImage}
            onChange={(e) => setDeptImage(e.target.value)}
          />
          <button className="add-button" onClick={handleAddDepartment}>
            Add Department
          </button>
        </div>
        <ul className="admin-list">
          {departments.map((dept) => (
            <li key={dept.id} className="admin-list-item">
              {editingDept === dept.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editDeptName}
                    onChange={(e) => setEditDeptName(e.target.value)}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={editDeptDescription}
                    onChange={(e) => setEditDeptDescription(e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={editDeptContact}
                    onChange={(e) => setEditDeptContact(e.target.value)}
                    placeholder="Contact email"
                  />
                  <input
                    type="text"
                    value={editDeptImage}
                    onChange={(e) => setEditDeptImage(e.target.value)}
                    placeholder="Banner image URL"
                  />
                  <div className="edit-buttons">
                    <button
                      className="save-button"
                      onClick={handleUpdateDepartment}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditingDept(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{dept.name}</span>
                  <div className="item-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEditDept(dept)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteDepartment(dept.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

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
          <input
            type="text"
            placeholder="Profile image URL (optional)"
            value={facImage}
            onChange={(e) => setFacImage(e.target.value)}
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
              {editingFac === fac.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editFacName}
                    onChange={(e) => setEditFacName(e.target.value)}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={editFacBio}
                    onChange={(e) => setEditFacBio(e.target.value)}
                    placeholder="Bio"
                  />
                  <input
                    type="text"
                    value={editFacContact}
                    onChange={(e) => setEditFacContact(e.target.value)}
                    placeholder="Contact email"
                  />
                  <input
                    type="text"
                    value={editFacImage}
                    onChange={(e) => setEditFacImage(e.target.value)}
                    placeholder="Profile image URL"
                  />
                  <select
                    value={editFacDeptId}
                    onChange={(e) => setEditFacDeptId(e.target.value)}
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <div className="edit-buttons">
                    <button
                      className="save-button"
                      onClick={handleUpdateFaculty}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditingFac(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{fac.name}</span>
                  <div className="item-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEditFac(fac)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteFaculty(fac.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Admin;
