import React, { useState, useEffect } from "react";
import styles from "./Certifications.module.css";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/api/certificates`)
      .then((res) => res.json())
      .then((data) => setCertifications(data))
      .catch((err) => console.log("Error fetching certificates:", err));
  }, []);

  const visibleCerts = showAll ? certifications : certifications.slice(0, 4);

  return (
    <section className={styles.certSection} id="certifications">
      <div className={styles.certContainer}>
        {/* HEADER */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Achievements</div>
          <h2 className={styles.sectionTitle}>Certifications</h2>
          <p className={styles.sectionDescription}>
            A showcase of my verified course completions and workshops.
          </p>
        </div>

        {/* GRID */}
        <div className={styles.certGrid}>
          {visibleCerts.map((cert) => (
            <div
              key={cert._id}
              className={styles.certCard}
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_API_URL}/uploads/${cert.fileURL}`,
                  "_blank"
                )
              }
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${
                  cert.thumbnailURL
                }`}
                alt={cert.title}
                className={styles.certThumbnail}
              />
              <p className={styles.certTitle}>{cert.title}</p>
            </div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className={styles.buttonWrapper}>
          <button
            className={styles.viewBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View All"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
