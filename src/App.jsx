import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Task from "./Pages/Task";
import Profile from "./Pages/Profile";
import About from "./Pages/About";

import AdminHome from "./Admin/AdminHome";
import CreateTask from "./Admin/CreateTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />


        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/CreateTask" element={<CreateTask />} />
      </Routes>
    </>
  );
}

export default App;
