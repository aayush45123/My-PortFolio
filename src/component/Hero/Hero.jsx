import React, { useState, useEffect } from "react";
import { ArrowRight, Download } from "lucide-react";
import styles from "./Hero.module.css";
import FloatingDock from "../FloatingDock/FloatingDock";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  const roles = ["Full Stack Developer", "IoT Enthusiast"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing Animation Logic
  useEffect(() => {
    const current = roles[index];
    const speed = deleting ? 60 : 120;

    const timeout = setTimeout(() => {
      setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));

      if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), 1000);
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
        <div
          className={`${styles.heroContent} ${isVisible ? styles.visible : ""}`}
        >
          {/* Greeting */}
          <div className={styles.greeting}>
            <span className={styles.greetingText}>Hello, I'm</span>
          </div>

          {/* Name */}
          <h1 className={styles.heroTitle}>
            <span className={styles.firstName}>Aayush Bharda</span>
            <span className={styles.lastName}>Developer</span>
          </h1>

          {/* Typing Subtitle */}
          <div className={styles.subtitleWrapper}>
            <h2 className={styles.heroSubtitle}>
              <span className={styles.subtitleText}>
                {roles[index].substring(0, subIndex)}
              </span>
              <span className={styles.cursor}>|</span>
            </h2>
          </div>

          {/* Description */}
          <p className={styles.heroDescription}>
            I craft exceptional digital experiences with modern technologies.
            Specialized in building scalable web applications that make a
            difference.
          </p>

          {/* Buttons */}
          <div className={styles.ctaButtons}>
            <button className={styles.btnPrimary} onClick={scrollToProjects}>
              <span>View My Work</span>
              <ArrowRight className={styles.btnIcon} size={20} />
            </button>

            <a href="/resume.pdf" download className={styles.btnSecondary}>
              <Download className={styles.btnIcon} size={20} />
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
