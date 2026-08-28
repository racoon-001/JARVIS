import { spawn, execFile } from "child_process";
import fs from "fs";

// ========================================
// COMMAND RECORDING
// ========================================

export function recordVoice(): Promise<string> {
  return recordAudio(5, "command");
}

// ========================================
// WAKE WORD RECORDING
// ========================================

export function recordWakeWord(): Promise<string> {
  return recordAudio(2, "wake");
}

// ========================================
// COMMON AUDIO RECORDER
// ========================================

function recordAudio(
  duration: number,
  type: "command" | "wake"
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (type === "wake") {
      console.log(
        "🎙️ JARVIS: Listening for wake word..."
      );
    } else {
      console.log(
        "🎙️ JARVIS: Listening, ma'am..."
      );
    }

    const outputFile = "voice-test.wav";

    const sox = spawn("sox", [
      "-t",
      "waveaudio",
      "default",
      "-c",
      "1",
      "-r",
      "16000",
      "-b",
      "16",
      "-e",
      "signed-integer",
      outputFile,
      "trim",
      "0",
      duration.toString(),
    ]);

    sox.on("error", (error) => {
      reject(error);
    });

    sox.on("close", (code) => {
      if (
        code === 0 &&
        fs.existsSync(outputFile)
      ) {
        console.log(
          "🎙️ JARVIS: Recording stopped."
        );

        console.log(
          `Saved recording as ${outputFile}`
        );

        resolve(outputFile);
      } else {
        reject(
          new Error(
            `SoX exited with code ${code}`
          )
        );
      }
    });
  });
}

// ========================================
// SILENCE DETECTION
// ========================================

export function hasAudio(
  audioFile: string
): Promise<boolean> {
  return new Promise((resolve) => {
    execFile(
      "sox",
      [
        audioFile,
        "-n",
        "stat",
      ],
      (error, _stdout, stderr) => {
        if (error && !stderr) {
          console.error(
            "Audio analysis error:",
            error.message
          );

          resolve(true);
          return;
        }

        // SoX writes "Maximum amplitude" to stderr
        const match = stderr.match(
          /Maximum amplitude:\s+([0-9.]+)/i
        );

        if (!match) {
          resolve(true);
          return;
        }

        const amplitude = Number(match[1]);

        console.log(
          `🔊 Audio amplitude: ${amplitude}`
        );

        // Very quiet recordings are treated as silence
        const SILENCE_THRESHOLD = 0.01;

        resolve(
          amplitude >= SILENCE_THRESHOLD
        );
      }
    );
  });
}