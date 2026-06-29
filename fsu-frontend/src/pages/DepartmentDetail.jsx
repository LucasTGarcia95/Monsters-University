import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { departments, faculty } from "../data";
import { isLoggedIn } from "../api/auth";
import "./DepartmentDetail.css";

function DepartmentDetail() {
  const { id } = useParams();
  const [dept, setDept] = useState(null);
  const [deptFaculty, setDeptFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    // TODO: swap for getDepartmentById(id) from ../api/departments when backend is ready
    const found = departments.find((d) => d.id === parseInt(id));
    const members = faculty.filter((f) => f.department_id === parseInt(id));
    setDept(found);
    setDeptFaculty(members);
    setLoading(false);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!dept) return <p>Department not found.</p>;

  return (
    <div className="dept-detail-container">
      <div
        className="dept-banner"
        style={{ backgroundImage: `url(${dept.banner_image_url})` }}
      >
        <div className="dept-banner-overlay">
          <Link to="/departments" className="back-link">
            ← Departments
          </Link>
          <h1>{dept.name}</h1>
        </div>
      </div>

      <div className="dept-detail-body">
        {loggedIn && (
          <div className="admin-bar">
            <span className="admin-badge">⚙️ Admin Mode</span>
            <Link to="/admin" className="btn-edit">
              Edit Department
            </Link>
          </div>
        )}

        <section className="dept-section">
          <h2>About</h2>
          <p>{dept.description}</p>
        </section>

        <section className="dept-section">
          <h2>Contact</h2>
          <p>
            📧 <a href={`mailto:${dept.contact_info}`}>{dept.contact_info}</a>
          </p>
        </section>

        <section className="dept-section">
          <h2>Faculty</h2>
          {deptFaculty.length === 0 ? (
            <p>No faculty members found for this department.</p>
          ) : (
            <div className="faculty-grid">
              {deptFaculty.map((member) => (
                <Link
                  to={`/faculty/${member.id}`}
                  key={member.id}
                  className="faculty-card"
                >
                  <img src={member.profile_image_url} alt={member.name} />
                  <div>
                    <h3>{member.name}</h3>
                    <p>{member.contact_info}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DepartmentDetail;
