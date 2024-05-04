import React from "react";
import styles from "./Meals.module.css";

const StandardMeals = ({ mealImages, protein, carbs, fats, ingredients, seasoning, cookingInstructions }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ImagesContainer}>
        {/* Afficher les images du repas */}
        {mealImages.map((imageSrc, index) => (
          <img key={index} src={imageSrc} alt={`Image ${index + 1}`} />
        ))}
      </div>
      {/* Afficher les informations sur le repas */}
      <div className={styles.MealDetails}>
        <h2 >Nutritional Information:</h2>
        <p>Protein: {protein}</p>
        <p>Carbs: {carbs}</p>
        <p>Fats: {fats}</p>
        <h2 >Ingredients:</h2>
        <ul className={styles.List}>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 >Seasoning:</h2>
        <p>{seasoning}</p>
        <h2 >Cooking Instructions:</h2>
        <ol className={styles.List}>
          {cookingInstructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default StandardMeals;
