// Import MongoDB library and slug generator
import mongoose from "mongoose";
import slugify from "slugify";

// Define team schema
const teamSchema = new mongoose.Schema({
    // Team first name
    firstName: { type: String, required: true, unique: true },
    // Team last name
    lastName: { type: String, required: true, unique: true },
    // Full team name (auto-generated)
    fullName: { type: String },
    // Team country
    country: { type: String, required: true },
    // Year team was founded
    foundedIn: { type: Date, required: true },
    // Team color code
    teamColor: {
        type: String,
        required: true,
        unique: true,
        match: /^#([0-9a-fA-F]{6})$/
    },
    // Reference to team car
    car:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
        },
    // Array of drifters in team
    drifters: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drifter",
        }],
        default: [],
    },
    // Team logo image
    teamLogo: { type: String, required: true, unique: true },
    // Championships won
    Championships: { type: Number, required: true, default: 0 },
    // Years actively competing
    yearsActive: { type: Number, required: true, default: 0 },
    // URL-friendly slug
    slug: { type: String, unique: true },
    slugHistory: { type: [String], default: [] }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Auto-generate full name before saving
teamSchema.pre("save", function () {
    this.fullName = this.firstName + " " + this.lastName;
});

// Generate slug from full name before saving
teamSchema.pre("save", function () {
    if (!this.slug) {
        this.slug = slugify(this.fullName, { lower: true, strict: true });
    }
});

// Create and export Team model
const Team = mongoose.model("Team", teamSchema);
export default Team;