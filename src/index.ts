import readline from "readline";
import { executeCommand } from "./commands.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("JARVIS is online.");
console.log('Type "exit" to shut me down.');

function askJARVIS(): void {
  rl.question("> ", async (command) => {
    const input = command.trim();

    if (
      input.toLowerCase() === "exit" ||
      input.toLowerCase() === "quit"
    ) {
      console.log("JARVIS shutting down. Goodbye, ma'am.");
      rl.close();
      return;
    }

    try {
      const response = await executeCommand(input);

      if (response !== false) {
        console.log(response);
      } else {
        console.log("I don't know how to do that yet, ma'am.");
      }
    } catch (error) {
      console.error("JARVIS Error:", error);
    }

    askJARVIS();
  });
}

askJARVIS();