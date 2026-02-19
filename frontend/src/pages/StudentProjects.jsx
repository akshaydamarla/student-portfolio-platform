import "../styles/projects.css";

function StudentProjects() {
  const projects = [
    { id: 1, title: "Portfolio Website", tech: "React, CSS" },
    { id: 2, title: "Student Management System", tech: "Spring Boot, MySQL" },
    { id: 3, title: "Weather App", tech: "JavaScript, API" },
  ];

  return (
    <div>
      <h1>My Projects</h1>
      <p style={{ color: "gray", marginBottom: "20px" }}>
        Projects added to your portfolio
      </p>

      <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentProjects;