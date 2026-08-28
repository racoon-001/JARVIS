import os from "os";
import loudness from "loudness";

export async function increaseVolume(): Promise<string> {
  try {
    const current = await loudness.getVolume();
    const newVolume = Math.min(current + 10, 100);

    await loudness.setVolume(newVolume);

    return `JARVIS: Volume increased to ${newVolume}%, ma'am.`;
  } catch (error) {
    return "JARVIS: I couldn't increase the volume, ma'am.";
  }
}

export async function decreaseVolume(): Promise<string> {
  try {
    const current = await loudness.getVolume();
    const newVolume = Math.max(current - 10, 0);

    await loudness.setVolume(newVolume);

    return `JARVIS: Volume decreased to ${newVolume}%, ma'am.`;
  } catch (error) {
    return "JARVIS: I couldn't decrease the volume, ma'am.";
  }
}

export async function muteVolume(): Promise<string> {
  try {
    const currentMute = await loudness.getMuted();

    await loudness.setMuted(!currentMute);

    return currentMute
      ? "JARVIS: System audio unmuted, ma'am."
      : "JARVIS: System audio muted, ma'am.";
  } catch (error) {
    return "JARVIS: I couldn't change the mute state, ma'am.";
  }
}

export async function getVolume(): Promise<string> {
  try {
    const volume = await loudness.getVolume();
    const muted = await loudness.getMuted();

    if (muted) {
      return "JARVIS: The system is currently muted, ma'am.";
    }

    return `JARVIS: Current system volume is ${volume}%, ma'am.`;
  } catch (error) {
    return "JARVIS: I couldn't read the current volume, ma'am.";
  }
}

// SYSTEM INFORMATION
export function getSystemInfo(): string {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  const totalGB = (totalMemory / 1024 ** 3).toFixed(2);
  const freeGB = (freeMemory / 1024 ** 3).toFixed(2);

  const cpu = os.cpus()[0]?.model ?? "Unknown CPU";

  return `JARVIS: System information, ma'am.
Operating System: ${os.platform()} ${os.arch()}
CPU: ${cpu}
CPU Cores: ${os.cpus().length}
Total RAM: ${totalGB} GB
Free RAM: ${freeGB} GB
Hostname: ${os.hostname()}`;
}