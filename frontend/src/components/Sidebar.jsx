import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/sidebar.css";

function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">Portfolio</h2>

      <nav>
        <Link
          to="/admin"
          className={location.pathname === "/admin" ? "active" : ""}
        >
          Dashboard
        </Link>

        <Link
          to="/student"
          className={location.pathname === "/student" ? "active" : ""}
        >
          Student View
        </Link>
      </nav>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;