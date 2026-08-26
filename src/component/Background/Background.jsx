import React from "react";
import styles from "./Background.module.css";

const Background = () => {
  return (
    <div className={styles.bgContainer} aria-hidden="true">
      {/* Top ambient soft radial glow */}
      <div className={styles.ambientGlowTop} />
      {/* Bottom ambient accent glow */}
      <div className={styles.ambientGlowBottom} />
    </div>
  );
};

export default Background;
