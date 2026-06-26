import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2026 Monsters University | <Link to="/departments">Departments</Link>{" "}
        | <Link to="/faculty">Faculty</Link>
      </p>
    </footer>
  );
}

export default Footer;
