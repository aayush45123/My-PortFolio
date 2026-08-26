import React from "react";
import styles from "./Background.module.css";

const Background = () => {
  return (
    <div className={styles.pageStack} aria-hidden="true">
      <div className={styles.paperLayer3} />
      <div className={styles.paperLayer2} />
      <div className={styles.paperLayer1} />
    </div>
  );
};

export default Background;
