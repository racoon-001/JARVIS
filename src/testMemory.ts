import { remember, recall, forget } from "./memoryTool.js";

console.log(
  remember("favorite language", "JavaScript")
);

console.log(
  recall("favorite language")
);

console.log(
  forget("favorite language")
);

console.log(
  recall("favorite language")
);