import { speak } from "./ttsTools.js";

async function test() {
  await speak(
    "It's working, ma'am. JARVIS can now speak AI responses without breaking."
  );

  console.log("TTS test completed.");
}

test();