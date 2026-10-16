import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminHome.css";
import { getTask } from "../Services/TaskService";
import { DeleteTask } from "../Services/TaskService";
import { useState } from "react";

function AdminHome() {
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const todoTask = task.filter((sends) => sends.status === "To Do").length;
  const inProgressTasks = task.filter(
    (sends) => sends.status === "In Progress",
  ).length;
  const completedTasks = task.filter(
    (sends) => sends.status === "Completed",
  ).length;

  async function Logout(e) {
    e.preventDefault();

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  useEffect(() => {
    const adminLogoutGateway = localStorage.getItem("isLoggedIn");

    if (adminLogoutGateway !== "true") {
      navigate("/");
    }
  }, []);

  useEffect(() => {

    fetchAllTask();
  }, []);

  async function fetchAllTask() {
    try {
      setLoading(true);
     

      const response = await getTask();
      const data = await response.json();

      

      if (response.ok) {
        setTask(data.getTask);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id) {
    try {
      setDeleteLoading(true);
      const response = await DeleteTask(id);

      if (!response.ok) {
        alert(response.message);
        return;
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setDeleteLoading(false);
      fetchAllTask();
    }
  }

  return (
    <>
      <div className="home-page">
        <nav className="home-navbar">
          <div className="home-logo">
            Task<span>Flow</span>
          </div>

          <div className="home-nav-right">
            <span className="home-user">My Workspace</span>
            <button onClick={(e) => Logout(e)} className="home-logout">
              Logout
            </button>
          </div>
        </nav>

        <main className="home-content">
          <section className="home-welcome">
            <p className="home-eyebrow">WORKSPACE OVERVIEW</p>

            <h1>
              Organize your work.
              <br />
              <span>Find your flow.</span>
            </h1>

            <p className="home-description">
              Manage your tasks, track progress, and keep your team moving
              forward.
            </p>

            <button
              className="create-task-btn"
              onClick={() => navigate("/createTask")}
            >
              <i className="bi bi-plus-lg"></i>
              Create a task
            </button>
          </section>

          <section className="task-overview">
            <div className="overview-heading">
              <h2>Your overview</h2>
              <span>All tasks</span>
            </div>

            <div className="overview-grid">
              <div className="overview-card">
                <span>Total tasks</span>
                <h3>{loading ? "..." : task.length}</h3>
                <p>Tasks in your workspace</p>
              </div>

              <div className="overview-card">
                <span>To do</span>
                <h3>{loading ? "..." : todoTask}</h3>
                <p>Waiting to get started</p>
              </div>

              <div className="overview-card">
                <span>In progress</span>
                <h3>{loading ? "..." : inProgressTasks}</h3>
                <p>Currently being worked on</p>
              </div>

              <div className="overview-card">
                <span>Completed</span>
                <h3>{loading ? "..." : completedTasks}</h3>
                <p>Successfully finished</p>
              </div>
            </div>
          </section>

          <section className="recent-tasks">
            <div>
              <h2>Recent tasks</h2>
              <p>Your work, all in one place.</p>
            </div>
            {task.length === 0 ? (
              <div className="empty-tasks">
                <i className="bi bi-inbox"></i>
                <h3>No tasks yet</h3>
                <p>Create your first task and start making progress.</p>
              </div>
            ) : (
              task.map((task) => (
                <div className="task-card" key={task._id}>
                  <div className="task-info">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>

                    <div className="task-meta">
                      <span>{task.assigneeEmail}</span>
                      <span>{task.priority}</span>
                      <span>{task.status || "To Do"}</span>
                    </div>
                  </div>

                  <button
                    className="delete-task-btn"
                    onClick={() => deleteTask(task._id)}
                    disabled={deleteLoading}
                  >
                    <i className="bi bi-trash3"></i>
                    {deleteLoading ? "Deleting..." : " Delete"}
                  </button>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default AdminHome;
