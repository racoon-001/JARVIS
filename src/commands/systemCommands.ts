 import {
  getSystemInfo,
} from "../systemTools.js";

import {
  muteVolume,
  increaseVolume,
  decreaseVolume,
  getVolume,
  lockComputer,
} from "../systemControl.js";

import { takeScreenshot } from "../screenshotTools.js";
import { getActiveWindow } from "../activeWindows.js";

export async function executeSystemCommand(
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
  // SYSTEM INFORMATION
  // =========================

  if (
    text.includes("system information") ||
    text.includes("system info") ||
    text.includes("computer information") ||
    text.includes("computer specs") ||
    text.includes("pc specs") ||
    text.includes("my computer specs") ||
    text.includes("show system details") ||
    text.includes("show computer details")
  ) {
    return getSystemInfo();
  }

  // =========================
  // VOLUME UP
  // =========================

  if (
    text.includes("increase volume") ||
    text.includes("volume up") ||
    text.includes("turn the volume up") ||
    text.includes("turn volume up") ||
    text.includes("make the volume louder") ||
    text.includes("make it louder") ||
    text.includes("raise the volume") ||
    text.includes("turn it up") ||
    text.includes("volume louder") ||
    text.includes("increase the sound") ||
    text.includes("make the sound louder")
  ) {
    return await increaseVolume();
  }

  // =========================
  // VOLUME DOWN
  // =========================

  if (
    text.includes("decrease volume") ||
    text.includes("volume down") ||
    text.includes("turn the volume down") ||
    text.includes("turn volume down") ||
    text.includes("make the volume lower") ||
    text.includes("make it quieter") ||
    text.includes("lower the volume") ||
    text.includes("turn it down") ||
    text.includes("decrease the sound") ||
    text.includes("make the sound lower")
  ) {
    return await decreaseVolume();
  }

  // =========================
  // MUTE
  // =========================

  if (
    text === "mute" ||
    text.includes("mute computer") ||
    text.includes("mute the computer") ||
    text.includes("mute my computer") ||
    text.includes("mute system") ||
    text.includes("mute the system") ||
    text.includes("mute my pc") ||
    text.includes("silence the computer") ||
    text.includes("silence my computer")
  ) {
    return await muteVolume();
  }

  // =========================
  // CURRENT VOLUME
  // =========================

  if (
    text.includes("what is the volume") ||
    text.includes("whats the volume") ||
    text.includes("current volume") ||
    text.includes("check volume") ||
    text.includes("what is my volume") ||
    text.includes("how loud is it") ||
    text.includes("how loud is my computer") ||
    text.includes("tell me the volume")
  ) {
    return await getVolume();
  }

  // =========================
  // LOCK COMPUTER
  // =========================

  if (
    text.includes("lock my computer") ||
    text.includes("lock the computer") ||
    text.includes("lock computer") ||
    text === "lock pc" ||
    text.includes("lock my pc") ||
    text.includes("lock this computer") ||
    text.includes("lock the pc")
  ) {
    return await lockComputer();
  }

  // =========================
  // SCREENSHOT
  // =========================

  if (
    text.includes("take a screenshot") ||
    text.includes("take screenshot") ||
    text.includes("capture my screen") ||
    text.includes("capture the screen") ||
    text.includes("capture screenshot") ||
    text.includes("take a screen capture") ||
    text.includes("capture my display") ||
    text.includes("take a picture of my screen")
  ) {
    return await takeScreenshot();
  }

  // =========================
  // NOT A SYSTEM COMMAND
  // =========================
// =========================
// ACTIVE WINDOW
// =========================

if (
  input.includes("active window") ||
  input.includes("current window") ||
  input.includes("what window am i using") ||
  input.includes("what application am i using") ||
  input.includes("what app am i using") ||
  input.includes("which application is open") ||
  input.includes("which app is open")
) {
  return await getActiveWindow();
}
  return false;
}