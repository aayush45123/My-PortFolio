import React from "react";
import styles from "./Background.module.css";

const Background = () => {
  return (
    <>
      <div className={styles.bgGradient}></div>
      <div className={styles.bgGrid}></div>
    </>
  );
};

export default Background;
