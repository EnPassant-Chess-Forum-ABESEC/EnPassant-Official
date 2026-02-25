import mongoose from "mongoose";

// chess accounts sub schema
const chessAccountsSchema = new mongoose.Schema({
  _id: false,

  chessCom: {
    userId: { type: String },
    ratings: {
      blitz: { type: Number, default: 0 },
      bullet: { type: Number, default: 0 },
      rapid: { type: Number, default: 0 },
    },
  },
  lichess: {
    userId: { type: String },
    ratings: {
      blitz: { type: Number, default: 0 },
      bullet: { type: Number, default: 0 },
      rapid: { type: Number, default: 0 },
    },
  },
  lastSync: { type: Date, default: Date.now },
});

// main user schema
const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true },
  userName: { type: String, required: true },
  collegeEmail: { type: String, required: true },
  branch: { type: String, default: "null" },
  year: { type: Number, min: 1, max: 5, default: 1 }, // 5 for passed out peeps if needed(can be removed if not required)
  chessAccounts: { type: chessAccountsSchema, default: {} },
  profilePictureUrl: {
    type: String,
    default: " ", // default profile url
  },
  isOnboardingCompelte: { type: Boolean, default: false },
  role: { type: String, required: true, default: "user" },
  cretedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
