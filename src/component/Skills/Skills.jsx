import React from "react";
import styles from "./Skills.module.css";

const Skills = () => {
  const floatingSkills = [
    { name: "React",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "HTML5",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Bootstrap",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "Express",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "GitHub",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Git",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "MongoDB",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Node.js",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Arduino",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
  ];

  const skillsData = [
    {
      category: "Frontend",
      skills: ["React.js", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "Python", "MongoDB", "MySQL"],
    },
    {
      category: "IoT",
      skills: ["Arduino", "ESP32", "C", "C++", "Wokwi"],
    },
    {
      category: "Tools",
      skills: ["Git", "GitHub", "VS Code", "Canvas", "Java"],
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
