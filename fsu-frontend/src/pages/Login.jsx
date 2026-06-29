import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, saveToken } from "../api/auth";
import "./Auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = await login({ username, password });
      if (token && token !== "Invalid username or password.") {
        saveToken(token);
        navigate("/admin");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🏫 Admin Login</h1>
        <p>Welcome back to Monsters University</p>
        {error && <p className="auth-error">{error}</p>}
        <div className="auth-form">
          <div className="auth-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button className="auth-button" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
