import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  eventImage: { type: String, required: true, unique: true },
  rounds: { type: Number, required: true, unique: true },
  location: { type: String, required: true},
  date: { type: Date, required: true},
  description: { type: String, required: true, unique: true },
  pricePool: { type: Number, required: true },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;