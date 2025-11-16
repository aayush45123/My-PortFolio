import React, { useState } from "react";
import { Github, Linkedin, Mail, Instagram, Twitter } from "lucide-react";
import styles from "./FloatingDock.module.css";

const FloatingDock = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/aayush45123",
      color: "#333",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/aayush-bharda-399958311/",
      color: "#0077b5",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/aayush45__?igsh=amYzanV5d2Y0djE5",
      color: "#e4405f",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/Aayush45123__?t=2b6N1b-WF8heIuoZW2G8bQ&s=08 ",
      color: "#1da1f2",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:aayushbharda999@gmail.com",
      color: "#ea4335",
    },
  ];

  return (
    <div className={styles.dockWrapper}>
      <div className={styles.dock}>
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          const isHovered = hoveredIndex === index;
          const isPrevHovered = hoveredIndex === index - 1;
          const isNextHovered = hoveredIndex === index + 1;

          return (
            <div
              key={link.name}
              className={styles.dockItemWrapper}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {isHovered && <div className={styles.tooltip}>{link.name}</div>}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.dockItem} ${
                  isHovered ? styles.hovered : ""
                } ${isPrevHovered ? styles.prevHovered : ""} ${
                  isNextHovered ? styles.nextHovered : ""
                }`}
                aria-label={link.name}
              >
                <Icon className={styles.icon} size={24} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingDock;
