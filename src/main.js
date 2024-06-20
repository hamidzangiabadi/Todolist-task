import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import "quasar/src/css/index.sass";
import "./style.css";
import store from "./store";

const savedState = localStorage.getItem("store");
if (savedState) {
  store.replaceState(Object.assign(store.state, JSON.parse(savedState)));
}

window.addEventListener("storage", (event) => {
  if (event.key === "store") {
    store.replaceState(Object.assign(store.state, JSON.parse(event.newValue)));
  }
});

createApp(App).use(store).use(Quasar, quasarUserOptions).mount("#app");
