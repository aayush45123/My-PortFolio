import React, { useState, useEffect } from "react";
import styles from "./Certifications.module.css";
import { API_BASE } from "../../api/axios";
import { ExternalLink } from "lucide-react";

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
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ 04 ]</span>
          <h2 className={styles.sectionTitle}>Certifications & Honors</h2>
        </div>

        {loading ? (
          <p className={styles.statusMessage}>Loading credentials...</p>
        ) : certifications.length === 0 ? (
          <p className={styles.statusMessage}>
            No certificates added yet. Upload via the admin route.
          </p>
        ) : (
          <>
            <div className={styles.certGrid}>
              {visibleCerts.map((cert, i) => (
                <div
                  key={cert._id}
                  className={styles.certCard}
                  onClick={() =>
                    window.open(resolveMediaUrl(cert.fileURL), "_blank")
                  }
                  title="Click to view original document"
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={resolveMediaUrl(cert.thumbnailURL)}
                      alt={cert.title}
                      className={styles.certThumbnail}
                    />
                    <div className={styles.viewBadge}>
                      <ExternalLink size={14} />
                    </div>
                  </div>

                  <div className={styles.cardInfo}>
                    <span className={styles.certIndex}>CERT / {String(i + 1).padStart(2, "0")}</span>
                    <p className={styles.certTitle}>{cert.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {certifications.length > 4 && (
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.viewBtn}
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "[ View Less ]" : "[ View All Certifications ]"}
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
