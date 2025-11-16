import React, { useRef } from "react";
import styles from "./ProjectCard.module.css";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    const cardInner = card.querySelector(`.${styles.cardInner}`);
    if (cardInner) {
      cardInner.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    }

    const shine = card.querySelector(`.${styles.shine}`);
    if (shine) {
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      shine.style.background = `
        radial-gradient(
          circle at ${xPercent}% ${yPercent}%,
          rgba(255, 255, 255, 0.2) 0%,
          transparent 80%
        )
      `;
    }
  };

  const handleMouseLeave = () => {
    const cardInner = cardRef.current.querySelector(`.${styles.cardInner}`);
    if (cardInner) {
      cardInner.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    }
  };

  return (
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
            <a
              href={project.liveLink}
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={20} />
            </a>

            <a
              href={project.githubLink}
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className={styles.projectContent}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>

          <div className={styles.techStack}>
            {project.tags.map((tag, index) => (
              <span key={index} className={styles.techTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
