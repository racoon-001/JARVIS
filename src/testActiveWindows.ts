import { getActiveWindow } from "./activeWindows.js";

async function test() {
  const result = await getActiveWindow();

  console.log("🖥️ ACTIVE WINDOW:");
  console.log(result);
}

test();