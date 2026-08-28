import {
  recordWakeWord,
  hasAudio,
} from "./voiceTools.js";
import { speechToText } from "./speechToText.js";
import { text } from "stream/iter";

function isWakeWord(text: string): boolean {
  const normalized = text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .trim();

  console.log(`🔎 Checking wake word: "${normalized}"`);

  // Ignore empty audio
  if (!normalized) {
    return false;
  }

  // Exact wake word
  if (normalized === "jarvis") {
    return true;
  }

  // Common Whisper misrecognitions of "Jarvis"
  const wakeWordVariants = [
    "jairus",
    "jairis",
    "jervis",
  ];

  const words = normalized.split(/\s+/);

  // Examples:
  // "hey jarvis"
  // "okay jarvis"
  // "hi jarvis"
  if (words.includes("jarvis")) {
    return true;
  }

  // Examples:
  // "hey jairus"
  // "okay jervis"
  if (
    words.some((word) =>
      wakeWordVariants.includes(word)
    )
  ) {
    return true;
  }

  return false;
}

export async function waitForWakeWord(): Promise<void> {
  console.log("😴 JARVIS: Waiting for wake word...");

  while (true) {
    try {
      // Record audio while waiting for the wake word
      const audioFile = await recordWakeWord();

const audioDetected = await hasAudio(audioFile);

if (!audioDetected) {
  console.log(
    "🔇 JARVIS: No speech detected."
  );

  continue;
}

const text = await speechToText(audioFile);
      console.log(
        `👂 Wake listener heard: "${text}"`
      );

      // Check whether JARVIS was called
      if (isWakeWord(text)) {
        console.log(
          "⚡ JARVIS: Wake word detected, ma'am."
        );

        return;
      }

      console.log(
        "😴 JARVIS: Wake word not detected."
      );
    } catch (error) {
      console.error(
        "Wake word error:",
        error
      );
    }
  }
}