import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true }, //
  dateOfBirth: { type: Date, default: null }, //
  gender: { type: String, enum: ["Male", "Female", "Other"], default: null }, //
  height: { type: Number, default: null }, //
  weight: { type: Number, default: null }, //
  email: { type: String, required: true }, //
  password: { type: String, required: true }, //
  profileImage: { type: String, default: null }, // },
  workoutsCompleted: [
    {
      workoutId: { type: String },
      date: { type: Date },
    },
  ],
  favoriteMeals: { type: [String], default: null }, //
  eventsAttended: { type: [String], default: null }, //
  role: { type: Number, default: 1 },
  goal: { type: [String], default: null }, //
  mealPreference: { type: String, default: null }, //
  activityLevel: { type: String },
  Messages: [
    {
      sender: { type: String },
      message: { type: String },
    },
  ],
});

// Utilisation de mongoose.models et du nom de la collection en minuscules
const ProfileModel =
  mongoose.models.profiles || mongoose.model("profiles", profileSchema);

export default ProfileModel;
