import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    mealImages: { type: [String], required: true },
    protein: { type: String, required: true },
    carbs: { type: String, required: true },
    fats: { type: String, required: true },
    ingredients: { type: [String], required: true },
    seasoning: { type: String, required: true },
    cookingInstructions: { type: [String], required: true },
    tags: { type: [String] } 
});

// Utilisation de mongoose.models et du nom du modèle en minuscules
const Meals = mongoose.models.meals || mongoose.model('meals', mealSchema);
export default Meals;
