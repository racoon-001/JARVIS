import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =========================
// TEXT AI
// =========================

export async function askAI(
  prompt: string
): Promise<string> {

  try {
    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

    return (
      response.text?.trim() ||
      "I couldn't generate a response."
    );

  } catch (error) {

    console.error("AI Error:", error);

    return "I'm having trouble connecting to my AI system, ma'am.";
  }
}

// =========================
// SCREEN / IMAGE AI
// =========================

export async function askAIAboutImage(
  imagePath: string,
  prompt: string
): Promise<string> {

  try {

    if (!fs.existsSync(imagePath)) {
      return "I couldn't find the screenshot, ma'am.";
    }

    const imageBuffer =
      fs.readFileSync(imagePath);

    const base64Image =
      imageBuffer.toString("base64");

    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash",

        contents: [
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Image,
            },
          },

          {
            text: `
You are JARVIS, an intelligent desktop AI assistant.

Address the user as "ma'am".

Analyze the screenshot carefully and answer the user's question based ONLY on what is visible in the image.

Be concise and helpful.

User's question:
${prompt}
            `.trim(),
          },
        ],
      });

    return (
      response.text?.trim() ||
      "I couldn't understand what is on the screen, ma'am."
    );

  } catch (error) {

    console.error(
      "AI Vision Error:",
      error
    );

    return "I'm having trouble analyzing the screen, ma'am.";
  }
}