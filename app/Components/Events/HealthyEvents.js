import React from "react";
import styles from "./Events.module.css";

import { EventScheduel } from "./EventScheduel";
import { ProgressInformation } from "../Workouts/ProgressInformation";


export const HealthyEvents = () => {
  return (
    // <div className={styles.workoutsPageContainer}>
    <div className={styles.workoutContainer}>
  {/* les component de base de la page **/}
      
      <EventScheduel />
    </div>
  );
};

