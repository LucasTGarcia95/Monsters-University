import { Link } from "react-router-dom";

export function DepartmentList({ departments }) {
  if (departments.length === 0) {
    return <p className="empty-state">No departments found.</p>;
  }

  return (
    <ul className="dept-list">
      {departments.map((department) => (
        <DepartmentListItem key={department.id} department={department} />
      ))}
    </ul>
  );
}

function DepartmentListItem({ department }) {
  return (
    <li className="dept-list-item">
      <Link to={`/departments/${department.id}`} className="dept-link">
        <span className="dept-name">{department.name}</span>
        {department.description && (
          <span className="dept-description">{department.description}</span>
        )}
      </Link>
    </li>
  );
}
