import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Workouts.module.css";

export const ProgressInformation = ({ progress, totalExercises }) => {

  return (
    <div className={styles.progress}>
      <div className={styles.TimeAndRep}>
        <img src="/images/dumbbell.png" alt="image" />
        <span className={styles.h1}>Today Excercises</span>
        <span className={styles.h2}>{totalExercises} Exercices</span>
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
