'use client'
import React, { useState, useEffect } from "react";
import styles from "./Workouts.module.css";
import { ProgressInformation } from "./ProgressInformation";
import WorkoutSchedule from "./WorkoutSchedule";

export const BodyWorkouts = () => {
  const [remainingExercises, setremainingExercises] = useState(4);
  const [progress, setProgress] = useState(0);
  const [workoutsCompleted, setWorkoutsCompleted] = useState([]);

  const updateProgress = () => {
    const completedExercisesCount = workoutsCompleted.length;
    const totalExercisesCount = 4; // Assuming you have a total of 4 exercises
    const newProgress = (completedExercisesCount / totalExercisesCount) * 100;
    setremainingExercises(totalExercisesCount - workoutsCompleted.length) ;
    setProgress(newProgress);
  };

    const fetchWorkoutsCompleted = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/dailyWorkoutsCompleted");
        if (response.ok) {
          const data = await response.json();
          setWorkoutsCompleted(data);
        } else {
          throw new Error("Failed to fetch daily workouts completed");
        }
      } catch (error) {
        console.error("Error fetching daily workouts completed:", error.message);
      }
    };

    useEffect(() => {
    fetchWorkoutsCompleted();
    }, []);

  useEffect(() => {
    updateProgress();
  }, [workoutsCompleted]);

  return (
    <div className={styles.workoutContainer}>
      <ProgressInformation progress={progress} totalExercises={remainingExercises} />
      <WorkoutSchedule updateProgress={updateProgress} fetchWorkoutsCompleted={fetchWorkoutsCompleted} />
    </div>
  );
};

export default BodyWorkouts;
