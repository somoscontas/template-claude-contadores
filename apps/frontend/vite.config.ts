import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";
import killerInstincts from "vite-plugin-killer-instincts";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    killerInstincts({
      autoKill: true,
    }),
  ],
  server: {
    port: 5173,
    // Requerido por vite-plugin-killer-instincts: el plugin se desactiva
    // solo si strictPort no está activo, y Vite se corre al siguiente
    // puerto libre dejando VITE_API_URL/TRUSTED_ORIGINS apuntando al
    // puerto equivocado.
    strictPort: true,
    allowedHosts: [".ts.net"],
  },
  envDir: "../../",
});
