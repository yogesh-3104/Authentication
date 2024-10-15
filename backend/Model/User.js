import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    isVerified: Boolean,
    verifyCode: {
      type: String,
      length: 6,
    },
    verifyCodeExpiry: Date,
    forgetPasswordCode: String,
    forgetPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
