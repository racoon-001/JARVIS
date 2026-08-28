import { exec } from "child_process";

const applicationMap: Record<string, string> = {
  chrome: "chrome.exe",
  "google chrome": "chrome.exe",

  notepad: "notepad.exe",

  calculator: "CalculatorApp.exe",
  calc: "CalculatorApp.exe",

  "file explorer": "explorer.exe",
  explorer: "explorer.exe",

  vscode: "Code.exe",
  "vs code": "Code.exe",

  spotify: "Spotify.exe",

  discord: "Discord.exe",
};

export function closeProcess(
  applicationName: string
): Promise<string> {
  return new Promise((resolve) => {
    const key = applicationName.toLowerCase().trim();
    const processName = applicationMap[key];

    if (!processName) {
      resolve(
        ` I don't have a process mapping for "${applicationName}", ma'am.`
      );
      return;
    }

    // Protect Windows Explorer
    if (processName === "explorer.exe") {
      resolve(
        " I won't terminate Windows Explorer directly because it is a critical Windows process, ma'am."
      );
      return;
    }

    exec(
      `taskkill /IM "${processName}" /T /F`,
      (error, stdout, stderr) => {
        if (error) {
          console.log("Windows error:", stderr);

          resolve(
            ` I couldn't close ${applicationName}, ma'am.`
          );
          return;
        }

        resolve(
          ` ${applicationName} has been closed, ma'am.`
        );
      }
    );
  });
}