'use client'
import React, { useState, useEffect } from "react";
import styles from "./Meals.module.css";
import { ProgressMeals } from "./ProgressMeals";
import MealsScheduel from "./MealsScheduel";

export const HealthyMeals = () => {
  const [remainingMeals, setRemainingMeals] = useState(4);
  const [progress, setProgress] = useState(0);
  const [mealsCompleted, setMealsCompleted] = useState([]);

  const fetchMealsCompleted = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/dailyMealsCompleted");
      if (response.ok) {
        const data = await response.json();
        setMealsCompleted(data);
        updateProgress(); // Mettre à jour le progrès après la récupération des données
      } else {
        throw new Error("Failed to fetch daily meals completed");
      }
    } catch (error) {
      console.error("Error fetching daily meals completed:", error.message);
    }
  };

  const updateProgress = () => {
    const completedMealsCount = mealsCompleted.length;
    const totalMealsCount = 4; // Assuming you have a total of 4 meals
    const newProgress = (completedMealsCount / totalMealsCount) * 100;
    setRemainingMeals(totalMealsCount - completedMealsCount);
    setProgress(newProgress);
  };

  useEffect(() => {
    fetchMealsCompleted();
  }, []);

  useEffect(() => {
    updateProgress();
  }, [mealsCompleted]);

  return (
    <div className={styles.mealContainer}>
      <ProgressMeals progress={progress} totalMeals={remainingMeals} />
      <MealsScheduel updateProgress={updateProgress} fetchMealsCompleted={fetchMealsCompleted} />
    </div>
  );
};

export default HealthyMeals;
