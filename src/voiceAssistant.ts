import { recordVoice } from "./voiceTools.js";
import { speechToText } from "./speechToText.js";
import { executeCommand } from "./commands.js";
import { speak } from "./ttsTools.js";
import { askAI } from "./ai.js";
import { detectIntent } from "./intentRouter.js";
import { waitForWakeWord } from "./wakeWord.js";

async function startVoiceAssistant() {
  console.log("🤖 JARVIS is ready, ma'am.");

  // =========================
  // SLEEP MODE
  // =========================

  while (true) {
    try {
      await waitForWakeWord();

      console.log("🤖 JARVIS: Yes, ma'am?");
      await speak("Yes, ma'am.");

      // Small pause before listening
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      // =========================
      // AWAKE / COMMAND MODE
      // =========================

      let listening = true;

      while (listening) {
        try {
          console.log(
            "🎙️ JARVIS: Command mode active..."
          );

          const audioFile = await recordVoice();

          // =========================
          // SPEECH → TEXT
          // =========================

          const command =
            await speechToText(audioFile);

          if (!command) {
            console.log(
              "🤖 JARVIS: I didn't understand anything, ma'am."
            );

            continue;
          }

          console.log(
            `🧠 JARVIS heard: ${command}`
          );

          const normalizedCommand = command
            .toLowerCase()
            .replace(/[.,!?]/g, "")
            .trim();

          // =========================
          // IGNORE WAKE WORD
          // =========================

          if (
            normalizedCommand === "jarvis" ||
            normalizedCommand === "jairus" ||
            normalizedCommand === "jervis"
          ) {
            console.log(
              "🤖 JARVIS: I'm already listening, ma'am."
            );

            continue;
          }

          // =========================
          // STOP LISTENING
          // =========================

          if (
            normalizedCommand.includes(
              "stop listening"
            ) ||
            normalizedCommand === "stop"
          ) {
            const message =
              "Voice assistant stopped, ma'am.";

            console.log(
              `🤖 JARVIS: ${message}`
            );

            await speak(message);

            console.log(
              "🔴 JARVIS terminated."
            );

            process.exit(0);
          }

          // =========================
          // INTENT DETECTION
          // =========================

          const intent =
            detectIntent(command);

          console.log(
            `🧭 Intent detected: ${intent}`
          );

          // =========================
          // AI REQUEST
          // =========================

          if (intent === "ai") {
            console.log(
              "🧠 JARVIS: Thinking..."
            );

            const aiResponse =
              await askAI(
                `You are JARVIS, an intelligent AI assistant.
Address the user as "ma'am".
Be helpful, concise, and polite.

User: ${command}`
              );

            console.log(
              `🤖 JARVIS: ${aiResponse}`
            );

            await speak(aiResponse);

            console.log(
              "────────────────────────────"
            );

            continue;
          }

          // =========================
          // COMMAND / MEMORY
          // =========================

          const response =
            await executeCommand(command);

          if (response !== false) {
            console.log(
              `🤖 JARVIS: ${response}`
            );

            await speak(response);

            console.log(
              "────────────────────────────"
            );

            continue;
          }

          // =========================
          // UNKNOWN COMMAND
          // =========================

          console.log(
            `🤖 JARVIS: I don't recognize "${command}", ma'am.`
          );

          await speak(
            "I don't recognize that command, ma'am."
          );

          console.log(
            "💡 Gemini was not called."
          );

          console.log(
            "────────────────────────────"
          );
        } catch (error) {
          console.error(
            "JARVIS Command Error:",
            error
          );

          console.log(
            "🔄 Staying in command mode..."
          );
        }
      }

      console.log(
        "😴 JARVIS: Returning to sleep mode..."
      );
    } catch (error) {
      console.error(
        "JARVIS Voice Error:",
        error
      );

      console.log(
        "🔄 Returning to wake-word mode..."
      );
    }
  }
}

startVoiceAssistant();