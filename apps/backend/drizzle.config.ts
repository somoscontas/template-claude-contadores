import { defineConfig } from "drizzle-kit";
import { dirname, resolve } from "path";
import { mkdirSync } from "fs";

try {
  process.loadEnvFile(resolve(process.cwd(), "../../.env"));
} catch {}

const url = process.env.DATABASE_URL || "file:../../data/db/bambu.db";

// SQLite no crea carpetas: en una instalación nueva `data/db/` todavía no existe.
if (url.startsWith("file:")) {
  mkdirSync(dirname(resolve(url.slice("file:".length))), { recursive: true });
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url,
  },
});
