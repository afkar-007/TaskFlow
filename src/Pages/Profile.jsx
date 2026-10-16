
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Profile.css'
import { fetchUser } from "../Services/userService";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      setLoading(true);
      setError("");

      const currentUser = await fetchUser();
      setUser(currentUser);
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="profile-message">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="profile-message">
        <p>{error}</p>
        <button onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    );
  }

  if (!user) {
    return <div className="profile-message">User not found</div>;
  }

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="profile-page">
      <div
        className="profile-back"
        onClick={() => navigate("/home")}
      >
        <i className="bi bi-arrow-left"></i>
        <span>Back to Home</span>
      </div>

      <div className="profile-heading">
        <p className="profile-eyebrow">ACCOUNT SETTINGS</p>
        <h1>My Profile</h1>
        <p className="profile-subtitle">
          Manage your personal information.
        </p>
      </div>

      <div className="profile-card">
        <div className="profile-user-header">
          <div className="profile-avatar">{initial}</div>

          <div className="profile-user-info">
            <h2>{user.name || "User"}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-divider"></div>

        <div className="profile-details">
          <div className="profile-detail-item">
            <span>Full Name</span>
            <p>{user.name || "Not provided"}</p>
          </div>

          <div className="profile-detail-item">
            <span>Email Address</span>
            <p>{user.email || "Not provided"}</p>
          </div>

          <div className="profile-detail-item">
            <span>Role</span>
            <p>{user.role || "Team Member"}</p>
          </div>

          <div className="profile-detail-item">
            <span>Account Status</span>
            <p>Active</p>
          </div>
        </div>

        <button
          className="profile-home-button"
          onClick={() => navigate("/home")}
        >
          <i className="bi bi-house"></i>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;
