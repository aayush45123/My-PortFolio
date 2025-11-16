import React from "react";
import styles from "./Education.module.css";

const Education = () => {
  const educationData = [
    {
      period: "2020 - 2022",
      degree: "Junior College (HSC)",
      institution: "Wilson College, Mumbai",
      description:
        "Completed Higher Secondary Education with focus on Science stream.",
      status: "Completed",
    },
    {
      period: "2022 - Present",
      degree: "B.Tech in Artificial Intelligence & Data Science",
      institution: "KJ Somaiya Institute of Technology, Mumbai",
      description:
        "Pursuing undergraduate degree specializing in AI/ML, Data Science, and Modern Software Development.",
      status: "Pursuing",
      current: true,
    },
  ];

  return (
    <section className={styles.educationSection} id="education">
      <div className={styles.educationContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Education</div>
          <h2 className={styles.sectionTitle}>My Academic Journey</h2>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {educationData.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <span className={styles.period}>{item.period}</span>
                <h3 className={styles.degree}>{item.degree}</h3>
                <p className={styles.institution}>{item.institution}</p>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.status}>
                  {item.current && <span className={styles.statusDot}></span>}
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
