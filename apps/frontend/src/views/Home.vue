<script setup lang="ts">
import { ref, onMounted } from "vue";

const theme = ref("light");
const year = new Date().getFullYear();

const toggleTheme = () => {
  const nextTheme = theme.value === "dark" ? "light" : "dark";
  theme.value = nextTheme;
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
};

onMounted(() => {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme.value = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme.value);
});

const beneficios = [
  "Una base de datos SQLite que guarda tus históricos en un solo archivo de tu computadora",
  "Un servidor local que procesa tus archivos sin enviarlos a internet",
  "Usuarios e inicio de sesión configurados para que cada auxiliar tenga su cuenta",
  "Una carpeta inbox/ para dejar extractos, facturas XML y archivos de Excel de prueba",
  "Instrucciones para Claude que mantienen el proyecto ordenado y auditable",
];

const pasos = [
  {
    titulo: "Abre esta carpeta en Claude Code",
    texto:
      "Desde Claude Desktop, selecciona la carpeta del proyecto como espacio de trabajo. Claude leerá las instrucciones del proyecto antes de tocar cualquier archivo.",
  },
  {
    titulo: "Deja tus archivos en inbox/",
    texto:
      "Extractos bancarios, facturas XML o el listado de clientes en Excel. Usa siempre datos ficticios o anonimizados.",
  },
  {
    titulo: "Pídele lo que necesitas",
    texto:
      "Describe la herramienta como se la explicarías a un auxiliar nuevo: qué entra, qué reglas aplica y qué debe salir.",
  },
];

const guias = [
  {
    nombre: "Conciliación con Claude",
    descripcion: "Cuadre tributario completo con IA: IVA, Renta y Exógena",
    url: "https://somoscontas.com/conciliacion-con-claude/",
  },
  {
    nombre: "Análisis Financiero con Claude",
    descripcion: "14 indicadores y un informe gerencial listo en 15 minutos",
    url: "https://somoscontas.com/analisis-financiero-con-claude/",
  },
  {
    nombre: "Exógena con IA",
    descripcion: "Prepara la información exógena DIAN sin errores ni estrés",
    url: "https://somoscontas.com/exogena-con-ia/",
  },
];
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navegación -->
    <nav
      class="sticky top-0 z-20 flex items-center justify-between h-[60px] px-8 bg-nav-bg backdrop-blur-md border-b border-line max-sm:px-4"
    >
      <a href="/" class="flex items-center" aria-label="Somos Contas — inicio">
        <img
          src="/logo-somoscontas.svg"
          alt="Somos Contas"
          class="h-[34px] w-auto block"
          :class="{ invert: theme === 'dark' }"
        />
      </a>
      <div class="flex items-center gap-5">
        <a
          href="https://somoscontas.com/newsletter/"
          target="_blank"
          rel="noopener"
          class="text-sm font-medium text-muted no-underline transition-colors hover:text-ink max-sm:hidden"
          >Newsletter</a
        >
        <button
          class="bg-transparent border border-line rounded-[7px] w-8 h-8 cursor-pointer p-0 flex items-center justify-center text-muted transition-colors hover:text-ink hover:border-ink"
          :aria-label="theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          @click="toggleTheme"
        >
          <!-- Luna — modo oscuro -->
          <svg
            v-if="theme === 'dark'"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <!-- Sol — modo claro -->
          <svg
            v-else
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            />
          </svg>
        </button>
      </div>
    </nav>

    <main class="flex-1">
      <!-- Portada -->
      <section
        class="max-w-[680px] mx-auto pt-[88px] pb-[72px] px-6 text-center border-b border-line max-sm:pt-14 max-sm:pb-12 max-sm:px-4"
      >
        <p class="text-[13px] font-semibold tracking-[0.5px] uppercase text-accent mb-5">
          Plantilla del libro Claude para Contadores
        </p>
        <h1
          class="font-serif text-[clamp(36px,6vw,56px)] font-bold tracking-[-0.5px] leading-[1.1] text-ink mb-5"
        >
          Tu primera herramienta contable empieza aquí
        </h1>
        <p class="text-lg text-muted leading-[1.7] max-w-[480px] mx-auto mb-10">
          La base sobre la que Claude Code construirá tus conciliadores, validadores de facturas y
          semáforos tributarios. Tú pones las reglas del negocio.
        </p>
        <div class="flex gap-3 justify-center flex-wrap">
          <a
            href="#empezar"
            class="bg-accent text-white text-[15px] font-semibold py-[13px] px-7 rounded-lg no-underline transition-colors hover:bg-accent-dark"
            >Cómo empezar</a
          >
        </div>
      </section>

      <!-- Qué incluye -->
      <section
        class="max-w-[680px] mx-auto py-16 px-6 border-b border-line max-sm:py-12 max-sm:px-4"
      >
        <div
          class="flex items-center gap-3 mb-2 text-[11px] font-bold tracking-[1px] uppercase text-muted after:content-[''] after:flex-1 after:h-px after:bg-line"
        >
          Qué incluye
        </div>
        <h2 class="font-serif text-[28px] font-bold tracking-[-0.3px] mb-2.5">
          Todo listo para que te enfoques en la contabilidad
        </h2>
        <p class="text-base text-muted leading-[1.6] mb-8">
          No arrancas desde una carpeta vacía. La parte técnica ya está resuelta y probada.
        </p>
        <div class="grid gap-2.5">
          <div
            v-for="beneficio in beneficios"
            :key="beneficio"
            class="flex gap-2.5 items-start text-[15px] text-body leading-normal"
          >
            <span
              class="w-5 h-5 rounded-full bg-accent-soft text-accent flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5"
              aria-hidden="true"
              >✓</span
            >
            <span>{{ beneficio }}</span>
          </div>
        </div>
      </section>

      <!-- Cómo empezar -->
      <section
        id="empezar"
        class="max-w-[680px] mx-auto py-16 px-6 border-b border-line scroll-mt-[60px] max-sm:py-12 max-sm:px-4"
      >
        <div
          class="flex items-center gap-3 mb-2 text-[11px] font-bold tracking-[1px] uppercase text-muted after:content-[''] after:flex-1 after:h-px after:bg-line"
        >
          Cómo empezar
        </div>
        <h2 class="font-serif text-[28px] font-bold tracking-[-0.3px] mb-2.5">
          Tres pasos, ningún comando
        </h2>
        <p class="text-base text-muted leading-[1.6] mb-8">
          Tu rol es el de interventor: tú defines las reglas y revisas el resultado. Claude escribe
          el código.
        </p>
        <ol class="grid gap-px border border-line rounded-[14px] overflow-hidden list-none">
          <li v-for="(paso, i) in pasos" :key="paso.titulo" class="flex gap-4 p-5 bg-bg">
            <span
              class="w-8 h-8 rounded-full bg-accent-soft text-accent flex items-center justify-center shrink-0 font-serif font-bold"
              >{{ i + 1 }}</span
            >
            <div>
              <p class="font-bold text-[15px] leading-[1.3] mb-1">{{ paso.titulo }}</p>
              <p class="text-sm text-muted leading-normal">{{ paso.texto }}</p>
            </div>
          </li>
        </ol>

        <div class="mt-8 border border-line rounded-[14px] p-6 bg-subtle max-sm:p-5">
          <h3 class="font-serif text-xl font-bold mb-1.5">Un primer pedido de ejemplo</h3>
          <p class="text-sm text-muted mb-4">Cópialo en Claude Code y ajústalo a tu oficina.</p>
          <pre
            class="font-mono text-[13px] leading-[1.6] text-body bg-bg border border-line rounded-lg p-4 whitespace-pre-wrap"
          >
Lee el archivo inbox/clientes.xlsx y crea una página que muestre las obligaciones tributarias que vencen en los próximos 15 días, agrupadas por cliente y ordenadas por fecha. Usa únicamente los plazos del archivo plazos.md.</pre>
        </div>
      </section>

      <!-- Guías y recursos -->
      <section class="max-w-[680px] mx-auto py-16 px-6 max-sm:py-12 max-sm:px-4">
        <div
          class="flex items-center gap-3 mb-2 text-[11px] font-bold tracking-[1px] uppercase text-muted after:content-[''] after:flex-1 after:h-px after:bg-line"
        >
          Guías y recursos
        </div>
        <h2 class="font-serif text-[28px] font-bold tracking-[-0.3px] mb-2.5">
          Aprende con casos reales
        </h2>
        <p class="text-base text-muted leading-[1.6] mb-8">
          Guías paso a paso de Somos Contas para aplicar IA en las tareas contables más comunes.
        </p>
        <div class="grid gap-px border border-line rounded-[14px] overflow-hidden bg-line">
          <a
            v-for="guia in guias"
            :key="guia.url"
            :href="guia.url"
            target="_blank"
            rel="noopener"
            class="group flex gap-4 items-center py-[18px] px-5 bg-bg no-underline text-ink transition-colors hover:bg-subtle"
          >
            <div class="flex-1 min-w-0">
              <p class="font-bold text-[15px] leading-[1.3] mb-[3px] group-hover:text-accent">
                {{ guia.nombre }}
              </p>
              <p class="text-[13px] text-muted leading-[1.4]">{{ guia.descripcion }}</p>
            </div>
            <span class="text-muted text-lg shrink-0" aria-hidden="true">›</span>
          </a>
        </div>
      </section>
    </main>

    <!-- Pie de página -->
    <footer class="border-t border-line py-7 px-6 text-center text-[13px] text-muted">
      © {{ year }} Somos Contas
    </footer>
  </div>
</template>
