import React, { useState, useEffect } from "react";
import styles from "./Project.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log("Error fetching projects:", err));
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.projectsContainer}>
        {/* SECTION HEADER */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Portfolio</div>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionDescription}>
            A collection of my recent work showcasing various web development
            projects and applications built with modern technologies.
          </p>
        </div>

        {/* PROJECTS GRID */}
        <div className={styles.projectsGrid}>
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={{
                title: project.title,
                description: project.description,
                image: project.imageURL,
                tags: project.techStack,
                liveLink: project.liveURL,
                githubLink: project.githubURL,
              }}
            />
          ))}
        </div>

        {/* VIEW MORE / LESS BUTTON */}
        <div className={styles.viewAllWrapper}>
          <button
            className={styles.viewAllBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View More Projects"} <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
