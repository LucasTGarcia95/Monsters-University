import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, saveToken } from "../api/auth";
import "./Auth.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerUser({ username, password });
      if (data.token) {
        saveToken(data.token);
        navigate("/admin");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🏫 Admin Register</h1>
        <p>Create a Monsters University admin account</p>
        {error && <p className="auth-error">{error}</p>}
        <div className="auth-form">
          <div className="auth-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
            />
          </div>
          <button className="auth-button" onClick={handleSubmit}>
            Register
          </button>
        </div>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
