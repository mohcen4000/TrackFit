import React from "react";
import styles from "./Coach.module.css";

import { CoachScheduel } from "./CoachScheduel";
import { ProgressInformation } from "../Workouts/ProgressInformation";


const HealthyCoaches = () => {
  return (
    // <div className={styles.workoutsPageContainer}>
    <div className={styles.workoutContainer}>
  {/* les component de base de la page **/}
      
      <CoachScheduel />
    </div>
  );
};

export default HealthyCoaches;
