
import { useNavigate } from "react-router-dom";
import "../styles/About.css"

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div
        className="about-back"
        onClick={() => navigate("/home")}
      >
        <i className="bi bi-arrow-left"></i>
        <span>Back to Home</span>
      </div>

      <section className="about-hero">
        <div className="about-logo">
          <i className="bi bi-layers"></i>
        </div>

        <p className="about-eyebrow">INTRODUCING TASKFLOW</p>

        <h1>
          Work smarter.
          <br />
          <span>Move forward together.</span>
        </h1>

        <p className="about-description">
          TaskFlow helps teams organize tasks, manage priorities,
          track progress, and stay aligned from start to finish.
        </p>
      </section>

      <section className="about-mission">
        <div className="about-section-heading">
          <p className="about-eyebrow">OUR PURPOSE</p>
          <h2>Everything in one workflow.</h2>
        </div>

        <p>
          Managing team work should be simple and transparent.
          TaskFlow brings tasks, responsibilities, deadlines, and
          progress updates together in one workspace, helping
          managers and team members work with clarity.
        </p>
      </section>

      <section className="about-features">
        <div className="about-section-heading">
          <p className="about-eyebrow">WHAT YOU CAN DO</p>
          <h2>Built for better teamwork.</h2>
        </div>

        <div className="about-feature-grid">
          <div className="about-feature-card">
            <div className="about-feature-icon">
              <i className="bi bi-clipboard-check"></i>
            </div>
            <h3>Task Management</h3>
            <p>
              Create tasks, add descriptions, set priorities,
              and keep deadlines organized.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <i className="bi bi-people"></i>
            </div>
            <h3>Team Collaboration</h3>
            <p>
              Assign responsibilities to team members and
              make ownership clear.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <h3>Progress Tracking</h3>
            <p>
              Follow task status from To Do to In Progress
              and Completed.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <i className="bi bi-speedometer2"></i>
            </div>
            <h3>Clear Dashboard</h3>
            <p>
              Get an overview of tasks and understand how
              work is progressing.
            </p>
          </div>
        </div>
      </section>

      <section className="about-bottom">
        <h2>Make every task count.</h2>
        <p>
          Bring structure to your work and keep your team
          moving in the same direction.
        </p>

        <button onClick={() => navigate("/home")}>
          <i className="bi bi-grid"></i>
          Go to Dashboard
        </button>
      </section>

      <footer className="about-footer">
        <span>TaskFlow</span>
        <span>Organize work. Track progress. Deliver together.</span>
      </footer>
    </div>
  );
}

export default About;