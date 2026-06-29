import { useParams, Link } from "react-router-dom";
import { faculty, departments } from "../data/dummyData";

function FacultyDetail() {
  const { id } = useParams();

  const professor = faculty.find((p) => p.id === Number(id));

  if (!professor) {
    return (
      <div className="faculty-detail-page">
        <h1>Professor not found</h1>
        <Link to="/faculty">Back to faculty list</Link>
      </div>
    );
  }

  const department = departments.find(
    (d) => d.id === professor.departmentId
  );

  return (
    <div className="faculty-detail-page">
      <Link to="/faculty" className="back-link">
        &larr; Back to all faculty
      </Link>

      <div className="faculty-detail-header">
        <img
          src={professor.profileImage}
          alt={professor.name}
          className="faculty-detail-image"
        />
        <div>
          <h1>{professor.name}</h1>
          {department && (
            <p className="faculty-detail-department">
              Department:{" "}
              <Link to={`/departments/${department.id}`}>
                {department.name}
              </Link>
            </p>
          )}
          <p className="faculty-detail-contact">{professor.contactInfo}</p>
        </div>
      </div>

      <div className="faculty-detail-bio">
        <h2>Bio</h2>
        <p>{professor.bio}</p>
      </div>
    </div>
  );
}

export default FacultyDetail;
