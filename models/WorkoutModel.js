import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  exerciseImages: { type: [String], required: true },
  reps: { type: mongoose.Schema.Types.Mixed, required: true }, 
  sets: { type: Number },
  targets: { type: [String], required: true },
  level: { type: String},
  description: { type: String, required: true },
  goal: { type: [String], required: true },
  activityLevel: { type: [String], required: true }
});

  

// Corrected line: Use mongoose.models and the model name in lowercase
const Workouts = mongoose.models.workouts || mongoose.model('workouts', workoutSchema);
export default Workouts;