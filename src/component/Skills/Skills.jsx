import React, { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.css";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
          <h2 className={styles.sectionTitle}>Technical Expertise</h2>
          <p className={styles.sectionDescription}>
            A comprehensive overview of my technical skills and proficiency
            levels across various technologies and tools.
          </p>
        </div>

        {/* Skills Grid */}
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
