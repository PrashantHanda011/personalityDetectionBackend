import fetch from "node-fetch";
import WavDecoder from "wav-decoder";
import Pitchfinder from "pitchfinder";

const detectPitch = Pitchfinder.YIN();

async function findPitch(audioUrl, threshold = 0.5) {
  try {
    const res = await fetch(audioUrl);
    const buffer = await res.arrayBuffer();
    const decoded = WavDecoder.decode.sync(new Uint8Array(buffer));
    const float32Array = decoded.channelData[0];
    const pitch = detectPitch(float32Array);
    if (pitch < threshold) {
      console.log(
        `Pitch for audio ${audioUrl} below threshold (${pitch} < ${threshold})`
      );
      return null;
    }
    console.log(`The pitch for audio ${audioUrl} is ${pitch}`);
    return pitch;
  } catch (error) {
    console.error(`Error fetching or processing audio ${audioUrl}:`, error);
    return null;
  }
}

export default findPitch;
