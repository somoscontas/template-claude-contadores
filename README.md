# Claude para Contadores — Plantilla de aplicación web

Plantilla oficial del libro **Claude para Contadores** de [Somos Contas](https://somoscontas.com). Es la base sobre la que Claude Code construye tus herramientas contables: conciliadores, validadores de facturas, semáforos tributarios y cualquier aplicación que necesite guardar información.

No arrancas desde una carpeta vacía. El servidor, la base de datos y el inicio de sesión ya están configurados, para que tu trabajo se concentre en lo que sí es irremplazable: las reglas del negocio.

---

## 🛠️ Tecnologías

- **Herramientas de construcción**: [Vite+](https://viteplus.dev/) (`vp`), que agrupa Vite, Rolldown y Vitest.
- **Interfaz**: [Vue 3](https://vuejs.org/) + TypeScript + Vue Router.
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) con la identidad visual de Somos Contas.
- **Design system**: componentes reutilizables en un paquete propio.
- **Servidor**: [Hono](https://hono.dev/) sobre Node.js.
- **Usuarios**: [Better Auth](https://www.better-auth.com/) para registro e inicio de sesión.
- **Base de datos**: [SQLite (LibSQL)](https://github.com/tursodatabase/libsql) + [Drizzle ORM](https://orm.drizzle.team/) para migraciones y consultas.
- **Íconos**: [Lucide Icons](https://lucide.dev/).
- **Paquetes**: espacios de trabajo de [pnpm](https://pnpm.io/).

---

## 📁 Estructura del proyecto

```
├── apps/
│   ├── backend/          # Servidor Hono, usuarios (Better Auth) y esquema de la base de datos
│   └── frontend/         # Aplicación Vue 3, rutas y páginas (Tailwind v4)
├── packages/
│   └── design-system/    # Componentes reutilizables (p. ej. BaseButton.vue) y colores de la marca
├── data/                 # Base de datos SQLite local (no se sube a Git)
├── inbox/                # Carpeta para tus archivos de prueba: extractos, XML, Excel
├── pnpm-workspace.yaml   # Espacios de trabajo y versiones de las dependencias
├── package.json          # Scripts y configuración general
└── tsconfig.json         # Opciones globales de TypeScript
```

---

## 🚀 Primeros pasos

Si vienes del libro, no necesitas escribir estos comandos: abre la carpeta en Claude Code y pídele que prepare y arranque el proyecto. Esta sección queda como referencia para Claude y para quien quiera hacerlo a mano.

### 1. Instalación

Instala todas las dependencias con `vp` (o `pnpm`):

```bash
vp install
```

Las versiones se definen en un solo lugar, el `pnpm-workspace.yaml` (modo catálogo), para que todos los paquetes usen exactamente las mismas.

### 2. Base de datos y migraciones

El servidor usa una base de datos SQLite guardada en `data/db/bambu.db`. Estos son los comandos de Drizzle ORM:

1. **Generar migraciones** (lee el esquema y crea los archivos SQL):
   ```bash
   pnpm --filter @bambu/backend db:generate
   ```
2. **Aplicar migraciones** (ejecuta las migraciones pendientes sobre la base de datos):
   ```bash
   pnpm --filter @bambu/backend db:migrate
   ```
3. **Sincronizar el esquema** (aplica los cambios directamente, sin generar archivos; útil para pruebas rápidas):
   ```bash
   pnpm --filter @bambu/backend db:push
   ```
4. **Abrir Drizzle Studio** (explorador visual de la base de datos en el navegador):
   ```bash
   pnpm --filter @bambu/backend db:studio
   ```

### 3. Entorno de desarrollo

Para arrancar todo al mismo tiempo (servidor en el puerto `3000`, interfaz en el `5173` y design system en modo observación):

```bash
vp run dev
```

- **Interfaz**: [http://localhost:5173](http://localhost:5173)
- **Servidor**: [http://localhost:3000](http://localhost:3000)
- **Design system**: se recompila solo cuando cambias un componente.

_Nota: los dos servidores usan `vite-plugin-killer-instincts`, que libera automáticamente los puertos `5173` y `3000` si otro proceso los está ocupando._

---

## 🎨 Estilos (Tailwind CSS v4)

- **Identidad visual**: los colores y tipografías de Somos Contas se definen en `apps/frontend/src/index.css`, dentro del bloque `@theme`. El verde de la marca es `#059669`.
- **Sin duplicación**: el paquete `@bambu/design-system` no compila Tailwind por su cuenta. Exporta los componentes Vue y un `theme.css` con variables de respaldo.
- **Lectura de componentes**: la interfaz incluye los componentes del design system con la directiva `@source` en `index.css`:
  ```css
  @source "../../../packages/design-system/src/**/*.vue";
  ```
- **Capas de CSS**: para que los estilos globales (como los reinicios) no anulen las clases de Tailwind, envuélvelos siempre en `@layer base`:
  ```css
  @layer base {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  }
  ```

---

## 📂 La carpeta `inbox/`

La carpeta `inbox/` es el lugar para dejar los archivos con los que Claude va a trabajar: extractos bancarios, facturas XML, listados de clientes en Excel, documentos de referencia o imágenes. Su contenido no se sube a Git ni forma parte de la aplicación final.

Usa siempre datos ficticios o anonimizados.

---

## 📝 Licencia

Publicada bajo la [Licencia MIT](LICENSE). Puedes usarla y modificarla en proyectos personales y comerciales.
