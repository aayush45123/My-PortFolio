import React, { useEffect, useRef } from "react";
import styles from "./Background.module.css";

const Background = () => {
  return (
    <div className={styles.pageStack} aria-hidden="true">
      {/* Stacked paper layers for depth */}
      <div className={styles.paperLayer3} />
      <div className={styles.paperLayer2} />
      <div className={styles.paperLayer1} />
    </div>
  );
};

export default Background;
