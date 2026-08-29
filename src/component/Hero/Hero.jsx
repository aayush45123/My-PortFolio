import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./Hero.module.css";
import FloatingDock from "../FloatingDock/FloatingDock";
import resume from "../../assets/resume.pdf";

const Hero = () => {
  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={styles.hero} id="home">
      {/* Top Editorial Ticker Bar */}
      <div className={styles.tickerBar}>
        <span className={styles.tickerLabel}>PORTFOLIO</span>
        <div className={styles.tickerDivider} />
        <span>FULL-STACK ENGINEERING · DATA ANALYSIS · IoT SYSTEMS</span>
        <div className={styles.tickerDivider} />
        <span className={styles.tickerStatus}>
          <span className={styles.statusDot} />
          OPEN TO WORK — MUMBAI, INDIA
        </span>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContainer}>
        <div className={styles.heroInner}>
          {/* Left Column — Giant Headline */}
          <div className={styles.headlineCol}>
            <p className={styles.issueDate}>
              Engineer / 2025
            </p>
            <h1 className={styles.heroTitle}>
              Aayush<br />Bharda
            </h1>
            <div className={styles.titleRule} />
            <p className={styles.tagline}>B.Tech in AI-DS · Full-Stack Developer · Data Analyst</p>
          </div>

          {/* Right Column — Bio + Actions */}
          <div className={styles.contentCol}>
            <div className={styles.contentInner}>
              <p className={styles.heroBio}>
                Full-Stack Developer building scalable web applications, data-driven systems, and practical AI products.
              </p>

              {/* Metadata Grid */}
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>SPECIALIZATION</span>
                  <span className={styles.metaVal}>Full Stack Development</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>LOCATION</span>
                  <span className={styles.metaVal}>Mumbai, India</span>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>FOCUS</span>
                  <span className={styles.metaVal}>React · Node · SQL · C++</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>LOOKING FOR</span>
                  <span className={styles.metaVal}>SE / Full-Stack Internships · 2025–26</span>
                </div>
              </div>

              {/* CTAs */}
              <div className={styles.ctaRow}>
                <button className={styles.btnPrimary} onClick={scrollToProjects}>
                  <span>View Projects</span>
                  <ArrowRight size={15} />
                </button>
                <a href={resume} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                  <span>Resume</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>

              {/* Social Dock */}
              <div className={styles.dockArea}>
                <FloatingDock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
