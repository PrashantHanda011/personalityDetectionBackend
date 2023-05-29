import mongoose from "mongoose";
import User from "../model/UserSchema.js";
import findPitch from "./findPitch.js";

const fetchAudioUrls = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({});
    // get all users from the database
    const audioUrls = users.reduce(
      (acc, cur) => [...acc, ...cur.media.audioURL],
      []
    );
    // extract all audio URLs from the users
    const pitches = await Promise.all(audioUrls.map(findPitch)); // find the pitch for each audio file
    const pitchResults = audioUrls.map((url, i) => ({
      url,
      pitch: pitches[i],
    }));
    mongoose.connection.close();
    return pitchResults;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchAudioUrls;
