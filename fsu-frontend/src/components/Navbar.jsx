import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🏫 Monsters University
      </Link>
      <div className="navbar-links">
        <Link to="/departments">Departments</Link>
        <Link to="/faculty">Faculty</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
