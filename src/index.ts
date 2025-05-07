import express from "express";
import ip from "ip";
import qr from "qrcode-terminal";
import dotenv from "dotenv";

import cors from "cors";
import db from "./db";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get batches with optional filter
app.post("/batches", (req, res) => {
  const sql = `INSERT INTO batches (id, name, status) VALUES (?, ?, ?)`;
  const params = ["qwkdjnqxkjqw", "krishna", "nuasjn"];
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});
app.get("/batches", (req, res) => {
  const { status } = req.query;
  let sql = `SELECT * FROM batches`;
  const params = [];

  if (status) {
    sql += ` WHERE status = ?`;
    params.push(status);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
const server = app.listen(9090, "0.0.0.0", () => {
  const addressInfo = server.address();
  if (typeof addressInfo === "object" && addressInfo?.port) {
    const localIp = ip.address();
    const url = `http://${localIp}:${addressInfo.port}`;

    console.log(`\n✅ Server running at ${url}`);
    console.log("📱 Scan the QR code below to access it:\n");

    qr.generate(url, { small: true });
  } else {
    console.error("❌ Could not determine server address");
  }
});
