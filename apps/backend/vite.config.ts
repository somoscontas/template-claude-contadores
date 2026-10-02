import { defineConfig } from "vite-plus";
import devServer from "@hono/vite-dev-server";
import killerInstincts from "vite-plugin-killer-instincts";

process.env.VITE = "true";

export default defineConfig({
  plugins: [
    devServer({
      entry: "src/index.ts",
    }),
    killerInstincts({
      autoKill: true,
    }),
  ],
  server: {
    port: 3000,
    // Requerido por vite-plugin-killer-instincts: el plugin se desactiva
    // solo si strictPort no está activo, y Vite se corre al siguiente
    // puerto libre dejando VITE_API_URL/TRUSTED_ORIGINS apuntando al
    // puerto equivocado.
    strictPort: true,
  },
  envDir: "../../",
  build: {
    ssr: "src/index.ts",
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
