import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ProjectCard.module.css";
import { ExternalLink, Github, X, Calendar, Code2 } from "lucide-react";

const ProjectCard = ({ project }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleEscClose);

    return () => {
      document.body.style.overflow = prevOverflow || "auto";
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [showModal]);

  const openModal = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const closeModal = (e) => {
    if (e) e.stopPropagation();
    setShowModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal(e);
    }
  };

  const truncateText = (text, maxLength = 110) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div className={styles.projectCard}>
        {/* Project Thumbnail Image */}
        <div className={styles.imageContainer}>
          <img src={project.image} alt={project.title} className={styles.projectImage} />
          <div className={styles.projectLinks}>
            {project.liveLink && (
              <a
                href={project.liveLink}
                className={styles.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
              >
                <ExternalLink size={15} />
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                className={styles.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Source Code"
              >
                <Github size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className={styles.projectContent}>
          <div className={styles.cardHeader}>
            {project.index && <span className={styles.projectIndex}>[{project.index}]</span>}
            <h3 className={styles.projectTitle}>{project.title}</h3>
          </div>

          <p className={styles.projectDescription}>
            {truncateText(project.description, 110)}
          </p>

          <div className={styles.techStack}>
            {project.tags.slice(0, 4).map((tag, index) => (
              <span key={index} className={styles.techTag}>
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className={styles.techTag}>+{project.tags.length - 4}</span>
            )}
          </div>

          <button className={styles.showMoreBtn} onClick={openModal}>
            Case Details →
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal &&
        createPortal(
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
              <button className={styles.closeBtn} onClick={closeModal} aria-label="Close modal">
                <X size={18} />
              </button>

              <div className={styles.modalGrid}>
                {/* Image Section */}
                <div className={styles.modalImageSection}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.modalImage}
                  />
                  <div className={styles.modalActionLinks}>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        className={styles.modalActionBtn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={15} />
                        <span>Live Site</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        className={styles.modalActionBtn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={15} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className={styles.modalDetailsSection}>
                  <div className={styles.modalHeader}>
                    {project.index && <span className={styles.modalIndex}>PROJECT / {project.index}</span>}
                    <h2 className={styles.modalTitle}>{project.title}</h2>
                  </div>

                  <div className={styles.modalBody}>
                    <div className={styles.sectionBlock}>
                      <h4 className={styles.sectionHeader}>About</h4>
                      <p className={styles.modalDescription}>
                        {project.description}
                      </p>
                    </div>

                    <div className={styles.sectionBlock}>
                      <h4 className={styles.sectionHeader}>Stack</h4>
                      <div className={styles.modalTechStack}>
                        {project.tags.map((tag, index) => (
                          <span key={index} className={styles.modalTechTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ProjectCard;
