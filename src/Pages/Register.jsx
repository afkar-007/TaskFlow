import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const emailPattern = /^[^\s@]+@gmail\.com$/;

  const [error, setError] = useState(null);

  async function Register(e) {
    try {
      setLoading(true)
      e.preventDefault();

      if (!name.trim(" ")) {
        setError("User name is empty");
        return;
      }

      if (name.length < 3) {
        setError("User name should at least 3 characters");
        return;
      }
      if (!email.trim(" ")) {
        setError("E-mail field is empty ");
        return;
      }

      if (!emailPattern.test(email)) {
        setError("Not a valid email");
        return;
      }
      if (!password.trim(" ")) {
        setError("Password field is empty ");
        return;
      }

      if (password.length < 4) {
        setError("Password should be 4 characters ");
        return;
      }

      if (!conPassword.trim(" ")) {
        setError("Confirm Password field is empty ");
        return;
      }

      if (conPassword.length < 4) {
        setError(" Confirm Password should be 4 characters ");
        return;
      }

      if (password !== conPassword) {
        setError("Password not match ");
        return;
      }

      setError(null);


      const NewUser = {
        name: name,
        email: email,
        password: conPassword,
      };

      const response = await fetch("https://taskflow-backend-zq3y.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NewUser),
      });

      const data = await response.json();

      if (!response.ok) {
        return setError(data.message);
      }

      if (response.ok) {
        alert(data.message);
        navigate("/login");
        setName("");
        setEmail("");
        setPassword("");
        setConPassword("");
        setError(null);
      }
    } catch (err) {
      console.log(err.message);
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <nav className="register-nav">
        <h2 onClick={() => navigate("/")}>
          TaskFlow<span>.</span>
        </h2>

        <button
          type="button"
          className="register-back"
          onClick={() => navigate("/login")}
        >
          Sign in
        </button>
      </nav>

      <main className="register-container">
        <header className="register-heading">
          <p className="register-eyebrow">GET STARTED</p>

          <h1>
            Make room
            <br />
            <span>for better work.</span>
          </h1>

          <p className="register-description">
            Create your account and bring your projects, tasks, and team
            together in one place.
          </p>
        </header>

        <form className="register-form">
          <div className="register-field">
            <label htmlFor="name">Full name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-email">Email address</label>

            <input
              type="email"
              id="register-email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-password">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              id="register-password"
              name="password"
              placeholder="At least 4 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              maxLength={15}
            />
            <i
              onClick={() => setShowPassword(!showPassword)}
              className={
                showPassword
                  ? "bi bi-eye password"
                  : "bi bi-eye-slash-fill password"
              }
            ></i>
          </div>

          <div className="register-field">
            <label htmlFor="confirm-password">Confirm password</label>

            <input
              type={confirmShowPassword ? "text" : "password"}
              id="confirm-password"
              name="confirmPassword"
              placeholder="Enter your password again"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              autoComplete="new-password"
              maxLength={15}
            />
            <i
              onClick={() => setConfirmShowPassword(!confirmShowPassword)}
              className={
                confirmShowPassword
                  ? "bi bi-eye conPassword"
                  : "bi bi-eye-slash-fill conPassword"
              }
            ></i>
          </div>

          {error && <p className="register-error">{error}</p>}

          <button
            type="submit"
            className="register-submit"
            onClick={(e) => Register(e)}
            disabled={loading}
          >
            {loading ? "Registering..." : "Create account "} <span>→</span>
          </button>
        </form>

        <p className="register-note">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")}>
           Sign in
          </button>
        </p>

        <p className="register-footer">Simple tools. Better teamwork.</p>
      </main>
    </div>
  );
}

export default Register;
