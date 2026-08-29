import path from "path";

import { executeAppCommand } from "./commands/appCommands.js";
import { executeSystemCommand } from "./commands/systemCommands.js";
import { executeProcessCommand } from "./commands/processCommands.js";
import { executeMemoryCommand } from "./commands/memoryCommands.js";
import {
  getCurrentWorkspace,
  listDirectory,
  searchForFiles,
  openFile,
  handleFileCommand,
  deleteFile,
  moveFile,
  findFolder,
} from "./fileTools.js";
import { captureScreenshot } from "./screenshotTools.js";
import { askAI, askAIAboutImage } from "./ai.js";
// =========================
// DELETE CONFIRMATION STATE
// =========================




// =========================

// =========================

let pendingDeletePath: string | null = null;
export async function executeCommand(
  command: string
): Promise<string | false> {

  // =========================
  // NORMALIZE INPUT
  // =========================

  let input = command.toLowerCase().trim();

  // Remove JARVIS from beginning
  input = input
    .replace(/^jarvis[\s,.:;-]*/i, "")
    .trim();

  // Handle Whisper misrecognition:
  // "Jarvis" → "Java's"
  input = input
    .replace(/^java['’]?s[\s,.:;-]*/i, "")
    .trim();

  // Remove common polite prefixes
  input = input
    .replace(
      /^(please|could you|can you)\s+/i,
      ""
    )
    .trim();
// =========================
// DELETE CONFIRMATION
// =========================
console.log(
  `🧪 DEBUG pendingDeletePath: ${pendingDeletePath}`
);

  // =========================
// DELETE CONFIRMATION
// =========================

if (pendingDeletePath !== null) {

  const confirmationInput = input
    .replace(/[!?.,]+$/, "")
    .trim();

  console.log(
    `🧪 DEBUG confirmationInput: ${confirmationInput}`
  );

  if (
    confirmationInput === "yes" ||
    confirmationInput === "yes please" ||
    confirmationInput === "confirm" ||
    confirmationInput === "delete it" ||
    confirmationInput === "go ahead"
  ) {
    const filePath = pendingDeletePath;

    pendingDeletePath = null;

    return deleteFile(filePath);
  }

  if (
    confirmationInput === "no" ||
    confirmationInput === "no thanks" ||
    confirmationInput === "cancel"
  ) {
    pendingDeletePath = null;

    return "Deletion cancelled, ma'am.";
  }
}
  // =========================
  // APP COMMANDS
  // =========================

  const appResult = executeAppCommand(input);

  if (appResult !== false) {
    return appResult;
  }

  // =========================
  // SYSTEM COMMANDS
  // =========================

  const systemResult =
    await executeSystemCommand(input);

  if (systemResult !== false) {
    return systemResult;
  }

  // =========================
  // PROCESS COMMANDS
  // =========================

  const processResult =
    await executeProcessCommand(input);

  if (processResult !== false) {
    return processResult;
  }

  // =========================
  

  // =========================

// =========================

// =========================

// =========================


// =========================

// =========================

// =========================
// SAFE DELETE REQUEST
// =========================

if (
  input.startsWith("delete file ") ||
  input.startsWith("remove file ")
) {
  const fileName = input
  .replace(/^(delete|remove) file\s+/, "")
  .trim();

  console.log(
    `🔎 JARVIS: Searching for ${fileName}, ma'am...`
  );

  const results = searchForFiles(fileName);

  if (results.length === 0) {
    return `I couldn't find ${fileName}, ma'am.`;
  }

  if (results.length > 1) {
    return `I found multiple files matching ${fileName}. Please be more specific, ma'am.`;
  }

  pendingDeletePath = results[0];

  return `I found ${fileName}. Are you sure you want me to delete it, ma'am?`;
}



// =========================
// MOVE FILE / FOLDER
// =========================

const moveMatch = input.match(
  /^move (?:file )?(.+?) to (.+)$/
);

if (moveMatch) {
  const sourceName = moveMatch[1]
  .trim()
  .replace(/\s+\./g, ".")
  .replace(/\s+/g, " ");

const destinationName = moveMatch[2]
  .trim()
  .replace(/[.,!?]+$/, "");

  console.log(
    `🔎 JARVIS: Searching for ${sourceName}, ma'am...`
  );

  const sourceResults = searchForFiles(sourceName);

  if (sourceResults.length === 0) {
    return `I couldn't find ${sourceName}, ma'am.`;
  }

  if (sourceResults.length > 1) {
    return `I found multiple files matching ${sourceName}. Please be more specific, ma'am.`;
  }

  const sourcePath = sourceResults[0];

  // =========================
  // FIND DESTINATION
  // =========================

  let destinationPath = destinationName;

if (!path.isAbsolute(destinationPath)) {

  const foundFolder = findFolder(destinationName);

  if (foundFolder) {
    destinationPath = foundFolder;
  } else {
    destinationPath = path.join(
      process.cwd(),
      destinationName
    );
  }
}

  console.log(
    `📦 JARVIS: Moving ${sourcePath} → ${destinationPath}`
  );

  return moveFile(
    sourcePath,
    destinationPath
  );
}
  // =========================
// MEMORY COMMANDS
  // =========================

  const memoryResult =
    await executeMemoryCommand(input);

  if (memoryResult !== false) {
    return memoryResult;
  }
  // =========================
// FILE COMMANDS
// =========================

const fileResult = handleFileCommand(input);

if (fileResult) {
  return "File operation completed, ma'am.";
}
  // =========================
// =========================
// WORKSPACE AWARENESS
// =========================

if (
  input.includes("what workspace am i in") ||
  input.includes("what workspace am i working in") ||
  input.includes("current workspace") ||
  input.includes("current folder") ||
  input.includes("what folder am i in") ||
  input.includes("which folder am i in")
) {
  return getCurrentWorkspace();
}

// =========================
// FILE AWARENESS
// =========================

if (
  input.includes("show files") ||
  input.includes("list files") ||
  input.includes("files in this folder") ||
  input.includes("what files are here") ||
  input.includes("show me the files")
) {
  return listDirectory(process.cwd());
}

// =========================
// OPEN FILE
// =========================

const openFileMatch = input.match(
  /^open (?:the )?file (.+)$/
);

if (openFileMatch) {
  const fileName = openFileMatch[1]
    .trim()
    .replace(/[?.!]$/, "");

  console.log(
    `🔎 JARVIS: Searching for ${fileName}, ma'am...`
  );

  const results = searchForFiles(fileName);

  if (results.length === 0) {
    return `I couldn't find ${fileName}, ma'am.`;
  }

  console.log(`📄 Found: ${results[0]}`);

  return openFile(results[0]);
}
// =========================
// SCREEN AWARENESS
// =========================

if (
  input.includes("what am i looking at") ||
  input.includes("what is on my screen") ||
  input.includes("what's on my screen") ||
  input.includes("look at my screen") ||
  input.includes("analyze my screen") ||
  input.includes("analyze the screen")
) {
  console.log("📸 JARVIS: Capturing screen, ma'am...");

  try {
    const imagePath = await captureScreenshot();

    console.log(
      "🧠 JARVIS: Sending screenshot to AI..."
    );

    return await askAIAboutImage(
      imagePath,
      input
    );

  } catch (error) {
    console.error(
      "Screen awareness error:",
      error
    );

    return "I couldn't analyze your screen, ma'am.";
  }
}
    // =========================
  // AI FALLBACK
  // =========================

  console.log("🤖 JARVIS: Thinking, ma'am...");

  return await askAI(input);
}