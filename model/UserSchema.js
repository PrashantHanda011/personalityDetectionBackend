import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
  profession: String,
  character: String,
  questions: [],
  feedback: {
    reason: String,
    feedbackStatus: Boolean
  },
  media: {
    audioURL: [String],
    images: [String],
    signature: [String],
  },
  result: {
    openness: Number,
    conscientiousness: Number,
    extraversion: Number,
    agreeableness: Number,
    neuroticism: Number,
    pitch: Number,
    threshold: Number,
    gptResult: String,
  }
});
const User = mongoose.model("User", userSchema)
export default User
