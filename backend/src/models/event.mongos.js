// Import MongoDB library and slug generator
import mongoose from "mongoose";
import slugify from "slugify";

// Define event schema
const eventSchema = new mongoose.Schema({
  // Event name
  name: { type: String, required: true, unique: true },
  // Event image/poster
  eventImage: { type: String, required: true },
  // Number of rounds in event
  rounds: { type: Number, required: true },
  // Event location
  location: { type: String, required: true},
  // Event date
  date: { type: Date, required: true},
  // Event description
  description: { type: String, required: true },
  // Total prize pool
  pricePool: { type: Number, required: true },
  // Event status
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
    required: true,
  },
  // URL-friendly slug
  slug: { type: String, unique: true, sparse: true },
}, {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

// Generate slug from event name before saving
eventSchema.pre("save", async function(){
    this.slug = slugify(this.name, { lower: true, strict: true });
});

// Create and export Event model
const Event = mongoose.model("Event", eventSchema);
export default Event;