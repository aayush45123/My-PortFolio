import React from "react";
import styles from "./About.module.css";
import Me from "../../assets/me.jpg";

const About = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutContainer}>
        {/* Image */}
        <div className={styles.aboutImageWrapper}>
          <div className={styles.imageContainer}>
            <img src={Me} alt="Aayush Bharda" className={styles.profileImage} />
          </div>
        </div>

        {/* Content */}
        <div className={styles.aboutContent}>
          <div className={styles.aboutLabel}>About</div>
          <h2 className={styles.aboutTitle}>Hi, I'm Aayush Bharda</h2>
          <p className={styles.aboutSubtitle}>Full Stack Developer & IoT Enthusiast</p>

          <p className={styles.aboutDescription}>
            I'm a Full-Stack Developer and IoT enthusiast who builds smart,
            scalable, and visually sharp digital products. Strong foundation in
            modern web technologies and embedded systems — I turn ideas into
            working software.
          </p>

          <p className={styles.aboutDescription}>
            When not coding, I experiment with new hardware, contribute to
            open-source, and share what I learn with the developer community.
          </p>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>2+</div>
              <div className={styles.statLabel}>Years learning</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>Projects shipped</div>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.ctaButtons}>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Get In Touch →
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "#projects")}
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
