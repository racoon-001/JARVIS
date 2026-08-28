import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";


// =========================
// VOICE NAME NORMALIZATION
// =========================

function normalizeVoiceName(name: string): string {
  return name
    .trim()
    .toLowerCase()

    // Spoken punctuation
    .replace(/\bfull stop\b/g, ".")
    .replace(/\bdot\b/g, ".")
    .replace(/\bperiod\b/g, ".")
    .replace(/\bcomma\b/g, ",")
    .replace(/\bhyphen\b/g, "-")
    .replace(/\bdash\b/g, "-")
    .replace(/\bunderscore\b/g, "_")

    // Remove spaces around punctuation
    .replace(/\s*\.\s*/g, ".")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s*_\s*/g, "_")

    // Normalize spaces
    .replace(/\s+/g, " ")

    // Remove trailing punctuation
    .replace(/[.,!?]+$/, "")
    .trim();
}
// =========================
// OPEN COMMON FOLDERS
// =========================

export function handleFileCommand(command: string): boolean {
  const input = command.toLowerCase().trim();

  // =========================
  // OPEN DOWNLOADS
  // =========================

  if (
    input.includes("open downloads") ||
    input.includes("open my downloads")
  ) {
    exec("explorer %USERPROFILE%\\Downloads");
    console.log("JARVIS: Opening Downloads, ma'am.");
    return true;
  }

  // =========================
  // OPEN DOCUMENTS
  // =========================

  if (
    input.includes("open documents") ||
    input.includes("open my documents")
  ) {
    exec("explorer %USERPROFILE%\\Documents");
    console.log("JARVIS: Opening Documents, ma'am.");
    return true;
  }

  // =========================
  // OPEN DESKTOP
  // =========================

  if (
    input.includes("open desktop") ||
    input.includes("open my desktop")
  ) {
    exec("explorer %USERPROFILE%\\Desktop");
    console.log("JARVIS: Opening Desktop, ma'am.");
    return true;
  }

  // =========================
  // CREATE FOLDER
  // =========================

  const createFolderMatch = input.match(
    /create (?:a )?folder (?:called|named) (.+)/
  );

  if (createFolderMatch) {
    const folderName = createFolderMatch[1]
      .trim()
      .replace(/[.,!?]+$/, "");

    const folderPath = path.join(
      process.cwd(),
      folderName
    );

    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);

        console.log(
          `JARVIS: Folder "${folderName}" created, ma'am.`
        );
      } else {
        console.log(
          `JARVIS: That folder already exists, ma'am.`
        );
      }
    } catch (error) {
      console.error("Create folder error:", error);

      console.log(
        `JARVIS: I couldn't create that folder, ma'am.`
      );
    }

    return true;
  }

  // =========================
  // CREATE FILE
  // =========================

  const createFileMatch = input.match(
    /create (?:a )?file (?:called|named) (.+)/
  );

  if (createFileMatch) {
    const fileName = createFileMatch[1]
      .trim()
      .replace(/[.,!?]+$/, "");

    const filePath = path.join(
      process.cwd(),
      fileName
    );

    try {
      if (fs.existsSync(filePath)) {
        console.log(
          `JARVIS: The file "${fileName}" already exists, ma'am.`
        );
      } else {
        fs.writeFileSync(filePath, "");

        console.log(
          `JARVIS: File "${fileName}" created, ma'am.`
        );
      }
    } catch (error) {
      console.error("Create file error:", error);

      console.log(
        `JARVIS: I couldn't create "${fileName}", ma'am.`
      );
    }

    return true;
  }

  // =========================
  // RENAME FILE / FOLDER
  // =========================

  const renameMatch = input.match(
    /rename (.+?) to (.+)/
  );

  if (renameMatch) {
    const oldName = normalizeVoiceName(
  renameMatch[1]
);

const newName = normalizeVoiceName(
  renameMatch[2]
);

    const oldPath = path.isAbsolute(oldName)
      ? oldName
      : path.join(process.cwd(), oldName);

    const newPath = path.join(
      path.dirname(oldPath),
      newName
    );

    try {
      if (!fs.existsSync(oldPath)) {
        console.log(
          `JARVIS: I couldn't find "${oldName}", ma'am.`
        );

        return true;
      }

      if (fs.existsSync(newPath)) {
        console.log(
          `JARVIS: "${newName}" already exists, ma'am.`
        );

        return true;
      }

      fs.renameSync(oldPath, newPath);

      console.log(
        `JARVIS: Renamed "${oldName}" to "${newName}", ma'am.`
      );
    } catch (error) {
      console.error("Rename error:", error);

      console.log(
        `JARVIS: I couldn't rename that item, ma'am.`
      );
    }

    return true;
  }

  // =========================
  // COPY FILE
  // =========================

  const copyMatch = input.match(
    /copy (.+?) to (.+)/
  );

  if (copyMatch) {
    const sourceName = normalizeVoiceName(
  copyMatch[1]
);

const destinationName = normalizeVoiceName(
  copyMatch[2]
);

    const sourcePath = path.isAbsolute(sourceName)
      ? sourceName
      : path.join(process.cwd(), sourceName);

    let destinationPath = path.isAbsolute(
      destinationName
    )
      ? destinationName
      : path.join(process.cwd(), destinationName);

    try {
      if (!fs.existsSync(sourcePath)) {
        console.log(
          `JARVIS: I couldn't find "${sourceName}", ma'am.`
        );

        return true;
      }

      // If destination is a folder,
      // keep the original filename.
      if (fs.existsSync(destinationPath)) {
        const stats = fs.statSync(destinationPath);

        if (stats.isDirectory()) {
          destinationPath = path.join(
            destinationPath,
            path.basename(sourcePath)
          );
        }
      }

      fs.copyFileSync(
        sourcePath,
        destinationPath
      );

      console.log(
        `JARVIS: Copied "${sourceName}" successfully, ma'am.`
      );
    } catch (error) {
      console.error("Copy error:", error);

      console.log(
        `JARVIS: I couldn't copy that file, ma'am.`
      );
    }

    return true;
  }

  // =========================
  // SEARCH FOR FILE
  // =========================

  const searchMatch = input.match(
    /(?:find|search for|look for|locate) (?:my )?(.+)/
  );

  if (searchMatch) {
    const searchTerm = searchMatch[1]
      .trim()
      .replace(/[.,!?]+$/, "")
      .toLowerCase();

    console.log(
      `JARVIS: Searching for "${searchTerm}", ma'am...`
    );

    const results = searchForFiles(searchTerm);

    if (results.length > 0) {
      console.log(
        `JARVIS: I found ${results.length} result(s), ma'am:`
      );

      results.forEach((result) => {
        console.log(`📄 ${result}`);
      });
    } else {
      console.log(
        `JARVIS: I couldn't find anything matching "${searchTerm}", ma'am.`
      );
    }

    return true;
  }

  return false;
}

// =========================
// FIND FOLDER
// =========================

export function findFolder(
  folderName: string
): string | null {

  const home = os.homedir();

  const locations = [
    process.cwd(),
    path.join(home, "Desktop"),
    path.join(home, "Documents"),
    path.join(home, "Downloads"),
  ];

  const normalizedTarget = folderName
    .toLowerCase()
    .replace(/[.,!?-]+/g, "")
    .replace(/\s+/g, "");

  for (const location of locations) {

    if (!fs.existsSync(location)) {
      continue;
    }

    try {
      const items = fs.readdirSync(location);

      for (const item of items) {

        const fullPath = path.join(
          location,
          item
        );

        try {
          if (
            !fs.statSync(fullPath).isDirectory()
          ) {
            continue;
          }

          const normalizedItem = item
            .toLowerCase()
            .replace(/[.,!?-]+/g, "")
            .replace(/\s+/g, "");

          if (
            normalizedItem === normalizedTarget
          ) {
            return fullPath;
          }

        } catch {
          // Ignore inaccessible folders
        }
      }

    } catch {
      // Ignore inaccessible directories
    }
  }

  return null;
}

// =========================
// SEARCH FILES
// =========================

export function searchForFiles(
  searchTerm: string
): string[] {

  const home = os.homedir();

  const locations = [
    path.join(home, "Desktop"),
    path.join(home, "Documents"),
    path.join(home, "Downloads"),
    path.join(home, "Pictures"),
    path.join(home, "Videos"),
    path.join(home, "Music"),

    path.join(home, "OneDrive"),
    path.join(home, "OneDrive", "Desktop"),
    path.join(home, "OneDrive", "Documents"),
    path.join(home, "OneDrive", "Pictures"),
    path.join(home, "OneDrive", "Downloads"),
  ];

  const results: string[] = [];

  const MAX_RESULTS = 10;
  const MAX_DEPTH = 8;

  const normalizedSearchTerm = searchTerm
  .toLowerCase()
  .replace(/[.,!?]+/g, "")
  .replace(/\s+/g, "")
  .trim();

  function searchDirectory(
    directory: string,
    depth: number
  ) {

    if (depth > MAX_DEPTH) {
      return;
    }

    if (results.length >= MAX_RESULTS) {
      return;
    }

    try {
      const items = fs.readdirSync(
        directory
      );

      for (const item of items) {

        if (results.length >= MAX_RESULTS) {
          break;
        }

        const fullPath = path.join(
          directory,
          item
        );

        try {
          const stats = fs.statSync(
            fullPath
          );

          const normalizedItem = item
  .toLowerCase()
  .replace(/[.,!?]+/g, "")
  .replace(/\s+/g, "");

          if (
            stats.isFile() &&
            normalizedItem.includes(
              normalizedSearchTerm
            )
          ) {
            results.push(fullPath);
          }

          if (stats.isDirectory()) {
            searchDirectory(
              fullPath,
              depth + 1
            );
          }

        } catch {
          // Ignore inaccessible files
        }
      }

    } catch {
      // Ignore inaccessible directories
    }
  }

  for (const location of locations) {

    if (fs.existsSync(location)) {
      searchDirectory(location, 0);
    }

    if (results.length >= MAX_RESULTS) {
      break;
    }
  }

  return results;
}

// =========================
// LIST DIRECTORY
// =========================

export function listDirectory(
  directoryPath: string
): string {

  try {

    if (!fs.existsSync(directoryPath)) {
      return `I couldn't find that folder, ma'am.`;
    }

    const items = fs.readdirSync(
      directoryPath
    );

    if (items.length === 0) {
      return `The folder is empty, ma'am.`;
    }

    const files = items.filter(
      (item) => {
        try {
          return fs.statSync(
            path.join(
              directoryPath,
              item
            )
          ).isFile();

        } catch {
          return false;
        }
      }
    );

    const folders = items.filter(
      (item) => {
        try {
          return fs.statSync(
            path.join(
              directoryPath,
              item
            )
          ).isDirectory();

        } catch {
          return false;
        }
      }
    );

    let response =
      `Folder contents, ma'am:\n`;

    if (folders.length > 0) {

      response +=
        `\n📁 Folders:\n`;

      folders.forEach(
        (folder) => {
          response +=
            `- ${folder}\n`;
        }
      );
    }

    if (files.length > 0) {

      response +=
        `\n📄 Files:\n`;

      files.forEach(
        (file) => {
          response +=
            `- ${file}\n`;
        }
      );
    }

    return response.trim();

  } catch (error) {

    console.error(
      "Directory listing error:",
      error
    );

    return `I couldn't read that folder, ma'am.`;
  }
}

// =========================
// OPEN FILE
// =========================

export function openFile(
  filePath: string
): string {

  try {

    if (!fs.existsSync(filePath)) {
      return `I couldn't find ${filePath}, ma'am.`;
    }

    const codeExtensions = [
      ".ts",
      ".js",
      ".tsx",
      ".jsx",
      ".json",
      ".html",
      ".css",
      ".md",
      ".py",
      ".java",
      ".cpp",
      ".c",
    ];

    const extension =
      path.extname(
        filePath
      ).toLowerCase();

    if (
      codeExtensions.includes(
        extension
      )
    ) {
      exec(
        `code "${filePath}"`
      );

    } else {
      exec(
        `start "" "${filePath}"`
      );
    }

    return `Opening ${path.basename(filePath)}, ma'am.`;

  } catch (error) {

    console.error(
      "Open file error:",
      error
    );

    return `I couldn't open that file, ma'am.`;
  }
}

// =========================
// MOVE FILE / FOLDER
// =========================

export function moveFile(
  sourcePath: string,
  destinationPath: string
): string {

  try {

    // Check source
    if (!fs.existsSync(sourcePath)) {
      return `I couldn't find ${sourcePath}, ma'am.`;
    }

    // Destination must exist
    if (!fs.existsSync(destinationPath)) {
      return `I couldn't find the destination folder ${destinationPath}, ma'am.`;
    }

    const destinationStats =
      fs.statSync(
        destinationPath
      );

    // Destination must be a folder
    if (!destinationStats.isDirectory()) {
      return `${destinationPath} is not a folder, ma'am.`;
    }

    const finalPath = path.join(
      destinationPath,
      path.basename(sourcePath)
    );

    // Prevent accidental overwrite
    if (fs.existsSync(finalPath)) {
      return `${path.basename(sourcePath)} already exists there, ma'am.`;
    }

    console.log(
      `📦 JARVIS: Moving ${sourcePath} → ${finalPath}`
    );

    fs.renameSync(
      sourcePath,
      finalPath
    );

    // Verify destination
    if (!fs.existsSync(finalPath)) {
      return `The move did not complete successfully, ma'am.`;
    }

    // Verify source is gone
    if (fs.existsSync(sourcePath)) {
      return `The move could not be completed, ma'am.`;
    }

    return `Moved ${path.basename(sourcePath)} successfully, ma'am.`;

  } catch (error) {

    console.error(
      "Move error:",
      error
    );

    return `I couldn't move ${path.basename(sourcePath)}, ma'am.`;
  }
}

// =========================
// CURRENT WORKING DIRECTORY
// =========================

export function getCurrentWorkspace(): string {

  const currentDirectory =
    process.cwd();

  return `The current JARVIS workspace is ${currentDirectory}, ma'am.`;
}

// =========================
// DELETE FILE / FOLDER
// =========================

export function deleteFile(
  filePath: string
): string {

  try {

    if (!fs.existsSync(filePath)) {
      return `I couldn't find ${filePath}, ma'am.`;
    }

    const stats =
      fs.statSync(filePath);

    if (stats.isDirectory()) {
      return `That is a folder. I won't delete folders without explicit folder deletion support, ma'am.`;
    }

    fs.unlinkSync(
      filePath
    );

    // Verify deletion
    if (fs.existsSync(filePath)) {
      return `The file could not be deleted, ma'am.`;
    }

    return `Deleted ${path.basename(filePath)}, ma'am.`;

  } catch (error) {

    console.error(
      "Delete error:",
      error
    );

    return `I couldn't delete that file, ma'am.`;
  }
}

