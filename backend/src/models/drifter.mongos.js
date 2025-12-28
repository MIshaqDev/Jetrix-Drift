// Import MongoDB library and slug generator
import mongoose from "mongoose";
import slugify from "slugify";

// Define drifter schema
const DrifterSchema = new mongoose.Schema({
    // Drifter first name
    firstName: { type: String, require: true },
    // Drifter last name
    lastName: { type: String },
    // Full name (auto-generated)
    fullName: { type: String, require: true },
    // Drifter profile image
    image: { type: String, required: true, unique: true },
    // Drifter age
    age: { type: Number, require: true, min: [18, "Age must be at leatest 18"], max: [40, "Age must be at most 40"] },
    // Drifter nationality
    nationallity: { type: String, require: true },
    // Current ranking/position
    rank: { type: Number, require: true },
    // Reference to team
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
    // Background color code
    bgColor: {
        type: String,
        match: /^#([0-9a-fA-F]{6})$/
    },
    // Drifter category (Pro or Prospect)
    catagory: { type: String, require: true, enum: ["Pro", "Prospec"] },
    // Number of championships won
    championships: { type: Number, require: true, default: 0 },
    // Number of race wins
    raceWin: { type: Number, require: true, default: 0 },
    // Total points accumulated
    totalPoints: { type: Number, require: true, default: 0 },
    // Drifter biography
    biography: { type: String, require: true, maxLength: [5000, "Biography can not be more than 5000 characters"] },
    // Career summary
    careerSummary: { type: String, require: true, maxLength: [2000, "Career Summary can not be more than 2000 characters"] },
    // URL-friendly slug
    slug: { type: String, unique: true },
    // Drifter status
    status: {
    type: String,
    enum: ["active", "retired", "injured"],
    default: "active"
  },
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Index for unique drifter identification
DrifterSchema.index(
  { firstName: 1, lastName: 1, nationallity: 1 },
  { unique: true }
);

// Auto-generate full name before saving
DrifterSchema.pre("save", function () {
    this.fullName = this.firstName + " " + this.lastName;
});

// Generate slug from full name before saving
DrifterSchema.pre("save", async function () {
  // Only generate slug when creating OR when fullName changes
  if (!this.isModified("fullName")) return;

  const baseSlug = slugify(this.fullName, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let counter = 1;

  const Drifter = this.constructor;

  // Handle duplicate slugs
  while (await Drifter.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  this.slug = slug;
});

// Create and export Drifter model
const Drifter = mongoose.model("Drifter", DrifterSchema);
export default Drifter;