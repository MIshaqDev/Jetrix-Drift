import mongoose from "mongoose";
import slugify from "slugify";

const teamSchema = new mongoose.Schema({
    firstname: { type:String, required: true, unique: true},
    lastName: { type:String, required: true, unique: true},
    fullName: {type:String, required: true, unique: true},
    country: { type:String, required: true},
    foundedIn: { type: Date, required: true},
    teamcolor: { type: String, required: true, unique: true },
    vehical: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    teamLogo: { type: String, required: true, unique: true },
    Championships: {type: Number, required: true, default: 0},
    yearsActive: {type: Number, required: true, default: 0},
    slug: { type: String, unique: true },
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

teamSchema.pre("save", function (next){
    if(!this.fullName){
        this.fullName = this.firstname + " " + this.lastName;
    }
});

teamSchema.pre("save", function (next){
    if(!this.slug){
        this.slug = slugify(this.fullName, { lower: true, strict: true });
    }
});

teamSchema.virtual("drivers", {
    ref: "Driver",
    localField: "_id",
    foreignField: "team",
});

teamSchema.virtual("Pro Drivers", {
    ref: "Driver",
    localField: "_id",
    foreignField: "team",
    match: { rank: "Pro" },
});

const Team = mongoose.model("Team", teamSchema);
export default Team;