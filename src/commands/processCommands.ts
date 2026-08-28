import {
  getRunningProcesses,
  checkProcess,
} from "../processTools.js";

import { closeProcess } from "../processControl.js";

export async function executeProcessCommand(
  input: string
): Promise<string | false> {

  // =========================
  // NORMALIZE INPUT
  // =========================

  const text = input
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .trim();

  // =========================
  // RUNNING PROCESSES
  // =========================

  if (
    text.includes("running processes") ||
    text.includes("running applications") ||
    text.includes("what processes are running") ||
    text.includes("what applications are running") ||
    text.includes("which processes are running") ||
    text.includes("which applications are running") ||
    text.includes("show running processes") ||
    text.includes("show running applications") ||
    text.includes("show me the running processes") ||
    text.includes("show me running applications") ||
    text.includes("what is running") ||
    text.includes("what's running") ||
    text.includes("what apps are running") ||
    text.includes("what applications are open")
  ) {
    return await getRunningProcesses();
  }

  // =========================
  // CLOSE / TERMINATE PROCESS
  // =========================

  const closeMatch = text.match(
    /(?:close|stop|terminate|kill|end|shut down|exit)\s+(?:the\s+)?(.+)/
  );

  if (closeMatch) {
    const processName = closeMatch[1]
      .replace(/\s+(application|app|program|process)$/i, "")
      .trim();

    if (!processName) {
      return false;
    }

    console.log(
      `🧠 JARVIS: Closing ${processName}, ma'am...`
    );

    return await closeProcess(processName);
  }

  // =========================
  // CHECK PROCESS
  // =========================

  // Example:
  // "Is Chrome running?"
  // "Is Spotify open?"
  // "Check if Notepad is running."

  const processMatch = text.match(
    /^(?:is|check if|check whether|tell me if|see if)\s+(?:the\s+)?(.+?)\s+(?:running|open)$/
  );

  if (processMatch) {
    const processName = processMatch[1].trim();

    if (!processName) {
      return false;
    }

    return await checkProcess(processName);
  }

  // =========================
  // ALTERNATIVE CHECK FORMAT
  // =========================

  const alternativeCheckMatch = text.match(
    /^(?:is|check)\s+(?:the\s+)?(.+?)\s+(?:currently\s+)?(?:running|open)/
  );

  if (alternativeCheckMatch) {
    const processName =
      alternativeCheckMatch[1].trim();

    if (!processName) {
      return false;
    }

    return await checkProcess(processName);
  }

  // =========================
  // NOT A PROCESS COMMAND
  // =========================

  return false;
}