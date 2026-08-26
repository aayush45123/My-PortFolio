import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import Me from "../../assets/me.jpg";
import { ArrowDownRight } from "lucide-react";
import { API_BASE } from "../../api/axios";

const About = () => {
  const [projectCount, setProjectCount] = useState(null);
  const [certCount, setCertCount] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjectCount(data.length);
      })
      .catch(() => setProjectCount(10));

    fetch(`${API_BASE}/api/certificates`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCertCount(data.length);
      })
      .catch(() => setCertCount(10));
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ 01 ]</span>
          <h2 className={styles.sectionTitle}>About Me</h2>
        </div>

        <div className={styles.aboutGrid}>
          {/* Left Column - Image & Quick Facts */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img src={Me} alt="Aayush Bharda" className={styles.portrait} />
            </div>
            <div className={styles.factBox}>
              <div className={styles.factRow}>
                <span className={styles.factKey}>LOCATION</span>
                <span className={styles.factVal}>Mumbai, India</span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factKey}>EDUCATION</span>
                <span className={styles.factVal}>B.Tech AI-DS · 2023–2027</span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factKey}>PRIMARY STACK</span>
                <span className={styles.factVal}>React, Node, SQL, C++</span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factKey}>LOOKING FOR</span>
                <span className={styles.factVal}>SE / Full-Stack Internships</span>
              </div>
            </div>
          </div>

          {/* Right Column - Bio & Metric Ledger */}
          <div className={styles.contentColumn}>
            <h3 className={styles.headline}>
              Engineering digital products from data pipelines to responsive interfaces.
            </h3>

            <p className={styles.bioText}>
              I am a Full-Stack Software Developer and Data Analyst who builds reliable web applications and embedded IoT solutions. I bridge the gap between backend architecture, data processing, and clean frontend user experiences.
            </p>

            <p className={styles.bioText}>
              My development philosophy centers on write-once maintainability, performant queries, and minimal, distraction-free interfaces that solve real-world problems.
            </p>

            {/* Metrics Ledger — dynamic counts */}
            <div className={styles.metricsLedger}>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>
                  {projectCount !== null ? `${projectCount}+` : "—"}
                </span>
                <span className={styles.metricLabel}>Projects Built</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>15+</span>
                <span className={styles.metricLabel}>Technologies</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>
                  {certCount !== null ? `${certCount}+` : "—"}
                </span>
                <span className={styles.metricLabel}>Certifications</span>
              </div>
            </div>

            <a href="#contact" onClick={scrollToContact} className={styles.contactLink}>
              <span>Get in Touch</span>
              <ArrowDownRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
