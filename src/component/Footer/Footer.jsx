import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerInner}>
        {/* Brand */}
        <div className={styles.brand}>
          <h3 className={styles.brandName}>Aayush Bharda</h3>
          <p className={styles.brandTagline}>Full-Stack Developer · Data · IoT</p>
        </div>

        {/* Center - Icons */}
        <div className={styles.socialRow}>
          <a
            href="https://github.com/aayush45123"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aayush-bharda-399958311/"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:aayushbharda999@gmail.com"
            className={styles.socialLink}
            aria-label="Email"
          >
            <Mail size={16} />
            <span>Email</span>
          </a>
        </div>

        {/* Bottom row */}
        <div className={styles.bottomRow}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Aayush Bharda. All rights reserved.
          </span>
          <Link to="/admin" className={styles.adminLink} title="Admin Portal">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
