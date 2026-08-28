import { exec } from "child_process";

export function speak(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const command =
      'powershell -Command "Add-Type -AssemblyName System.Speech; ' +
      '$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; ' +
      '$speak.Speak($env:JARVIS_TEXT); ' +
      '$speak.Dispose()"';

    exec(
      command,
      {
        env: {
          ...process.env,
          JARVIS_TEXT: text,
        },
      },
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      }
    );
  });
}