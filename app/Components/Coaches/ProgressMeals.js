import React from "react";
import styles from "./Coach.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ProgressMeals = () => {
  let progress = 70;
  return (
    <div className={styles.progressMeal}>
      <div className={styles.TimeAndRep}>
        <img src="/images/meals-icon.png" alt="image" />
        <h1 className={styles.h1}>Today Meals</h1>
        <h2 className={styles.h2}>3 Meals</h2>
      </div>
      <div style={{ width: 160, height: 160, margin: 10 }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          strokeWidth={11}
          styles={buildStyles({
            rotation: 0,
            strokeLinecap: "butt",
            textSize: "20px",
            pathTransitionDuration: 0.5,
            pathColor: `#10B3CB`,
            textColor: "#fFFFFF",
            trailColor: "#FFFFFF",
            backgroundColor: "#C0C0C0",
          })}
        />
      </div>
    </div>
  );
};
