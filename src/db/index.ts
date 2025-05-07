import Database from "better-sqlite3";
const sqlite = new Database("dev.db");
import { drizzle } from "drizzle-orm/better-sqlite3";
const db = drizzle(sqlite);
export default db;
