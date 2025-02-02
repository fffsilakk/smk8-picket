import { createApp } from "vue";
import { createPinia } from 'pinia'
import "./index.css";
import "flowbite";
import App from "./App.vue";
const pinia = createPinia()

import routes from "./routes";

const app = createApp(App);

//gunakan "router" di Vue dengan plugin "use"
app.use(routes);
app.use(pinia)
app.mount("#app");
