import screenshot from "screenshot-desktop";
import path from "path";
import os from "os";

// =========================
// TAKE SCREENSHOT
// =========================

export async function takeScreenshot(): Promise<string> {
  try {
    const filePath = await captureScreenshot();

    return `Screenshot captured successfully, ma'am.\nSaved to: ${filePath}`;
  } catch (error) {
    console.error("Screenshot error:", error);

    return "I couldn't capture the screenshot, ma'am.";
  }
}

// =========================
// CAPTURE SCREENSHOT
// =========================

export async function captureScreenshot(): Promise<string> {
  const picturesFolder = path.join(
    os.homedir(),
    "Pictures"
  );

  const fileName = `jarvis-screenshot-${Date.now()}.png`;

  const filePath = path.join(
    picturesFolder,
    fileName
  );

  await screenshot({
    filename: filePath,
  });

  return filePath;
}