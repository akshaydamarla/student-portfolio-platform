import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/projects.css";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProjects = () => {
    axios
      .get("https://student-portfolio-platform-0fsw.onrender.com/api/admin/projects", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleReview = async (id, approved, feedback) => {
    try {
      await axios.put(
        `https://student-portfolio-platform-0fsw.onrender.com/api/admin/projects/${id}/review`,
        null,
        {
          params: { approved, feedback },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Review failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(
        `https://student-portfolio-platform-0fsw.onrender.com/api/admin/projects/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="projects-page">
      <h1>Admin – All Projects</h1>

      <div className="dashboard-grid" style={{ marginBottom: "30px" }}>
        <div className="dashboard-card">
          <h3>Total Projects</h3>
          <div className="card-value">{projects.length}</div>
        </div>

        <div className="dashboard-card">
          <h3>Approved</h3>
          <div className="card-value">
            {projects.filter((p) => p.approved === true).length}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Pending</h3>
          <div className="card-value">
            {projects.filter((p) => p.approved == null).length}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Rejected</h3>
          <div className="card-value">
            {projects.filter((p) => p.approved === false).length}
          </div>
        </div>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>

            <p>
              <strong>Student:</strong> {project.user?.name}
            </p>

            <p>{project.description}</p>

            <p><strong>Tech:</strong> {project.techStack}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    project.status === "COMPLETED"
                      ? "green"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {project.status}
              </span>
            </p>

            <div
              style={{
                background: "#e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: `${project.progress}%`,
                  background: "#2563eb",
                  color: "white",
                  textAlign: "center",
                  fontSize: "12px",
                  padding: "4px 0",
                }}
              >
                {project.progress}%
              </div>
            </div>

            <p>
              <strong>Approval:</strong>{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color:
                    project.approved === true
                      ? "green"
                      : project.approved === false
                      ? "red"
                      : "gray",
                }}
              >
                {project.approved === true
                  ? "Approved"
                  : project.approved === false
                  ? "Rejected"
                  : "Pending"}
              </span>
            </p>

            {project.imageUrl && (
              <img
                src={`https://student-portfolio-platform-0fsw.onrender.com${project.imageUrl}`}
                alt="project"
              />
            )}

            <hr />

            <textarea
              placeholder="Enter feedback..."
              value={project.feedback || ""}
              onChange={(e) => {
                const updated = projects.map((p) =>
                  p.id === project.id
                    ? { ...p, feedback: e.target.value }
                    : p
                );
                setProjects(updated);
              }}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <div className="project-actions">
              <button
                onClick={() =>
                  handleReview(
                    project.id,
                    true,
                    project.feedback || ""
                  )
                }
                style={{
                  background: "green",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                Approve
              </button>

              <button
                onClick={() =>
                  handleReview(
                    project.id,
                    false,
                    project.feedback || ""
                  )
                }
                style={{
                  background: "orange",
                  color: "white",
                }}
              >
                Reject
              </button>

              <button
                onClick={() => handleDelete(project.id)}
                style={{
                  background: "red",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProjects;