import React, { useState, useEffect } from "react";
import styles from "./Project.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import { API_BASE } from "../../api/axios";

// Helper to support both Cloudinary full URLs and legacy local relative URLs
const resolveMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${API_BASE}${url}`;
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch((err) => console.log("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.projectsContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Portfolio</div>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionDescription}>
            A collection of my recent work showcasing various web development
            projects and applications built with modern technologies.
          </p>
        </div>

        {loading ? (
          <p style={{ color: "var(--text-tertiary)", textAlign: "center", padding: "40px 0", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <p style={{ color: "var(--text-tertiary)", textAlign: "center", padding: "40px 0", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            No projects added yet. Upload new projects via /admin.
          </p>
        ) : (
          <>
            <div className={styles.projectsGrid}>
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={{
                    title: project.title,
                    description: project.description,
                    image: resolveMediaUrl(project.imageURL),
                    tags: project.techStack || [],
                    liveLink: project.liveURL,
                    githubLink: project.githubURL,
                  }}
                />
              ))}
            </div>

            {projects.length > 6 && (
              <div className={styles.viewAllWrapper}>
                <button
                  className={styles.viewAllBtn}
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "View Less" : "View More Projects"} <span>→</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
