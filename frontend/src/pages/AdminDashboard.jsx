import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
  try {
    const res = await API.get("/admin/users");
    setUsers(res.data.users);
    toast.success("Users loaded successfully");
  } catch (error) {
    toast.error("Access denied or error loading users");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Admin Dashboard</h2>

        {loading ? (
          <p style={{ marginTop: "15px" }}>Loading users...</p>
        ) : users.length === 0 ? (
          <p style={{ marginTop: "15px" }}>No users found.</p>
        ) : (
          <ul className="task-list">
            {users.map((user) => (
              <li key={user._id} className="task-item">
                <span>
                  <strong>{user.name}</strong> — {user.email}
                </span>
                <span
                  style={{
                    background: "#334155",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                  }}
                >
                  {user.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
