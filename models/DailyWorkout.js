const mongoose = require('mongoose');

// Définition du schéma pour la collection dailyWorkouts
const dailyWorkoutSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  workoutId: {
    type: String,
  },
  date: {
    type: Date,
  }
});

// Création du modèle à partir du schéma
const DailyWorkout = mongoose.models.dailyWorkouts || mongoose.model('dailyWorkouts', dailyWorkoutSchema);


export default DailyWorkout;
