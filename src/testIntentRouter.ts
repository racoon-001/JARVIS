import { detectIntent } from "./intentRouter.js";

const tests = [
  "Remember my favorite color is blue",
  "Please remember my favorite editor is VS Code",
  "What is my favorite color?",
  "Tell me my favorite editor",
  "Forget my favorite color",
  "Open calculator",
  "Launch Chrome",
  "Take a screenshot",
  "What is a CPU?",
];

for (const test of tests) {
  console.log(`${test} → ${detectIntent(test)}`);
}