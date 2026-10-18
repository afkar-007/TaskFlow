import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { fetchUser } from "../Services/userService";
import { getCurrentUserTask } from "../Services/TaskService";
import { useEffect, useState } from "react";
import LoadingGif from '../assets/Loading.gif'



function Home() {
  const navigate = useNavigate();

  const [user, SetUser] = useState({});

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const[taskLoading,setTaskLoading]=useState(true)

    useEffect(()=>{
    const logoutGateway = localStorage.getItem('isLoggedIn')
    
    

  if(logoutGateway !=="true"){
    navigate('/')
  }
  

  },[])

  useEffect(() => {
     async function loadData() {
    await getUser();
    await getUserTask();
  }
  loadData()

  




  }, []);



  async function getUser() {
    try {
      

      setLoading(true);
      const currentUser = await fetchUser();
      SetUser(currentUser);
      localStorage.setItem("UserEmail", currentUser.email);

     
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function getUserTask() {
    try {
      setTaskLoading(true)
      

      const totalUserTask = await getCurrentUserTask();
      setTask(totalUserTask.userTaskTotal)
      
      
      
    } catch (err) {
      console.log(err.message);
    }
    finally{
      setTaskLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("UserEmail")

    navigate("/");
  };

  const completed = task.filter((task) => task.status === "Completed").length;

  const inProgress = task.filter(
    (task) => task.status === "In Progress",
  ).length;

  const pending = task.filter((task) => task.status === "Pending").length;

  return (
    <>
    {loading ? (
  <div className="loading-container">
    <img src={LoadingGif} alt="Loading..." />
    <p>Loading...</p>
  </div>
) :( 
    <div className="employee-dashboard">
      <aside className="employee-sidebar">
        <div className="taskflow-brand">
          <div className="brand-icon">
            <i className="bi bi-layers"></i>
          </div>

          <div>
            <h2>TaskFlow</h2>
            <span>WORKSPACE</span>
          </div>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="employee-nav">
         
          <a className="nav-item active" href="#overview">
    <i className="bi bi-grid-1x2"></i>
    Overview
  </a>

  <a className="nav-item" href="#my-tasks">
    <i className="bi bi-check2-square"></i>
    My Tasks
  </a>

          <p  className="nav-item" onClick={()=>navigate('/about')}>
            <i className="bi bi-journal-bookmark-fill"></i>
            About
          </p>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-profile" onClick={()=>navigate('/profile')}>
            <div className="profile-avatar">{user?.name?.charAt(0) || "u"}</div>

            <div className="profile-info">
              <strong>{loading ? "Loading..." : user.name}</strong>
              <span>Team Member</span>
            </div>
          </div>

          <button className="logout-button" onClick={logout}>
            <i className="bi bi-box-arrow-right"></i>
            Sign out
          </button>
        </div>
      </aside>

      <main className="employee-main">
        <header className="dashboard-header">
          <div>
            <p className="header-eyebrow">YOUR WORKSPACE</p>
            <h1>My Dashboard</h1>
            <p className="header-description">
              Stay focused. Keep your work moving forward.
            </p>
          </div>

          <div className="header-date">
            <i className="bi bi-calendar3"></i>
        {new Date().toLocaleString("en-US", { month: "long" })} {new Date().getFullYear()}
          </div>
        </header>

        <section className="welcome-card" id="overview">
          <div className="welcome-content">
            <span className="welcome-tag">
              <span className="online-dot"></span>
              EMPLOYEE WORKSPACE
            </span>

            <h2>Welcome back!</h2>

            <p>
              Every task is progress. Review your priorities and make today
              productive.
            </p>

            <a href="#my-tasks" className="welcome-link">
              View my tasks
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>

          <div className="welcome-art">
            <div className="art-ring ring-one"></div>
            <div className="art-ring ring-two"></div>
            <i className="bi bi-check2-circle"></i>
          </div>
        </section>

        <section className="task-stat-grid">
          <div className="task-stat-card">
            <div className="stat-top">
              <span>Total tasks</span>
              <i className="bi bi-layers stat-icon"></i>
            </div>
            <h2>{taskLoading?"...":task.length}</h2>
            <p>Tasks assigned to you</p>
          </div>

          <div className="task-stat-card">
            <div className="stat-top">
              <span>Pending</span>
              <i className="bi bi-hourglass-split stat-icon"></i>
            </div>
            <h2>{taskLoading?"...":pending}</h2>
            <p>Waiting to be started</p>
          </div>

          <div className="task-stat-card">
            <div className="stat-top">
              <span>In progress</span>
              <i className="bi bi-arrow-repeat stat-icon"></i>
            </div>
            <h2>{taskLoading?"...":inProgress}</h2>
            <p>Currently being worked on</p>
          </div>

          <div className="task-stat-card">
            <div className="stat-top">
              <span>Completed</span>
              <i className="bi bi-check-circle stat-icon"></i>
            </div>
            <h2>{taskLoading?"...":completed}</h2>
            <p>Successfully finished</p>
          </div>
        </section>

        <section className="tasks-section" id="my-tasks">
          <div className="section-heading">
            <div>
              <h2>My Tasks</h2>
              <p>Keep track of your assigned work.</p>
            </div>

            <span className="task-count">{task.length} tasks</span>
          </div>
          {taskLoading?"...":(
          <div>
        {task.length===0 ? <p>no tasks yet</p>: 
          <div className="task-table-wrapper">
            <table className="task-table">
              <thead>
                <tr>
                  <th>TASK</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th>DUE DATE</th>
                </tr>
              </thead>
          
              <tbody >
                
                {task.map((task) => (
                  
                  <tr onClick={()=>navigate(`/task/${task._id}`)}  key={task._id}>
                    <td>
                      <div className="task-title">
                        <strong>{task.title}</strong>
                        <span>{task.project}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`priority-badge ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          task.status === "In Progress"
                            ? "in-progress"
                            : task.status.toLowerCase()
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="task-due-date">{task.dueDate}</td>
                  </tr>
                  
                ))} 
              </tbody >
              
            </table>
          </div>}
          </div>
          )}



          <div className="tasks-footer">
            <i className="bi bi-info-circle"></i>
            These are sample tasks. Your assigned tasks will be loaded from the
            backend in the next step.
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>TaskFlow</span>
          <span>Stay organized. Get things done.</span>
        </footer>
      </main>
    </div>
    )}

    </>

  );
}

export default Home;
