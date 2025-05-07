import express from "express";
import ip from "ip";
import qr from "qrcode-terminal";
import dotenv from "dotenv";

import cors from "cors";
import initSqlite from "@sqlite.org/sqlite-wasm";

async function main() {
  const sqlite3 = await initSqlite();
  const db = new sqlite3.oo1.DB();

  db.exec(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  )`);

  db.exec(`INSERT INTO todos (title) VALUES ('First Task')`);

  const stmt = db.prepare("SELECT * FROM todos");

  while (stmt.step()) {
    const row = stmt.get({});
    console.log(row); // { id: 1, title: 'First Task' }
  }

  db.close();
}

main().catch(console.error);
