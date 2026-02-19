function StudentDashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>Student Dashboard</h1>
      <p style={{ color: "gray" }}>Welcome to your portfolio overview</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>My Projects</h3>
          <p className="card-value">5</p>
        </div>

        <div className="dashboard-card">
          <h3>Skills Added</h3>
          <p className="card-value">12</p>
        </div>

        <div className="dashboard-card">
          <h3>Profile Completion</h3>
          <p className="card-value">80%</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;