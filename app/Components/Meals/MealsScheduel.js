'use client'
// MealsScheduel.js

import React, { useState } from "react";
import styles from "./Meals.module.css";
import StandardMeals from "./StandardMeals";
import MainMeals from "./MainMeals";
import MealsList from "./MealsList";

const MealsScheduel = ({ updateProgress, fetchMealsCompleted }) => {
  const [selectedMeal, setSelectedMeal] = useState(false);
  const mealsData = MealsList();

  const handleGoBack = () => {
    setSelectedMeal(false);
  };

  return (
    <div>
      <div className={styles.MainWorkoutSheduel}>
        {!selectedMeal && (
          <MainMeals
            setSelectedMeal={setSelectedMeal}
            data={mealsData}
            updateProgress={updateProgress}
            fetchparent={fetchMealsCompleted}
          />
        )}

        {mealsData.map(
          (meal) =>
            selectedMeal === meal.name && (
              <StandardMeals
                key={meal.name}
                mealImages={meal.mealImages}
                protein={meal.protein}
                carbs={meal.carbs}
                fats={meal.fats}
                ingredients={meal.ingredients}
                seasoning={meal.seasoning}
                cookingInstructions={meal.cookingInstructions}
              />
            )
        )}

        {selectedMeal && (
          <button className={styles.BackButton} onClick={handleGoBack}>
            {"< Back"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MealsScheduel;
