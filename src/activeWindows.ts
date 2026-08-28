import activeWindow from "active-win";


export async function getActiveWindow(): Promise<string> {
  try {
    const window = await activeWindow();

    if (!window) {
      return "I couldn't determine the active window, ma'am.";
    }

    const application = window.owner?.name || "Unknown application";
    const title = window.title || "Unknown window";

    return `You are currently using ${application}. The active window is "${title}", ma'am.`;
  } catch (error) {
    console.error("Active window error:", error);

    return "I couldn't determine the active window, ma'am.";
  }
}