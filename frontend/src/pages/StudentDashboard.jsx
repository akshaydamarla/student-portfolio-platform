import { useEffect, useState } from "react";
import axios from "../api/axios";

function StudentDashboard() {

  const [projects, setProjects] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("api/student/projects");
        const projectData = Array.isArray(res.data) ? res.data : [];

        setProjects(projectData);
        setProjectCount(projectData.length);
        console.log("Projects loaded:", projectData);

        // ===== Calculate Unique Skills =====
        const skillSet = new Set();

        projectData.forEach((project) => {
          if (project.techStack) {
            project.techStack
              .split(",")
              .map(skill => skill.trim())
              .forEach(skill => skillSet.add(skill));
          }
        });

        setSkillCount(skillSet.size);

        // ===== Calculate Profile Completion =====
        let percent = 0;

        if (projectData.length > 0) percent += 40;
        if (skillSet.size > 0) percent += 30;
        if (projectData.some(p => Number(p.progress) === 100)) percent += 30;

        setCompletion(percent);

      } catch (error) {
        console.error("Dashboard load failed", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>Student Dashboard</h1>
      <p style={{ color: "gray" }}>Welcome to your portfolio overview</p>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Projects</h3>
          <p className="card-value">{projectCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Skills Added</h3>
          <p className="card-value">{skillCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Profile Completion</h3>
          <p className="card-value">{completion}%</p>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;