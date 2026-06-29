import { Link } from "react-router-dom";
import { faculty, departments } from "../data";
import "./Faculty.css";

function Faculty() {
  const getDepartmentName = (department_id) => {
    const department = departments.find((d) => d.id === department_id);
    return department ? department.name : "Unknown department";
  };

  return (
    <div className="faculty-list-page">
      <h1>MU Faculty</h1>
      <p className="page-subtitle">
        Meet the monsters shaping the next generation of scarers.
      </p>
      <div className="faculty-grid">
        {faculty.map((professor) => (
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
            <p className="faculty-card-department">
              {getDepartmentName(professor.department_id)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Faculty;
