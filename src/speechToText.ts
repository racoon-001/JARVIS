import { execFile } from "child_process";
import path from "path";

const whisperPath = path.resolve(
  "whisper.cpp",
  "build",
  "bin",
  "Release",
  "whisper-cli.exe"
);

const modelPath = path.resolve(
  "whisper.cpp",
  "models",
  "ggml-base.en.bin"
);

export function speechToText(
  audioFile: string
): Promise<string> {
  return new Promise((resolve) => {
    execFile(
      whisperPath,
      [
        "-m",
        modelPath,

        // Audio file
        "-f",
        audioFile,

        // English only
        "-l",
        "en",

        // Don't print timestamps
        "-nt",

        // Don't print extra information
        "-np",

        // Use 4 CPU threads
        "-t",
        "4",

        // Reduce hallucinations on short/quiet audio
        "--no-speech-thold",
        "0.6",

        // Temperature settings
        "--temperature",
        "0",

        "--temperature-inc",
        "0.2",
      ],
      (error, stdout, stderr) => {
        if (error) {
          console.error(
            "━━━━━━━━ WHISPER ERROR ━━━━━━━━"
          );

          console.error(error.message);
          console.error(stderr);

          console.error(
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
          );

          resolve("");
          return;
        }

        const text = stdout
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .join(" ")
          .trim();

        resolve(text);
      }
    );
  });
}