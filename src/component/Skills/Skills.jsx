import React from "react";
import styles from "./Skills.module.css";

const Skills = () => {
  const floatingSkills = [
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

  const skillsData = [
    {
      category: "Languages",
      skills: ["C++", "JavaScript", "SQL"],
    },
    {
      category: "Frontend",
      skills: ["React.js", "HTML", "CSS"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs", "JWT"],
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
      category: "Core CS",
      skills: [
        "Data Structures & Algorithms",
        "OOP",
        "DBMS",
        "Operating Systems",
        "Computer Networks",
      ],
    },
    {
      category: "Tools",
      skills: ["Git", "Docker", "Postman", "VS Code", "Power BI"],
    },
  ];

  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.skillsContainer}>

        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelNumber}>02</span>
            Skills
          </div>
          <h2 className={styles.sectionTitle}>
            Technologies I work with
          </h2>
        </div>

        {/* Tech Logo Strip */}
        <div className={styles.logoStrip}>
          {floatingSkills.map((skill, i) => (
            <div key={i} className={styles.logoItem} title={skill.name}>
              <img src={skill.logo} alt={skill.name} className={styles.logo} />
              <span className={styles.logoName}>{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Skill Tag Grid */}
        <div className={styles.skillsGrid}>
          {skillsData.map((cat, i) => (
            <div key={i} className={styles.skillCategory}>
              <div className={styles.categoryTitle}>{cat.category}</div>
              <div className={styles.tagList}>
                {cat.skills.map((skill, j) => (
                  <span key={j} className={styles.tag}>{skill}</span>
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
