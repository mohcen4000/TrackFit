import React from "react";
import styles from "./Workouts.module.css";

const StandardExercises = ({ workoutImages, targets, level, description }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ImagesContainer}>
        {/* Afficher les images de l'exercice */}
        {workoutImages.map((imageSrc, index) => (
          <img key={index} src={imageSrc} alt={`Image ${index + 1}`} />
        ))}
      </div>
      {/* Afficher les détails de l'exercice */}
      <div className={styles.WorkoutAdvices}>
        <h2>Exercise Details:</h2>
        <p>Targets: {targets}</p>
        <p>Level: {level}</p>
        <p>Description: {description}</p>
      </div>
    </div>
  );
};

export default StandardExercises;
