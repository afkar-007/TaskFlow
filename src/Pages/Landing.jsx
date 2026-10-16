import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Landing.css'
import { useEffect } from 'react'

function Landing() {

  const savedRole = localStorage.getItem("role")
  const navigate = useNavigate()

    useEffect(()=>{
      const Gateway = localStorage.getItem("isLoggedIn")
      if(Gateway==="true"){
        if(savedRole==="admin"){
          navigate("/AdminHome")
        }else{
          navigate("/home")
        }
        }
  
    },[navigate])




  return (
    <>
    <div className="landing-page">
<nav className="landing-nav">
<h2>TaskFlow<span>.</span></h2>
</nav>

  <section className="landing-content">
    <p className="landing-tag">PLAN BETTER. WORK SMARTER.</p>

    <h1>
      Your work,
      <br />
      <span>under control.</span>
    </h1>

    <p className="landing-description">
      Organize projects, assign tasks to your team,
      and track every step towards your goals.
      Everything you need to work better, in one place.
    </p>

    <button
      className="landing-button"
      onClick={() => navigate("/login")}
    >
      Sign Up <span>→</span>
    </button>

    <p className="landing-footer">
      Plan your work. Achieve more.
    </p>
  </section>
</div>
    
    
    </>
  )
}

export default Landing