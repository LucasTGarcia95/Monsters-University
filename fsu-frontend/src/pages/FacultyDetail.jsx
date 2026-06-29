import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFacultyById } from "../api/faculty";
import { isLoggedIn } from "../api/auth";
import "./Faculty.css";

function FacultyDetail() {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    getFacultyById(id)
      .then(setProfessor)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!professor) return <p>Professor not found.</p>;

  return (
    <div className="faculty-detail-page">
      <Link to="/faculty" className="back-link">
        &larr; Back to all faculty
      </Link>
      <div className="faculty-detail-header">
        <img
          src={professor.profile_image_url}
          alt={professor.name}
          className="faculty-detail-image"
        />
        <div>
          <h1>{professor.name}</h1>
          {professor.department && (
            <p className="faculty-detail-department">
              Department:{" "}
              <Link to={`/departments/${professor.department.id}`}>
                {professor.department.name}
              </Link>
            </p>
          )}
          <p className="faculty-detail-contact">{professor.contact_info}</p>
        </div>
      </div>
      <div className="faculty-detail-bio">
        <h2>Bio</h2>
        <p>{professor.bio}</p>
      </div>
      {loggedIn && (
        <div className="admin-bar" style={{ marginTop: "1.5rem" }}>
          <span className="admin-badge">⚙️ Admin Mode</span>
          <Link to="/admin" className="btn-edit">
            Edit Faculty
          </Link>
        </div>
      )}
    </div>
  );
}

export default FacultyDetail;
