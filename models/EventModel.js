// In events model file
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageSrcM1: { type: String, required: true },
  imagedetails: { type: String, required: true },
  description: { type: String, required: true },
  participantLimit: { type: Number, default: 0 },
  creator: { type: String, required: true }, // Change type to String
  eventAddress: { type: String, required: true },
  eventDate: { type: String, required: true },
  numberOfParticipants: { type: Number, default: 0 },
  participants: { type: [String], default: [], ref: "profiles" }, // Define participants field as array of strings
});

const Events = mongoose.models.events || mongoose.model("events", eventSchema); // Use 'events' for collection name
export default Events;
