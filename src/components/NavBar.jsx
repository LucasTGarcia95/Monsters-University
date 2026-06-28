import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../api/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🏫 Monsters University
      </Link>
      <div className="navbar-links">
        <Link to="/departments">Departments</Link>
        <Link to="/faculty">Faculty</Link>
        {loggedIn ? (
          <>
            <Link to="/admin">Dashboard</Link>
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
