import React from "react";
import styles from "./Background.module.css";
import darkBg from "../../assets/darkthemed.png";
import lightBg from "../../assets/lightthemed.jpg";

const Background = () => {
  return (
    <div className={styles.bgContainer} aria-hidden="true">
      {/* Light theme background layer */}
      <div
        className={`${styles.bgLayer} ${styles.lightLayer}`}
        style={{ backgroundImage: `url(${lightBg})` }}
      />

      {/* Dark theme background layer */}
      <div
        className={`${styles.bgLayer} ${styles.darkLayer}`}
        style={{ backgroundImage: `url(${darkBg})` }}
      />

      {/* Subtle overlay for optimal content readability */}
      <div className={styles.overlay} />
    </div>
  );
};

export default Background;
