import React, { useState, useEffect } from "react";
import { ArrowRight, Download } from "lucide-react";
import styles from "./Hero.module.css";
import FloatingDock from "../FloatingDock/FloatingDock";
import resume from "../../assets/resume.pdf";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  const roles = ["Full Stack Developer", "Data Analyst", "IoT Enthusiast"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing Animation Logic
  useEffect(() => {
    const current = roles[index];
    const speed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));

      if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), 1200);
      }

      if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((index + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting]);

  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroContainer}>
        <div className={`${styles.heroContent} ${isVisible ? styles.visible : ""}`}>

          {/* Editorial label */}
          <div className={styles.sectionLabel}>Portfolio — 2025</div>

          {/* Name */}
          <h1 className={styles.heroTitle}>
            <span className={styles.firstName}>Aayush Bharda</span>
            <span className={styles.lastName}>Developer.</span>
          </h1>

          {/* Typing Subtitle */}
          <div className={styles.subtitleWrapper}>
            <h2 className={styles.heroSubtitle}>
              {roles[index].substring(0, subIndex)}
              <span className={styles.cursor}>|</span>
            </h2>
          </div>

          {/* Description */}
          <p className={styles.heroDescription}>
            I build scalable web applications and embedded systems — focused on
            clean code, sharp interfaces, and real-world impact.
          </p>

          {/* Buttons */}
          <div className={styles.ctaButtons}>
            <button className={styles.btnPrimary} onClick={scrollToProjects}>
              <span>View My Work</span>
              <ArrowRight className={styles.btnIcon} size={18} />
            </button>

            <a href={resume} download className={styles.btnSecondary}>
              <Download size={16} />
              <span>Download CV</span>
            </a>
          </div>

          {/* Floating Dock */}
          <div className={styles.floatingDockArea}>
            <FloatingDock />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
