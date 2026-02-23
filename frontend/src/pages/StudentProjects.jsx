import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/projects.css";

function StudentProjects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("ONGOING");
  const [progress, setProgress] = useState(0);

  const token = localStorage.getItem("token");

  const fetchProjects = () => {
    axios
      .get("http://localhost:8080/api/student/projects", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("techStack", techStack);
    formData.append("status", status);
    formData.append("progress", progress);
    formData.append("image", image);

    axios
      .post("http://localhost:8080/api/student/projects", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        fetchProjects();
        setTitle("");
        setDescription("");
        setTechStack("");
        setImage(null);
        setStatus("ONGOING");
        setProgress(0);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/student/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    }
  };

  return (
    <div className="projects-page">
      <h1>My Projects</h1>

      <form onSubmit={handleSubmit} className="project-form">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tech Stack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <label>Progress: {progress}%</label>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">Add Project</button>
      </form>

      <hr />

      <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Tech:</strong> {project.techStack}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    project.status === "COMPLETED" ? "green" : "orange",
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

            {project.feedback && (
              <div
                style={{
                  background: "#f8fafc",
                  padding: "10px",
                  borderRadius: "6px",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                <strong>Admin Feedback:</strong>
                <p style={{ marginTop: "5px" }}>{project.feedback}</p>
              </div>
            )}

            <img
              src={`http://localhost:8080${project.imageUrl}`}
              alt="project"
            />
            <br />
            <div className="project-actions">
              <button
                onClick={() => handleDelete(project.id)}
                className="delete-btn"
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

export default StudentProjects;