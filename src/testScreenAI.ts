import { captureScreenshot } from "./screenshotTools.js";
import { askAIAboutImage } from "./ai.js";

async function testScreenAI() {
  console.log("📸 JARVIS: Capturing screen...");

  try {
    const imagePath = await captureScreenshot();

    console.log(`✅ Screenshot saved: ${imagePath}`);

    console.log("🧠 JARVIS: Sending screen to AI...");

    const response = await askAIAboutImage(
      imagePath,
      "What application or window is currently visible on my screen?"
    );

    console.log("🤖 JARVIS:", response);

  } catch (error) {
    console.error("❌ Screen AI test failed:", error);
  }
}

testScreenAI();