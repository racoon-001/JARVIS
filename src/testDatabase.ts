import Database from "better-sqlite3";
import fs from "fs";

const testDbPath = "test-database.db";

// Remove old test database if it exists
if (fs.existsSync(testDbPath)) {
  fs.unlinkSync(testDbPath);
}

const testDb = new Database(testDbPath);

testDb.exec(`
  CREATE TABLE memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`❌ ${message}`);
  }

  console.log(`✅ ${message}`);
}

// CREATE
testDb
  .prepare("INSERT INTO memories (key, value) VALUES (?, ?)")
  .run("favorite editor", "VS Code");

assert(true, "Memory can be created");

// READ
const memory = testDb
  .prepare("SELECT * FROM memories WHERE key = ?")
  .get("favorite editor") as
  | { key: string; value: string }
  | undefined;

assert(
  memory?.value === "VS Code",
  "Memory can be retrieved"
);

// UPDATE
testDb
  .prepare(
    "UPDATE memories SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?"
  )
  .run("Cursor", "favorite editor");

const updatedMemory = testDb
  .prepare("SELECT * FROM memories WHERE key = ?")
  .get("favorite editor") as
  | { key: string; value: string }
  | undefined;

assert(
  updatedMemory?.value === "Cursor",
  "Memory can be updated"
);

// DELETE
testDb
  .prepare("DELETE FROM memories WHERE key = ?")
  .run("favorite editor");

const deletedMemory = testDb
  .prepare("SELECT * FROM memories WHERE key = ?")
  .get("favorite editor");

assert(
  deletedMemory === undefined,
  "Memory can be deleted"
);

testDb.close();

// Remove test database
if (fs.existsSync(testDbPath)) {
  fs.unlinkSync(testDbPath);
}

console.log("\n🎉 All database tests passed!");