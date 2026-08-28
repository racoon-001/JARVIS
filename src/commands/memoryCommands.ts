import {
  remember,
  recall,
  forget,
} from "../memoryTool.js";

export async function executeMemoryCommand(
  input: string
): Promise<string | false> {

  // =========================
  // NORMALIZE INPUT
  // =========================

  const text = input
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .trim();

  // =========================
  // REMEMBER
  // =========================

  const rememberMatch = text.match(
    /^(?:please\s+)?(?:remember|remember that|keep in mind|don't forget that)\s+(?:my\s+)?(.+?)\s+(?:is|as)\s+(.+)$/
  );

  if (rememberMatch) {
    const key = rememberMatch[1].trim();
    const value = rememberMatch[2].trim();

    console.log(
      `🧠 JARVIS: Remembering ${key} = ${value}`
    );

    return await remember(key, value);
  }

  // =========================
  // ALTERNATIVE REMEMBER
  // =========================

  const rememberThisMatch = text.match(
    /^(?:please\s+)?remember\s+(?:this\s*:?\s*)?(.+?)\s*=\s*(.+)$/
  );

  if (rememberThisMatch) {
    const key = rememberThisMatch[1].trim();
    const value = rememberThisMatch[2].trim();

    return await remember(key, value);
  }

  // =========================
  // FORGET
  // =========================

  const forgetMatch = input.match(
  /^(?:please )?forget (?:my )?(.+?)[!?]*$/
);
  if (forgetMatch) {
    const key = forgetMatch[1].trim();

    console.log(
      `🧠 JARVIS: Forgetting ${key}, ma'am...`
    );

    return await forget(key);
  }

  // =========================
  // RECALL
  // =========================

  const recallMatch = text.match(
    /^(?:please\s+)?(?:what\s+is|what's|tell\s+me|do\s+you\s+remember)\s+(?:my\s+)?(.+)$/
  );

  if (recallMatch) {
    const key = recallMatch[1].trim();

    return await recall(key);
  }

  // =========================
  // REMEMBERED INFORMATION
  // =========================

  const rememberedMatch = text.match(
    /^(?:do\s+you\s+remember)\s+(?:that\s+)?(?:my\s+)?(.+)$/
  );

  if (rememberedMatch) {
    const key = rememberedMatch[1].trim();

    return await recall(key);
  }

  // =========================
  // NOT A MEMORY COMMAND
  // =========================

  return false;
}