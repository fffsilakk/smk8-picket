//import createApp from Vue
import { createApp } from "vue";
import "./index.css";
import "flowbite";
import App from "./App.vue";

//import config router
import routes from "./routes";

const app = createApp(App);

//gunakan "router" di Vue dengan plugin "use"
app.use(routes);
app.mount("#app");
