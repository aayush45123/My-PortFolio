import React, { useEffect, useRef } from "react";
import styles from "./Background.module.css";

const Background = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        spotlightRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={spotlightRef} className={styles.bgContainer} aria-hidden="true">
      {/* Interactive Cursor Spotlight Glow */}
      <div className={styles.cursorSpotlight} />

      {/* Floating Animated Aurora Orbs */}
      <div className={`${styles.auroraOrb} ${styles.orb1}`} />
      <div className={`${styles.auroraOrb} ${styles.orb2}`} />
      <div className={`${styles.auroraOrb} ${styles.orb3}`} />

      {/* Soft Noise Texture Overlay for Rich Depth */}
      <div className={styles.noiseOverlay} />
    </div>
  );
};

export default Background;
