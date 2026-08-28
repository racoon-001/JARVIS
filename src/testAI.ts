import { askAI } from "./ai.js";

async function test() {
  const response = await askAI(
    "In one short sentence, explain what a CPU does."
  );

  console.log("JARVIS:", response);
}

test();