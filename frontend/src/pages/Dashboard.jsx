import { useEffect, useState } from "react";
import API from "../utils/api";
import { getUserRole } from "../utils/auth";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";



function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const role = getUserRole();

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

 const createTask = async () => {
  if (!title.trim()) {
    toast.error("Task title cannot be empty ❌");
    return;
  }

  try {
    await API.post("/tasks", { title });
    toast.success("Task added successfully !");
    setTitle("");
    fetchTasks();
  } catch (error) {
    toast.error("Failed to create task !");
  }
};


 const deleteTask = async (id) => {
  try {
    await API.delete(`/tasks/${id}`);
    toast.success("Task deleted !");
    fetchTasks();
  } catch (error) {
    toast.error("Failed to delete task !");
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
  <>
    <Navbar />

    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>User Dashboard</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          {role === "admin" && (
            <Link to="/admin">
              <button
                style={{
                  background: "#3b82f6",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Admin Panel
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createTask}>
          Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
            No tasks yet. Add your first task 🚀
          </p>
        ) : (
          tasks.map((task) => (
            <li key={task._id} className="task-item">
              <span>{task.title}</span>

              <button
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  </>
);
}

export default Dashboard;
