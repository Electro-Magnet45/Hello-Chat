import mongoose from "mongoose";

const tweetSchema = mongoose.Schema({
  displayName: String,
  userName: String,
  verified: Boolean,
  text: String,
  avatar: String,
  image: String,
  time: { type: Date, default: Date.now },
});

export default mongoose.model("messagecontents", tweetSchema);
