import mongoose from "mongoose";
import slugify from "slugify";

const teamSchema = new mongoose.Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    fullName: { type: String },
    country: { type: String, required: true },
    foundedIn: { type: Date, required: true },
    teamColor: {
        type: String,
        required: true,
        unique: true,
        match: /^#([0-9a-fA-F]{6})$/
    }
    ,
    vehicles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
        }
    ],
    drivers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
        }],
        default: [],
    },
    teamLogo: { type: String, required: true, unique: true },
    Championships: { type: Number, required: true, default: 0 },
    yearsActive: { type: Number, required: true, default: 0 },
    slug: { type: String, unique: true },
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

teamSchema.pre("save", function () {
    this.fullName = this.firstName + " " + this.lastName;
});

teamSchema.pre("save", function () {
    if (!this.slug) {
        this.slug = slugify(this.fullName, { lower: true, strict: true });
    }
});

const Team = mongoose.model("Team", teamSchema);
export default Team;