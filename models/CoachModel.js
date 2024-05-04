import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePic: { type: String, required: true },
  email: { type: String, required: true },
  picturedetails: { type: [String], required: true },
  description: { type: String, required: true },
  experience: { type: [String], required: true },
  services: { type: [String], required: true },
  location: { type: String, required: true },
  contactDetails: { type: String, required: true },
  Messages: { type: [String], default: [] },
});

const Coaches =
  mongoose.models.coaches || mongoose.model("coaches", coachSchema); // Use 'events' for collection name
export default Coaches;
