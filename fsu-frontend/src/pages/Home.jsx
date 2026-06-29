import { Link } from "react-router-dom";
import muLogo from "../assets/mu-logo.png";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <img
            src={muLogo}
            alt="Monsters University Logo"
            className="hero-logo"
          />
          <h1>Welcome to Monsters University</h1>
          <p className="hero-subtitle">We scare because we care.</p>
          <p className="hero-description">
            Monsters University is the premier institution for monsters seeking
            to master the art of scaring, door technology, fear studies, and
            more. Join us and unleash your inner monster.
          </p>
          <div className="hero-buttons">
            <Link to="/departments" className="hero-btn primary">
              Explore Departments
            </Link>
            <Link to="/faculty" className="hero-btn secondary">
              Meet Our Faculty
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h2>4+</h2>
          <p>Academic Departments</p>
        </div>
        <div className="stat-card">
          <h2>6+</h2>
          <p>World Class Faculty</p>
        </div>
        <div className="stat-card">
          <h2>#1</h2>
          <p>Scaring Program in the Monster World</p>
        </div>
        <div className="stat-card">
          <h2>1313</h2>
          <p>Founded</p>
        </div>
      </section>

      <section className="about-section">
        <h2>Why Monsters University?</h2>
        <div className="about-grid">
          <div className="about-card">
            <span className="about-icon">😱</span>
            <h3>Elite Scaring Program</h3>
            <p>
              Learn from the best scarers in the monster world, including record
              holders and Monsters Inc. veterans.
            </p>
          </div>
          <div className="about-card">
            <span className="about-icon">🚪</span>
            <h3>Door Technology</h3>
            <p>
              Pioneer the science of door-based travel and power the scare floor
              with precision and expertise.
            </p>
          </div>
          <div className="about-card">
            <span className="about-icon">🔬</span>
            <h3>Fear Research</h3>
            <p>
              Cutting edge research into what makes humans tick — and scream —
              led by our world renowned faculty.
            </p>
          </div>
          <div className="about-card">
            <span className="about-icon">🏆</span>
            <h3>Athletics</h3>
            <p>
              Home of the MU Roar Omega Roar. Compete in the Scare Games and
              make your mark on monster history.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Join Monsters University?</h2>
        <p>Create an admin account to manage departments and faculty.</p>
        <Link to="/register" className="hero-btn primary">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default Home;
