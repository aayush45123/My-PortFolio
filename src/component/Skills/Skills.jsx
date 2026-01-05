import React, { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.css";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Floating skill logos data
  const floatingSkills = [
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "HTML5",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Bootstrap",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    },
    {
      name: "Express",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "GitHub",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "MySQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Arduino",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
    },
  ];

  // Skills data with progress bars
  const skillsData = [
    {
      category: "Frontend Development",
      skills: [
        { name: "React.js", level: 70 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "JavaScript", level: 80 },
      ],
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node.js", level: 50 },
        { name: "Express.js", level: 50 },
        { name: "Python", level: 40 },
        { name: "MongoDB", level: 90 },
      ],
    },
    {
      category: "Internet of Things (IoT)",
      skills: [
        { name: "Arduino Microcontroller", level: 80 },
        { name: "ESP32 Devkit", level: 60 },
      ],
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git & GitHub", level: 65 },
        { name: "VS Code", level: 100 },
        { name: "Wokwi", level: 80 },
        { name: "Canvas", level: 50 },
      ],
    },
    {
      category: "Programming Languages",
      skills: [
        { name: "C", level: 80 },
        { name: "C++", level: 68 },
        { name: "Java", level: 40 },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.skillsSection} id="skills" ref={sectionRef}>
      <div className={styles.skillsContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Skills</div>
          <h2 className={styles.sectionTitle}>
            I have experience with these technologies
          </h2>
          <p className={styles.sectionDescription}>
            A comprehensive overview of my technical skills and proficiency
            levels across various technologies and tools.
          </p>
        </div>

        {/* Floating Skills Icons Section */}
        <div className={styles.floatingSkillsContainer}>
          <div className={styles.floatingSkillsGrid}>
            {floatingSkills.map((skill, index) => (
              <div
                key={index}
                className={styles.floatingSkillBox}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className={styles.floatingSkillLogo}
                  title={skill.name}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid with Progress Bars */}
        <div className={styles.skillsGrid}>
          {skillsData.map((category, categoryIndex) => (
            <div key={categoryIndex} className={styles.skillCategory}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
              </div>

              <div className={styles.skillsList}>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillPercentage}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
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
