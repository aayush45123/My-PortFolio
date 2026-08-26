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
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ 03 ]</span>
          <h2 className={styles.sectionTitle}>Selected Works</h2>
        </div>

        {loading ? (
          <p className={styles.statusMessage}>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className={styles.statusMessage}>
            No projects published yet. Add projects via the admin route.
          </p>
        ) : (
          <>
            <div className={styles.projectsGrid}>
              {visibleProjects.map((project, i) => (
                <ProjectCard
                  key={project._id}
                  project={{
                    index: String(i + 1).padStart(2, "0"),
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
                  {showAll ? "[ View Less ]" : "[ View All Projects ]"}
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
