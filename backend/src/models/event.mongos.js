import mongoose from "mongoose";
import slugify from "slugify";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  eventImage: { type: String, required: true },
  rounds: { type: Number, required: true },
  location: { type: String, required: true},
  date: { type: Date, required: true},
  description: { type: String, required: true },
  pricePool: { type: Number, required: true },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
    required: true,
  },
  slug: { type: String, unique: true, sparse: true },
}, {
  timestamps: true,
});

eventSchema.pre("save", async function(){
    this.slug = slugify(this.name, { lower: true, strict: true });
});

const Event = mongoose.model("Event", eventSchema);
export default Event;