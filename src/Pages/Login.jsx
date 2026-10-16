import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Login.css";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const emailPattern = /^[^\s@]+@gmail\.com$/;
  const [loading, setLoading] = useState(false);
  const savedRole = localStorage.getItem("role")
   const [showPassword, setShowPassword] = useState(false);

 

  useEffect(() => {
    const Gateway = localStorage.getItem("isLoggedIn");
    if (Gateway === "true") {
      if(savedRole==="admin"){
        navigate("/AdminHome")
      }else{
        navigate("/home")
      }
      
    }
  }, [navigate]);

  async function login(e) {
    e.preventDefault();

    try {
      setLoading(true);

      if (!email.trim(" ")) {
        return setError("E-mail field is empty");
      }

      if (!emailPattern.test(email)) {
        return setError("Enter a valid E-mail");
      }

      if (!password.trim(" ")) {
        return setError("Password field is empty");
      }
      if (password.length < 4) {
        return setError("Password  have at least 4 characters  ");
      }
      setError(null);

      const user = {
        email: email,
        password: password,
      };

      const response = await fetch("https://taskflow-backend-zq3y.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      if (response.ok) {
        setError(null);
       
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId",data.userId)
        localStorage.setItem("token",data.token)
        localStorage.setItem("role",data.role)
        

        
        

          if(data.role==="admin"){
    navigate("/AdminHome")

  }else{
    navigate('/home')
  }

       
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }








  return (
    <div className="login-page">
      <nav className="login-nav">
        <h2 onClick={() => navigate("/")}>
          TaskFlow<span>.</span>
        </h2>

        <button className="login-back" onClick={() => navigate("/")}>
          Back to home
        </button>
      </nav>

      <main className="login-container">
        <div className="login-heading">
          <p className="login-eyebrow">WELCOME BACK</p>

          <h1>
            Good to have
            <br />
            <span>you back.</span>
          </h1>

          <p className="login-description">
            Sign in to continue managing your projects and keeping your team on
            track.
          </p>
        </div>

        <form className="login-form">
          <div className="login-field">
            <label htmlFor="email">Email address</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <input
              type={showPassword?"text":"password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
          <p className="error">{error}</p>

          <button
            onClick={(e) => login(e)}
            className="login-submit"
            type="submit"
            disabled={loading}

          >
            {loading ? "Logining..." : "Sign in"} <span>→</span>
          </button>
        </form>

        <p className="login-note">
          New to TaskFlow?{" "}
          <button type="button" onClick={() => navigate("/register")}>
            Create an account
          </button>
        </p>

        <p className="login-footer">Simple tools. Better teamwork.</p>
      </main>
    </div>
  );
}

export default Login;
