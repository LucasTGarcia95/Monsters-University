import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllDepartments } from "../api/departments";
import "./Departments.css";

function Departments() {
  const [deptList, setDeptList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDepartments()
      .then((data) => {
        if (Array.isArray(data)) {
          setDeptList(data);
        } else if (data) {
          setDeptList([data]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading departments...</p>;

  return (
    <div className="departments-container">
      <h1>🏫 Academic Departments</h1>
      <p className="departments-subtitle">
        Explore the colleges and departments of Monsters University
      </p>
      <div className="departments-grid">
        {deptList.map((dept) => (
          <Link
            to={`/departments/${dept.id}`}
            key={dept.id}
            className="dept-card"
          >
            <img
              src={dept.banner_image_url}
              alt={dept.name}
              className="dept-image"
            />
            <div className="dept-info">
              <h2>{dept.name}</h2>
              <p>{dept.description}</p>
              <span className="dept-contact">📧 {dept.contact_info}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Departments;
