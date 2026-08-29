import { detectIntent } from "./intentRouter.js";

function assertEqual(actual: string, expected: string, testName: string) {
  if (actual !== expected) {
    throw new Error(
      `❌ ${testName}\nExpected: ${expected}\nReceived: ${actual}`
    );
  }

  console.log(`✅ ${testName}`);
}

const tests = [
  {
    input: "Remember my favorite color is blue",
    expected: "memory",
  },
  {
    input: "Please remember my favorite editor is VS Code",
    expected: "memory",
  },
  {
    input: "What is my favorite color?",
    expected: "memory",
  },
  {
    input: "Tell me my favorite editor",
    expected: "memory",
  },
  {
    input: "Forget my favorite color",
    expected: "memory",
  },
  {
    input: "Open calculator",
    expected: "command",
  },
  {
    input: "Launch Chrome",
    expected: "command",
  },
  {
    input: "Take a screenshot",
    expected: "command",
  },
  {
    input: "What is a CPU?",
    expected: "ai",
  },
  {
    input: "My birthdaay is on 30 April",
    expected: "memory",
  },
  {
    input: "When is my birthday?",
    expected: "memory",
  },
  
  
  
];

for (const test of tests) {
  assertEqual(
    detectIntent(test.input),
    test.expected,
    test.input
  );
}

console.log("\n🎉 All intent router tests passed!");