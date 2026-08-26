import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ProjectCard.module.css";
import { ExternalLink, Github, X, Calendar, Code } from "lucide-react";

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const cardInner = card.querySelector(`.${styles.cardInner}`);
    if (!cardInner) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle, gentle tilt
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    cardInner.style.transition = "transform 0.08s ease-out";
    cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;

    const shine = card.querySelector(`.${styles.shine}`);
    if (shine) {
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      shine.style.background = `
        radial-gradient(
          circle at ${xPercent}% ${yPercent}%,
          rgba(255, 255, 255, 0.08) 0%,
          transparent 60%
        )
      `;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const cardInner = cardRef.current.querySelector(`.${styles.cardInner}`);
    if (cardInner) {
      cardInner.style.transition = "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";
      cardInner.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }
  };

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

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div
        ref={cardRef}
        className={styles.projectCard}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.cardInner}>
          <div className={styles.shine}></div>

          <div className={styles.projectImage}>
            <img src={project.image} alt={project.title} />
            <div className={styles.projectOverlay}></div>

            <div className={styles.projectLinks}>
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  className={styles.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Live Demo"
                >
                  <ExternalLink size={18} />
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
                  <Github size={18} />
                </a>
              )}
            </div>
          </div>

          <div className={styles.projectContent}>
            <div className={styles.projectHeader}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
            </div>

            <p className={styles.projectDescription}>
              {truncateText(project.description, 120)}
            </p>

            <div className={styles.techStack}>
              {project.tags.slice(0, 4).map((tag, index) => (
                <span key={index} className={styles.techTag}>
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className={styles.techTag}>
                  +{project.tags.length - 4}
                </span>
              )}
            </div>

            <button className={styles.showMoreBtn} onClick={openModal}>
              Show More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal &&
        createPortal(
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
              <button className={styles.closeBtn} onClick={closeModal} aria-label="Close modal">
                <X size={20} />
              </button>

              <div className={styles.modalGrid}>
                {/* Left Side - Image */}
                <div className={styles.modalImageSection}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.modalImage}
                  />
                  <div className={styles.modalLinks}>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        className={styles.modalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        className={styles.modalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className={styles.modalDetailsSection}>
                  <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{project.title}</h2>
                    {project.date && (
                      <div className={styles.projectDate}>
                        <Calendar size={14} />
                        <span>{project.date}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.modalBody}>
                    <div className={styles.section}>
                      <h4 className={styles.sectionTitle}>
                        <Code size={16} />
                        About Project
                      </h4>
                      <p className={styles.modalDescription}>
                        {project.description}
                      </p>
                    </div>

                    {project.features && (
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Key Features</h4>
                        <ul className={styles.featuresList}>
                          {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className={styles.section}>
                      <h4 className={styles.sectionTitle}>Technologies Used</h4>
                      <div className={styles.modalTechStack}>
                        {project.tags.map((tag, index) => (
                          <span key={index} className={styles.modalTechTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.challenges && (
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                          Challenges & Solutions
                        </h4>
                        <p className={styles.modalDescription}>
                          {project.challenges}
                        </p>
                      </div>
                    )}
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
