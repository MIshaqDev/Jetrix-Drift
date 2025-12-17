import mongoose from "mongoose";
import slugify from "slugify";

const teamSchema = new mongoose.Schema({
    firstName: { type:String, required: true},
    lastName: { type:String, required: true},
    fullName: {type:String},
    country: { type:String, required: true},
    foundedIn: { type: Date, required: true},
    teamcolor: { type: String, required: true, unique: true },
    vehical: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
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

teamSchema.pre("save", function (){
    this.fullName = this.firstName + " " + this.lastName;
});

teamSchema.pre("save", function (){
    if(!this.slug){
        this.slug = slugify(this.fullName, { lower: true, strict: true });
    }
});

const Team = mongoose.model("Team", teamSchema);
export default Team;