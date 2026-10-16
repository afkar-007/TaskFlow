import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Task.css";
import { useNavigate } from "react-router-dom";

function Task() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  async function fetchTask() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://taskflow-backend-zq3y.onrender.com/task/getOneTask/${id}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch task");
      }

      const currentTask = data.getTask || data;

      setTask(currentTask);
      setStatus(currentTask.status || "To Do");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function editTask(id) {
    try {
      setUpdateLoading(true);
      const editValue = { status: status };

    

      const response = await fetch(
        `hhttps://taskflow-backend-zq3y.onrender.com/task/editTask/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editValue),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        console.log(data.message);
        return;
      }

      if (response.ok) {
        
        fetchTask();
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setUpdateLoading(false);
    }
  }

  if (loading) {
    return <div className="task-message">Loading task...</div>;
  }

  if (error) {
    return <div className="task-message">{error}</div>;
  }

  if (task === null) {
    return <div className="task-message">Task not found</div>;
  }

  return (
    <>
      <div className="task-details-page">
        <button onClick={() => navigate("/home")} className="taskButton">
          {" "}
          <i className="bi bi-arrow-left"></i> Back to Home
        </button>
        <div className="task-details-header">
          <div>
            <p className="task-eyebrow">TASK WORKSPACE</p>
            <h1>{task.title}</h1>
            <p className="task-subtitle">
              View task information and update your progress.
            </p>
          </div>

          <span
            className={`task-status status-${status.replaceAll(" ", "-").toLowerCase()}`}
          >
            {status}
          </span>
        </div>

        <div className="task-details-grid">
          <section className="task-details-card task-main-card">
            <h2>Description</h2>
            <p className="task-description">
              {task.description || "No description provided."}
            </p>

            <div className="task-divider" />

            <h2>Task Information</h2>

            <div className="task-information">
              <div>
                <span>Assigned To</span>
                <p>{task.assigneeEmail || "Not specified"}</p>
              </div>

              <div>
                <span>Priority</span>
                <p>{task.priority || "Medium"}</p>
              </div>

              <div>
                <span>Due Date</span>
                <p>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "Not specified"}
                </p>
              </div>
              <div>
                <span>Status</span>
                <p>{task.status || "Not specified"}</p>
              </div>

              <div>
                <span>Created At</span>
                <p>
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>
          </section>

          <aside className="task-details-card task-progress-card">
            <h2>Update Progress</h2>
            <p>Keep your manager informed about your work.</p>

            <label htmlFor="task-status">Task Status</label>

            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              onClick={() => editTask(id)}
              className="task-save-button"
              disabled={status === "To Do"}
            >
              {updateLoading ? "updating..." : "Save Status"}
            </button>
          </aside>
        </div>
      </div>
    </>
  );
}

export default Task;
