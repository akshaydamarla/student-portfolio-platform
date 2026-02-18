import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={{ color: "white" }}>Dashboard</h3>

        {role === "ADMIN" && (
          <>
            <Link to="/admin" style={styles.link}>Admin Home</Link>
            <Link to="/admin/users" style={styles.link}>Manage Users</Link>
          </>
        )}

        {role === "STUDENT" && (
          <>
            <Link to="/student" style={styles.link}>Student Home</Link>
            <Link to="/student/profile" style={styles.link}>My Profile</Link>
            <Link to="/student/projects" style={styles.link}>My Projects</Link>
          </>
        )}

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#1e293b",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  logoutBtn: {
    marginTop: "auto",
    padding: "8px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f1f5f9",
  },
};

export default Layout;