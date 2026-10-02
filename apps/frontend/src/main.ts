import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router.ts";
import "@bambu/design-system/theme.css";
import "./index.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
