import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Définition du schéma pour la collection dailyMeals
const dailyMealSchema = new Schema({
  userId: {
    type: String,
  },
  mealId: {
    type: String,
  },
  date: {
    type: Date,
  }
});

// Création du modèle à partir du schéma
const DailyMeal = mongoose.models.dailyMeals || mongoose.model('dailyMeals', dailyMealSchema);

export default DailyMeal;
