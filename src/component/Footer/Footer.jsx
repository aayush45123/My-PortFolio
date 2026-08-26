import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerRow}>
        {/* Left - Name */}
        <div className={styles.left}>
          <h3>Aayush</h3>
        </div>

        {/* Center - Icons */}
        <div className={styles.center}>
          <a href="mailto:aayushbharda999@gmail.com" aria-label="Email">
            <Mail size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/aayush-bharda-399958311/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://github.com/aayush45123"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
        </div>

        {/* Right - Copyright & Admin Link */}
        <div className={styles.right}>
          <span>© {new Date().getFullYear()} Aayush</span>
          <Link to="/admin" className={styles.adminLink} title="Admin Portal">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
