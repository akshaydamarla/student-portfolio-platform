import { useEffect, useState } from "react";
import axios from "../api/axios";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const userRes = await axios.get("/api/admin/users");
        const projectRes = await axios.get("/api/admin/projects");

        const userData = Array.isArray(userRes.data) ? userRes.data : [];
        const projectData = Array.isArray(projectRes.data) ? projectRes.data : [];

        setUsers(userData);
        setProjects(projectData);

        setApprovedCount(projectData.filter(p => p.approved === true).length);
        setRejectedCount(projectData.filter(p => p.approved === false).length);
        setPendingCount(projectData.filter(p => p.approved == null).length);

      } catch (error) {
        console.error("Admin dashboard load failed", error);
      }
    };

    fetchData();

  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>Admin Dashboard</h1>
      <p style={{ color: "gray" }}>Overview of system statistics</p>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p className="card-value">{users.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Projects</h3>
          <p className="card-value">{projects.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Projects</h3>
          <p className="card-value">{pendingCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Approved Projects</h3>
          <p className="card-value">{approvedCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Rejected Projects</h3>
          <p className="card-value">{rejectedCount}</p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;