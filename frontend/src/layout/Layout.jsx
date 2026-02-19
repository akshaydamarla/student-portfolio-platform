import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/layout.css";

function Layout() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Portfolio</h2>
        </div>

        <nav className="sidebar-nav">
          {role === "ADMIN" && (
            <>
              <NavLink to="/admin" className="nav-link">
                Admin Home
              </NavLink>
              <NavLink to="/admin/users" className="nav-link">
                Manage Users
              </NavLink>
            </>
          )}

          {role === "STUDENT" && (
            <>
              <NavLink to="/student" className="nav-link">
                Student Home
              </NavLink>
              <NavLink to="/student/profile" className="nav-link">
                My Profile
              </NavLink>
              <NavLink to="/student/projects" className="nav-link">
                My Projects
              </NavLink>
            </>
          )}
        </nav>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </aside>

      <main className="main-content">
  <div className="topbar">
    <div>
      <h3>Student Portfolio Platform</h3>
    </div>
    <div className="user-info">
      <span>{role}</span>
    </div>
  </div>

  <div className="page-content">
    <Outlet />
  </div>
</main>
    </div>
  );
}

export default Layout;