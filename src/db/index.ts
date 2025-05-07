import sqlite3 from "sqlite3";
import path from "path";

sqlite3.verbose();

const db = new sqlite3.Database(path.resolve(__dirname, "app.db"));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS batches (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS candidates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      batchId TEXT NOT NULL,
      FOREIGN KEY(batchId) REFERENCES batches(id)
    );
  `);
});

export default db;
