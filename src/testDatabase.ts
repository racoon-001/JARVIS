import { db } from "./database.js";

const memories = db
  .prepare("SELECT * FROM memories")
  .all();

console.log("Stored memories:", memories);