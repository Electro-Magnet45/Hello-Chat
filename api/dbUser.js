import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  userId: String,
  displayName: String,
  userName: String,
  verified: Boolean,
  avatar: String,
});

export default mongoose.model("userDetails", userSchema);
