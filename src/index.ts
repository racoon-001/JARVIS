import readline from "readline";
import { exec } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("JARVIS is online.");
console.log("What can I do for you?");

rl.question("> ", (command) => {
  const cmd = command.toLowerCase();

  if (cmd.includes("open chrome")) {
    console.log("Opening Chrome...");
    exec("start chrome");

  } else if (cmd.includes("open notepad")) {
    console.log("Opening Notepad...");
    exec("start notepad");

  } else if (cmd.includes("open calculator")) {
    console.log("Opening Calculator...");
    exec("start calc");

  } else if (cmd.includes("open vscode") || cmd.includes("open vs code")) {
    console.log("Opening VS Code...");
    exec("code .");

  } else {
    console.log(`I don't know how to do that yet: ${command}`);
  }

  rl.close();
});