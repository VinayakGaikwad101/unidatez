import mongoose from "mongoose";

function arrayLimit(val) {
  return val.length <= 3;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    age: {
      type: Number,
      min: 17,
      required: true,
      default: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    genderPreference: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Both"],
    },
    collegeStream: {
      type: String,
      enum: [
        "",
        "Biotechnology",
        "Mechanical",
        "Electrical and computer science",
        "Electronic and communication",
        "Computer science",
        "Civil",
        "Chemical",
        "Health sciences and technology",
        "Electrical and electronics",
        "Electrical and instrumentation",
        "Information technology",
      ],
    },
    unidatezFor: {
      type: String,
      enum: [
        "",
        "Friendship",
        "Networking",
        "Study Partner",
        "Just Here to Explore",
      ],
    },
    topSpotifyArtist: {
      type: String,
    },
    favouriteMovieSeries: {
      type: String,
    },
    topSongsOnSpotify: {
      type: String,
    },
    pronouns: { type: String },
    collegeYear: {
      type: String,
      enum: ["", "1st", "2nd", "3rd", "4th"],
    },
    homeState: { type: String },
    bio: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
      validate: [arrayLimit, 'Maximum 5 images allowed']
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
