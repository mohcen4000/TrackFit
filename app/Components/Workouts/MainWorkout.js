import React, { useState, useEffect } from "react";
import styles from "./Workouts.module.css";

const MainWorkout = ({ setSelectedExercise, data, updateProgress,fetchParent }) => {
  const exercises = data;
  const [disableCheckButtons, setDisableCheckButtons] = useState(false);
  const [workoutsCompleted, setWorkoutsCompleted] = useState([]);
  const [checkedExercises, setCheckedExercises] = useState([]);

  useEffect(() => {
    fetchDailyWorkoutsCompleted();
  }, []);

  useEffect(() => {
    if (workoutsCompleted.length >= 4) {
      setDisableCheckButtons(true);
    } else {
      setDisableCheckButtons(false);
    }
  }, [workoutsCompleted]);

  const fetchDailyWorkoutsCompleted = async () => {
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

  const handleCheckButtonClick = async (exerciseId, event) => {
    event.stopPropagation();
    updateProgress();

    try {
      const isExerciseCompleted = workoutsCompleted.some((item) => item.workoutId === exerciseId);

      // Ne rien faire si l'exercice est déjà complété
      if (isExerciseCompleted) {
        return;
      }

      const response = await fetch("http://localhost:3000/api/dailyWorkoutsCompleted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workoutId: exerciseId.toString(),
          completed: true,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add workout");
      }

      setCheckedExercises((prevCheckedExercises) => [
        ...prevCheckedExercises,
        exerciseId,
      ]);
      fetchParent()
      updateProgress();
      fetchDailyWorkoutsCompleted(); // Mettre à jour la liste des exercices complets
    } catch (error) {
      console.error("Error adding workout:", error.message);
    }
  };

  const handleUncheckButtonClick = async (exerciseId, event) => {
    event.stopPropagation();

    try {
      const response = await fetch("http://localhost:3000/api/dailyWorkoutsCompleted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workoutId: exerciseId.toString(),
          completed: false,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove workout");
      }

      setCheckedExercises((prevCheckedExercises) => {
        return prevCheckedExercises.filter((id) => id !== exerciseId);
      });

      fetchParent()
      updateProgress();
      fetchDailyWorkoutsCompleted(); // Mettre à jour la liste des exercices complets
    } catch (error) {
      console.error("Error removing workout:", error.message);
    }
  };

  const isExerciseChecked = (exerciseId) => {
    return checkedExercises.includes(exerciseId);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.picCont}>
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className={styles.repCont}
            onClick={() => setSelectedExercise(exercise.name)}
          >
            <img src={exercise.image} alt="image" />
            <div className={styles.DetailsRepCont}>
              <span className={styles.exerciceNumb}>{exercise.name}</span>
              <p className={styles.workoutsInfo}>
                <span>{exercise.reps} Reps, </span> <span>{exercise.sets} Sets</span>
              </p>
              <button
                className={styles.button}
                onClick={(event) => handleCheckButtonClick(exercise._id, event)}
                disabled={disableCheckButtons || workoutsCompleted.some((item) => item.workoutId === exercise._id)}
              >
                {isExerciseChecked(exercise._id) ? "Uncheck" : "Check"}
              </button>
              {workoutsCompleted.some((item) => item.workoutId === exercise._id) && (
                <button
                  className={styles.button}
                  onClick={(event) => handleUncheckButtonClick(exercise._id, event)}
                >
                  Uncheck
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainWorkout;
