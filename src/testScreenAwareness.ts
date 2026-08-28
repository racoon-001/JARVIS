import { captureScreenshot } from "./screenshotTools.js";
import fs from "fs";

async function test() {
  console.log("📸 JARVIS: Capturing screen...");

  try {
    const filePath = await captureScreenshot();

    console.log("✅ Screenshot captured!");
    console.log(`📁 Location: ${filePath}`);

    if (fs.existsSync(filePath)) {
      console.log("✅ File verified successfully.");
    } else {
      console.log("❌ Screenshot file was not found.");
    }
  } catch (error) {
    console.error("❌ Screen awareness test failed:");
    console.error(error);
  }
}

test();