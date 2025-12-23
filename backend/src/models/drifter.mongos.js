import mongoose from "mongoose";
import slugify from "slugify";

const DrifterSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String },
    fullName: { type: String, require: true },
    image: { type: String, required: true, unique: true },
    age: { type: Number, require: true, min: [18, "Age must be at leatest 18"], max: [40, "Age must be at most 40"] },
    nationallity: { type: String, require: true },
    rank: { type: Number, require: true },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
    bgColor: {
        type: String,
        required: true,
        match: /^#([0-9a-fA-F]{6})$/
    },
    catagory: { type: String, require: true, enum: ["Pro", "Prospec"] },
    championships: { type: Number, require: true, default: 0 },
    raceWin: { type: Number, require: true, default: 0 },
    totalPoints: { type: Number, require: true, default: 0 },
    biography: { type: String, require: true, maxLength: [5000, "Biography can not be more than 5000 characters"] },
    careerSummary: { type: String, require: true, maxLength: [2000, "Career Summary can not be more than 2000 characters"] },
    slug: { type: String, unique: true },
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

DrifterSchema.index(
  { firstName: 1, lastName: 1, nationallity: 1 },
  { unique: true }
);


DrifterSchema.pre("save", function () {
    this.fullName = this.firstName + " " + this.lastName;
});

DrifterSchema.pre("save", async function (next) {
  // Only generate slug when creating OR when fullName changes
  if (!this.isModified("fullName")) return next();

  const baseSlug = slugify(this.fullName, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let counter = 1;

  const Drifter = this.constructor;

  while (await Drifter.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
  next();
});


const Drifter = mongoose.model("Drifter", DrifterSchema);
export default Drifter;