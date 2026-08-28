import { executeCommand } from "./commands.js";

async function test() {
  console.log(
    await executeCommand(
      "Please remember that my favorite editor is VS Code."
    )
  );

  console.log(
    await executeCommand(
      "What is your favorite editor?"
    )
  );

  console.log(
    await executeCommand(
      "Please forget my favorite editor."
    )
  );

  console.log(
    await executeCommand(
      "Tell me my favorite editor."
    )
  );
}

test();