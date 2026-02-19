function AdminDashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>Admin Dashboard</h1>
      <p style={{ color: "gray" }}>Overview of system statistics</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p className="card-value">120</p>
        </div>

        <div className="dashboard-card">
          <h3>Active Students</h3>
          <p className="card-value">98</p>
        </div>

        <div className="dashboard-card">
          <h3>Reports Generated</h3>
          <p className="card-value">45</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;