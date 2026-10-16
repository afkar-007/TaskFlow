import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateTask.css";
import { createTaskApi } from "../Services/TaskService";

function CreateTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeEmail, setAssigneeEmail] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const emailPattern = /^[^\s@]+@gmail\.com$/;
  const [loading,setLoading]=useState(false)
  const [ search,setSearch]=useState("")
  const[users,setUsers]=useState([])
  const UserId = localStorage.getItem("userId")
  const[userLoading,setUserLoading]=useState(false)

  useEffect(()=>{
    getAllUsers()

  },[])


  async function CreateTask(e) {
    e.preventDefault();

    try {
      setLoading(true)


      if (!title.trim(" ")) {
        setError("Title field is empty");
        return;
      }
      if (!description.trim(" ")) {
        setError("Description field is empty");
        return;
      }

      if (!assigneeEmail.trim(" ")) {
        setError("e-mail field is empty");
        return;
      }

      if (!emailPattern.test(assigneeEmail)) {
        setError("not a valid email");
        return;
      }
      if (!dueDate.trim(" ")) {
        setError("date field is empty");
        return;
      }
      setError(null);

      const task = {
        title: title,
        description: description,
        assigneeEmail: assigneeEmail,
        priority: priority,
        dueDate: dueDate,
      };

      

      const response = await createTaskApi(task);

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }

      if (response.ok) {
        alert(data.message);
        setError(null);
        (setTitle(""), setAssigneeEmail(""));
        setDescription("");
        setDueDate("");
        setPriority("Low");
        
      }
    } catch (err) {
      console.log(err.message);
    }
    finally{
      setLoading(false)
    }
  }


  async function getAllUsers() {
    try{
      setUserLoading(true)

    const response = await fetch(`http://localhost:3000/user/getUsers`)

    const data = await response.json()

    if(response.ok){
      setUsers(data.users)
    }

    
  }
  catch(err){
    console.log(err.message);
    
  }
  finally{
    setUserLoading(false)
  }



    
  }


  















  return (
    <>
    <div className="create-task-page">
      <nav className="create-task-navbar">
        <div className="create-task-logo">
          Task<span>Flow</span>
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/AdminHome")}
        >
          <i className="bi bi-arrow-left"></i>
          Dashboard
        </button>
      </nav>

      <main className="create-task-content">
        <p className="create-task-eyebrow">WORKSPACE / TASKS</p>

        <h1>
          Create a task<span>.</span>
        </h1>

        <p className="create-task-subtitle">
          Define the work, assign responsibility, and set a deadline.
        </p>

        <form className="create-task-form">
          <div className="form-section-heading">
            <h2>Task details</h2>
            <p>Give your team a clear direction.</p>
          </div>

          <div className="form-group">
            <label htmlFor="title">Task title</label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="e.g. Build authentication API"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={120}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              placeholder="Describe what needs to be completed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              maxLength={2000}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assigneeEmail">
                Assign to (team member email)
              </label>

              <input
                id="assigneeEmail"
                type="email"
                name="assigneeEmail"
                placeholder="member@company.com"
                value={assigneeEmail}
                onChange={(e) => setAssigneeEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>

              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due date</label>

            <input
              id="dueDate"
              type="date"
              name="dueDate"
              min={new Date().toLocaleDateString("en-CA")}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <p className="taskError">{error}</p>

          <div className="create-task-actions">
            <button
              type="button"
              className="cancel-task-btn"
              onClick={() => navigate("/AdminHome")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-task-btn"
              onClick={(e) => CreateTask(e)}
              disabled={loading}
            >
              <i className="bi bi-plus-lg"></i>
             {loading?"Assigning...":"Create task"}
            </button>
          </div>
        </form>
      </main>
    </div>


{userLoading?"Loading...":(
<div className="employee-picker">
  <div className="employee-picker-heading">
    <h3>Team members</h3>
    <p>Search for a member and copy their email into the assignment field.</p>
  </div>

  <div className="employee-search-box">
    <i className="bi bi-search"></i>

    <input
      type="text"
      placeholder="Search by name or email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {search && (
      <button
        type="button"
        onClick={() => setSearch("")}
        className="employee-clear-btn"
      >
        <i className="bi bi-x-lg"></i>
      </button>
    )}
  </div>

  <div className="employee-list">
    {users
      .filter(
        (user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase())
      ).filter((user)=>
        user._id !== UserId
      )
      .map((user) => (
        <div className="employee-item" key={user._id}>
          <div className="employee-avatar">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="employee-details">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>

          <button
            type="button"
            className="employee-copy-btn"
            onClick={() => setAssigneeEmail(user.email)}
          >
            <i className="bi bi-copy"></i>
            Copy Email
          </button>
        </div>
      ))}

    {users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    ).length === 0 && (
      <p className="employee-empty">No team members found.</p>
    )}
  </div>
</div>)}
</>
  );
}

export default CreateTask;
