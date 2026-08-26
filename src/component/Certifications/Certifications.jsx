import React, { useState, useEffect } from "react";
import styles from "./Certifications.module.css";
import { API_BASE } from "../../api/axios";

// Helper to support both Cloudinary full URLs and legacy local relative URLs
const resolveMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${API_BASE}${url}`;
};

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/certificates`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCertifications(data);
        }
      })
      .catch((err) => console.log("Error fetching certificates:", err))
      .finally(() => setLoading(false));
  }, []);

  const visibleCerts = showAll ? certifications : certifications.slice(0, 4);

  return (
    <section className={styles.certSection} id="certifications">
      <div className={styles.certContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Achievements</div>
          <h2 className={styles.sectionTitle}>Certifications</h2>
          <p className={styles.sectionDescription}>
            A showcase of my verified course completions and workshops.
          </p>
        </div>

        {loading ? (
          <p style={{ color: "var(--text-tertiary)", textAlign: "center", padding: "40px 0", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            Loading certifications...
          </p>
        ) : certifications.length === 0 ? (
          <p style={{ color: "var(--text-tertiary)", textAlign: "center", padding: "40px 0", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            No certificates added yet. Upload new certificates via /admin.
          </p>
        ) : (
          <>
            <div className={styles.certGrid}>
              {visibleCerts.map((cert) => (
                <div
                  key={cert._id}
                  className={styles.certCard}
                  onClick={() =>
                    window.open(
                      resolveMediaUrl(cert.fileURL),
                      "_blank"
                    )
                  }
                >
                  <img
                    src={resolveMediaUrl(cert.thumbnailURL)}
                    alt={cert.title}
                    className={styles.certThumbnail}
                  />
                  <p className={styles.certTitle}>{cert.title}</p>
                </div>
              ))}
            </div>

            {certifications.length > 4 && (
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.viewBtn}
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "View Less" : "View All"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Certifications;
