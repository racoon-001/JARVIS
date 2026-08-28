import { db } from "./database.js";

export function remember(key: string, value: string): string {
  try {
    const statement = db.prepare(`
      INSERT INTO memories (key, value)
      VALUES (?, ?)
      ON CONFLICT(key)
      DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
    `);

    statement.run(key, value);

    return `I'll remember that ${key} is ${value}, ma'am.`;
  } catch (error) {
    console.error("Memory error:", error);
    return "I couldn't save that memory, ma'am.";
  }
}

export function recall(key: string): string {
  try {
    const statement = db.prepare(`
      SELECT key, value
      FROM memories
      WHERE key = ?
    `);

    const memory = statement.get(key) as
      | { key: string; value: string }
      | undefined;

    if (!memory) {
      return `I don't have anything stored about ${key}, ma'am.`;
    }

    return `${memory.key} is ${memory.value}, ma'am.`;
  } catch (error) {
    console.error("Memory error:", error);
    return "I couldn't retrieve that memory, ma'am.";
  }
}


export function forget(key: string): string {
  try {
    const statement = db.prepare(`
      DELETE FROM memories
      WHERE key = ?
    `);

    const result = statement.run(key);

    if (result.changes === 0) {
      return `I don't have anything stored about ${key}, ma'am.`;
    }

    return `I've forgotten ${key}, ma'am.`;
  } catch (error) {
    console.error("Memory error:", error);
    return "I couldn't forget that memory, ma'am.";
  }
}