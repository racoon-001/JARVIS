import loudness from "loudness";
import { exec } from "child_process";

export async function increaseVolume(): Promise<string> {
  try {
    const current = await loudness.getVolume();
    const newVolume = Math.min(current + 10, 100);

    await loudness.setVolume(newVolume);

    return ` Volume increased to ${newVolume}%, ma'am.`;
  } catch {
    return " I couldn't increase the volume, ma'am.";
  }
}

export async function decreaseVolume(): Promise<string> {
  try {
    const current = await loudness.getVolume();
    const newVolume = Math.max(current - 10, 0);

    await loudness.setVolume(newVolume);

    return ` Volume decreased to ${newVolume}%, ma'am.`;
  } catch {
    return " I couldn't decrease the volume, ma'am.";
  }
}

export async function muteVolume(): Promise<string> {
  try {
    const currentMute = await loudness.getMuted();

    await loudness.setMuted(!currentMute);

    return currentMute
      ? " System audio unmuted, ma'am."
      : " System audio muted, ma'am.";
  } catch {
    return " I couldn't change the mute state, ma'am.";
  }
}

export async function getVolume(): Promise<string> {
  try {
    const volume = await loudness.getVolume();
    const muted = await loudness.getMuted();

    if (muted) {
      return " The system is currently muted, ma'am.";
    }

    return ` Current system volume is ${volume}%, ma'am.`;
  } catch {
    return "I couldn't read the current volume, ma'am.";
  }
}
export function lockComputer(): Promise<string> {
  return new Promise((resolve) => {
    exec("rundll32.exe user32.dll,LockWorkStation", (error) => {
      if (error) {
        resolve(" I couldn't lock the computer, ma'am.");
        return;
      }

      resolve(" Locking your computer, ma'am.");
    });
  });
}