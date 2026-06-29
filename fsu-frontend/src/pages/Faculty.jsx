import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllFaculty } from "../api/faculty";
import "./Faculty.css";

function Faculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllFaculty()
      .then(setFacultyList)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading faculty...</p>;

  return (
    <div className="faculty-list-page">
      <h1>MU Faculty</h1>
      <p className="page-subtitle">
        Meet the monsters shaping the next generation of scarers.
      </p>
      <div className="faculty-grid">
        {facultyList.map((professor) => (
          <Link
            to={`/faculty/${professor.id}`}
            key={professor.id}
            className="faculty-card"
          >
            <img
              src={professor.profile_image_url}
              alt={professor.name}
              className="faculty-card-image"
            />
            <h3>{professor.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Faculty;
