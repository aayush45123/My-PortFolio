import React from "react";
import styles from "./Skills.module.css";

const Skills = () => {
  const techLogos = [
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Power BI", logo: "https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Power-BI.svg" },
  ];

  const skillLedger = [
    {
      index: "01",
      category: "Languages",
      skills: ["C++", "JavaScript", "SQL"],
    },
    {
      index: "02",
      category: "Frontend",
      skills: ["React.js", "HTML5", "CSS3", "Responsive UI"],
    },
    {
      index: "03",
      category: "Backend",
      skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth"],
    },
    {
      index: "04",
      category: "Databases",
      skills: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
      index: "05",
      category: "Core CS",
      skills: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "DBMS",
        "Operating Systems",
        "Computer Networks",
      ],
    },
    {
      index: "06",
      category: "Tools & Analytics",
      skills: ["Git", "Docker", "Postman", "VS Code", "Power BI"],
    },
  ];

  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.skillsContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ 02 ]</span>
          <h2 className={styles.sectionTitle}>Skills & Competencies</h2>
        </div>

        {/* Tech Icon Strip */}
        <div className={styles.logoStrip}>
          {techLogos.map((tech, i) => (
            <div key={i} className={styles.logoItem} title={tech.name}>
              <img src={tech.logo} alt={tech.name} className={styles.logo} />
              <span className={styles.logoName}>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Ledger Grid */}
        <div className={styles.skillsGrid}>
          {skillLedger.map((item, i) => (
            <div key={i} className={styles.skillCard}>
              <div className={styles.cardHeader}>
                <span className={styles.categoryIndex}>[{item.index}]</span>
                <h3 className={styles.categoryTitle}>{item.category}</h3>
              </div>

              <div className={styles.tagList}>
                {item.skills.map((skill, j) => (
                  <span key={j} className={styles.tag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
