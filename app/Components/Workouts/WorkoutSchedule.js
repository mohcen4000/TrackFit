'use client'
// WorkoutSchedule.js

import React, { useState } from "react";
import styles from "./Workouts.module.css";
import StandardExercises from "./StandardExercice";
import MainWorkout from "./MainWorkout";
import WorkoutsList from "./WorkoutsList";

const WorkoutSchedule = ({ updateProgress, fetchWorkoutsCompleted }) => {
  const [selectedExercise, setSelectedExercise] = useState(false);
  const workoutsData = WorkoutsList();

  const handleGoBack = () => {
    setSelectedExercise(false);
  };

  return (
    <div>
      <div className={styles.MainWorkoutSheduel}>
        {!selectedExercise && (
          <MainWorkout
            setSelectedExercise={setSelectedExercise}
            data={workoutsData}
            updateProgress={updateProgress}
            fetchParent={fetchWorkoutsCompleted}
          />
        )}

        {workoutsData.map(
          (exercise) =>
            selectedExercise === exercise.name && (
              <StandardExercises
                key={exercise.name}
                workoutImages={exercise.workoutImages}
                targets={exercise.targets}
                level={exercise.level}
                description={exercise.description}
              />
            )
        )}

        {selectedExercise && (
          <button className={styles.BackButton} onClick={handleGoBack}>
            {"< Back"}
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkoutSchedule;
