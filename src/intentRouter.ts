
export type Intent =
  | "command"
  | "memory"
  | "ai";

export function detectIntent(input: string): Intent {
  let text = input.toLowerCase().trim();

  // =========================
  // REMOVE JARVIS
  // =========================

  text = text
    .replace(/^jarvis[\s,.:;-]*/i, "")
    .trim();

  // Handle Whisper misrecognition
  text = text
    .replace(/^java['’]?s[\s,.:;-]*/i, "")
    .trim();

  // Remove polite prefixes
  text = text
    .replace(
      /^(please|could you|can you|would you|will you)\s+/i,
      ""
    )
    .trim();

  // =========================
  // MEMORY
  // =========================

  if (
  text.startsWith("remember ") ||
  text.startsWith("forget ") ||
  text.startsWith("what is my ") ||
  text.startsWith("what's my ") ||
  text.startsWith("tell me my ") ||
  (text.startsWith("my ") && text.includes(" is "))
) {
  return "memory";
}

  // =========================
  // KNOWN LOCAL COMMANDS
  // =========================

  const commandPatterns = [
    // Apps
    "open chrome",
    "launch chrome",
    "start chrome",
    "open browser",
    "open my browser",

    "open notepad",
    "launch notepad",
    "start notepad",

    "open calculator",
    "launch calculator",
    "start calculator",

    "open file explorer",
    "open explorer",
    "open my files",
    "delete file",
"remove file",

    "open youtube",
    "launch youtube",
    "start youtube",

    "open google",
    "launch google",
    "start google",

    "open github",
    "launch github",
    "start github",

    // System
    "increase volume",
    "decrease volume",
    "volume up",
    "volume down",
    "turn the volume up",
    "turn the volume down",
    "make it louder",
    "make it quieter",
    "mute",
    "check volume",
    "current volume",

    "system information",
    "system info",
    "computer information",
    "computer specs",

    "lock computer",
    "lock my computer",
    "lock pc",

    "take screenshot",
    "take a screenshot",
    "capture my screen",
    "capture the screen",

    // Processes
    "running processes",
    "running applications",
    "what processes are running",
    "what applications are running",
  ];

  for (const pattern of commandPatterns) {
    if (text.includes(pattern)) {
      return "command";
    }
  }

  // =========================
  // PROCESS COMMANDS
  // =========================

  if (
    text.includes("close ") ||
    text.includes("stop ") ||
    text.includes("terminate ") ||
    text.includes("kill ")
  ) {
    return "command";
  }

  if (
    text.includes("is ") &&
    (
      text.includes(" running") ||
      text.includes(" open")
    )
  ) {
    return "command";
  }

  // =========================
  // ACTIVE WINDOW / CONTEXT
  // =========================

  if (
    text.includes("active window") ||
    text.includes("current window") ||
    text.includes("what window am i using") ||
    text.includes("what application am i using") ||
    text.includes("what app am i using") ||
    text.includes("which application is open") ||
    text.includes("which app is open")
  ) {
    return "command";
  }

  // =========================
  // SCREEN AWARENESS
  // =========================

  if (
    text.includes("what am i looking at") ||
    text.includes("what is on my screen") ||
    text.includes("what's on my screen") ||
    text.includes("look at my screen") ||
    text.includes("analyze my screen") ||
    text.includes("analyze the screen") ||
    text.includes("what do you see on my screen") ||
    text.includes("what can you see on my screen")
  ) {
    return "command";
  }

  // =========================
  // WORKSPACE / FILE CONTEXT
  // =========================

  if (
    text.includes("what workspace am i in") ||
    text.includes("what workspace am i working in") ||
    text.includes("current workspace") ||
    text.includes("current folder") ||
    text.includes("what folder am i in") ||
    text.includes("which folder am i in") ||
    text.includes("show files") ||
    text.includes("list files") ||
    text.includes("files in this folder") ||
    text.includes("what files are here") ||
    text.includes("show me the files") ||
    text.includes("open file")
  ) {
    return "command";
  }

  // =========================
  // AI / GENERAL QUESTIONS
  // =========================

  if (
    text.startsWith("what is ") ||
    text.startsWith("what are ") ||
    text.startsWith("why ") ||
    text.startsWith("how ") ||
    text.startsWith("who ") ||
    text.startsWith("when ") ||
    text.startsWith("where ") ||
    text.startsWith("explain ") ||
    text.startsWith("tell me about ")
  ) {
    return "ai";
  }

  // =========================
  // QUESTION MARK
  // =========================

  if (text.endsWith("?")) {
    return "ai";
  }

  // =========================
  // DEFAULT
  // =========================

  return "command";
}

