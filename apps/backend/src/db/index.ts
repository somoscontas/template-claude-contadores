import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.ts";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { mkdirSync } from "fs";

if (!process.env.DATABASE_URL) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    process.loadEnvFile(resolve(__dirname, "../../../.env"));
  } catch {}
}

const url = process.env.DATABASE_URL || "file:../../data/db/bambu.db";

// SQLite no crea carpetas: en una instalación nueva `data/db/` todavía no existe.
if (url.startsWith("file:")) {
  mkdirSync(dirname(resolve(url.slice("file:".length))), { recursive: true });
}

const client = createClient({ url });

export const db = drizzle(client, { schema });
