// Import MongoDB library and slug generator
import mongoose from 'mongoose';
import slugify from 'slugify';

// Define car schema
const CarSchema = new mongoose.Schema({
    // Car model name
    model: {
        type: String,
        required: true,
        unique: true
    },
    // Car image URL
    image: {
        type: String,
        required: true,
        unique: true
    },
    // Car brand/manufacturer
    brand: {
        type: String,
        required: true
    },
    // Year of manufacture
    year: {
        type: Date,
    },
    // Background color code
    bgColor: {
        type: String,
        regex: /^#([0-9a-fA-F]{6})$/
    },
    // Engine type/specification
    engine: {
        type: String,
    },
    // Horsepower rating
    horsePower: {
        type: Number,
    },
    // Vehicle weight
    weight: {
        type: Number,
    },
    // Engine torque
    torque: {
        type: Number,
    },
    // Brake type
    brakes: {
        type: String,
    },
    // Tire specification
    tires: {
        type: String,
    },
    // URL-friendly slug
    slug: { type: String, unique: true },
    // Car modifications description
    modifications: {
        type: String,
        maxLength: [2000, "Modifications can not be more than 2000 characters"]
    },
    // Reference to team
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
    // Reference to drifters
    drifters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drifter",
    }]

},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Generate slug from model name before saving
CarSchema.pre("save", async function () {
    const baseSlug = slugify(this.model, {
        lower: true,
        strict: true,
      });
      this.slug = baseSlug;
});

// Create and export Car model
const Car = mongoose.model('Car', CarSchema);

export default Car;