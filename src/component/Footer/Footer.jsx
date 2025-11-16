import React from "react";
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
          <a href="mailto:aayushbharda999@gmail.com">
            <Mail />
          </a>
          <a
            href="https://www.linkedin.com/in/aayush-bharda-399958311/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/aayush45123"
            target="_blank"
            rel="noreferrer"
          >
            <Github />
          </a>
        </div>

        {/* Right - Copyright */}
        <div className={styles.right}>© {new Date().getFullYear()} Aayush</div>
      </div>
    </footer>
  );
};

export default Footer;
