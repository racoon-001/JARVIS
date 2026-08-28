import { exec } from "child_process";

export function executeAppCommand(
  input: string
): string | false {

  // =========================
  // NORMALIZE INPUT
  // =========================

  const text = input
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .trim();

  // =========================
  // NOTEPAD
  // =========================

  if (
    text.includes("notepad") &&
    (
      text.includes("open") ||
      text.includes("launch") ||
      text.includes("start") ||
      text.includes("run") ||
      text.includes("get")
    )
  ) {
    exec("notepad");
    return "Notepad is open, ma'am.";
  }

  // =========================
  // CALCULATOR
  // =========================

  if (
    text.includes("calculator") &&
    (
      text.includes("open") ||
      text.includes("launch") ||
      text.includes("start") ||
      text.includes("run") ||
      text.includes("get")
    )
  ) {
    exec("calc");
    return "Calculator is open, ma'am.";
  }

  // =========================
  // CHROME / BROWSER
  // =========================

  const chromeMentioned =
    text.includes("chrome") ||
    text.includes("browser");

  const openAction =
    text.includes("open") ||
    text.includes("launch") ||
    text.includes("start") ||
    text.includes("run") ||
    text.includes("get") ||
    text.includes("bring");

  if (chromeMentioned && openAction) {
    exec("start chrome");
    return "Chrome is open, ma'am.";
  }

  // =========================
  // FILE EXPLORER
  // =========================

  const explorerMentioned =
    text.includes("file explorer") ||
    text.includes("explorer") ||
    text.includes("my files") ||
    text.includes("files");

  if (explorerMentioned && openAction) {
    exec("explorer");
    return "File Explorer is open, ma'am.";
  }

  // =========================
  // YOUTUBE
  // =========================

  if (
    text.includes("youtube") &&
    openAction
  ) {
    exec("start https://www.youtube.com");
    return "YouTube is open, ma'am.";
  }

  // =========================
  // GOOGLE
  // =========================

  if (
    text.includes("google") &&
    openAction
  ) {
    exec("start https://www.google.com");
    return "Google is open, ma'am.";
  }

  // =========================
  // GITHUB
  // =========================

  if (
    text.includes("github") &&
    openAction
  ) {
    exec("start https://github.com");
    return "GitHub is open, ma'am.";
  }

  // =========================
  // UNKNOWN APP COMMAND
  // =========================

  return false;
}