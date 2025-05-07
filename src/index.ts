import express from "express";
import ip from "ip";
import qr from "qrcode-terminal";
import dotenv from "dotenv";

import cors from "cors";
import db from "./db";
import { batch } from "./db/schema";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", async (req, res) => {
  try {
    const d = await db.select().from(batch).all();
    res.json(d);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
