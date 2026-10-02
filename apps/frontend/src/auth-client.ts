import { createAuthClient } from "better-auth/vue";

// Si VITE_API_URL está definida (dev, o backend en otro host) se usa esa.
// Si está vacía (contenedor único sirviendo front + back en el mismo origen)
// se usa el origen actual del navegador.
const baseURL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL,
});
