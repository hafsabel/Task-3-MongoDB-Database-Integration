import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }); // index for faster queries

export const User = mongoose.model("User", userSchema);
