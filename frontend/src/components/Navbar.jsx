import { Link } from "react-router-dom";
import { logout, getUserRole } from "../utils/auth";
import "../styles/Navbar.css";

function Navbar() {
  const role = getUserRole();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/dashboard" className="logo">
          TaskManager
        </Link>
      </div>

      <div className="nav-right">
        {role === "admin" && (
          <Link to="/admin" className="nav-link">
            Admin Panel
          </Link>
        )}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
