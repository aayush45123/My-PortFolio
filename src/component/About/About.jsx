import React from "react";
import styles from "./About.module.css";
import Me from "../../assets/me.jpg";
import Education from "../Education/Education";

const About = () => {
  // Smooth scroll function (ADDED)
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <section className={styles.aboutSection} id="about">
        <div className={styles.aboutContainer}>
          {/* Image Section */}
          <div className={styles.aboutImageWrapper}>
            <div className={styles.imageContainer}>
              <div
                className={`${styles.imageDecoration} ${styles.decoration1}`}
              ></div>
              <div
                className={`${styles.imageDecoration} ${styles.decoration2}`}
              ></div>
              <div className={styles.imageGradientBorder}>
                <div className={styles.imageInner}>
                  <img src={Me} alt="Profile" className={styles.profileImage} />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={styles.aboutContent}>
            <div className={styles.aboutLabel}>About Me</div>
            <h1 className={styles.aboutTitle}>Hi, I'm Aayush Bharda</h1>
            <h2 className={styles.aboutSubtitle}>
              Full Stack Developer & IoT Enthusiast
            </h2>

            <p className={styles.aboutDescription}>
              I’m a passionate Full-Stack Developer and IoT enthusiast who loves
              building smart, scalable, and visually polished digital
              experiences. With a strong foundation in both modern web
              technologies and embedded systems, I bring ideas to life—whether
              it’s interactive web apps or intelligent hardware solutions.
            </p>

            <p className={styles.aboutDescription}>
              When I’m away from the keyboard, I love experimenting with new
              technologies, contributing to open-source communities, and sharing
              what I learn with fellow developers.
            </p>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>2+</div>
                <div className={styles.statLabel}>Year of Learning </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>5+</div>
                <div className={styles.statLabel}>Projects Completed</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")} // ADDED
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Get In Touch
                <span>→</span>
              </a>

              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "#projects")} // ADDED
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
