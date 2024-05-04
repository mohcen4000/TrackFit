import React, { useState, useEffect } from "react";
import styles from "./Meals.module.css";

const MainMeals = ({ setSelectedMeal, data, updateProgress, fetchparent }) => {
  const meals = data;
  const [disableCheckButtons, setDisableCheckButtons] = useState(false);
  const [mealsCompleted, setMealsCompleted] = useState([]);
  const [checkedMeals, setCheckedMeals] = useState([]);

  useEffect(() => {
    fetchDailyMealsCompleted();
  }, []);

  useEffect(() => {
    if (mealsCompleted.length >= 4) {
      setDisableCheckButtons(true);
    } else {
      setDisableCheckButtons(false);
    }
  }, [mealsCompleted]);

  const fetchDailyMealsCompleted = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/dailyMealsCompleted");
      if (response.ok) {
        const data = await response.json();
        setMealsCompleted(data);
      } else {
        throw new Error("Failed to fetch daily meals completed");
      }
    } catch (error) {
      console.error("Error fetching daily meals completed:", error.message);
    }
  };

  const handleCheckButtonClick = async (mealId, event) => {
    event.stopPropagation();
    

    try {
      const isMealCompleted = mealsCompleted.some((item) => item.mealId === mealId);

      // Ne rien faire si le repas est déjà complété
      if (isMealCompleted) {
        return;
      }

      const response = await fetch("http://localhost:3000/api/dailyMealsCompleted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealId: mealId.toString(),
          completed: true,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add meal");
      }

      setCheckedMeals((prevCheckedMeals) => [
        ...prevCheckedMeals,
        mealId,
      ]);
      fetchparent()
      updateProgress();
      fetchDailyMealsCompleted(); // Mettre à jour la liste des repas complets
    } catch (error) {
      console.error("Error adding meal:", error.message);
    }
  };

  const handleUncheckButtonClick = async (mealId, event) => {
    event.stopPropagation();

    try {
      const response = await fetch("http://localhost:3000/api/dailyMealsCompleted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealId: mealId.toString(),
          completed: false,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove meal");
      }

      setCheckedMeals((prevCheckedMeals) => {
        return prevCheckedMeals.filter((id) => id !== mealId);
      });

      fetchparent()
      fetchDailyMealsCompleted(); // Mettre à jour la liste des repas complets
      updateProgress();
    } catch (error) {
      console.error("Error removing meal:", error.message);
    }
  };

  const isMealChecked = (mealId) => {
    return checkedMeals.includes(mealId);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.picCont}>
        {meals.map((meal, index) => (
          <div key={index} className={styles.repCont} onClick={() => setSelectedMeal(meal.name)}>
            <img src={meal.image} alt="image" />
            <div className={styles.DetailsRepCont}>
              <span className={styles.mealName}>{meal.name}</span>
              <p className={styles.mealsInfo}>
                <span>{meal.tags.join(", ")}</span>
              </p>
              <button
                className={styles.button}
                onClick={(event) => handleCheckButtonClick(meal._id, event)}
                disabled={disableCheckButtons || mealsCompleted.some((item) => item.mealId === meal._id)}
              >
                {isMealChecked(meal._id) ? "Uncheck" : "Check"}
              </button>
              {mealsCompleted.some((item) => item.mealId === meal._id) && (
                <button
                  className={styles.button}
                  onClick={(event) => handleUncheckButtonClick(meal._id, event)}
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

export default MainMeals;
