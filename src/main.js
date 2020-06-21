import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
const fb = require("./plugins/firebase.js");

Vue.config.productionTip = false;

const app = "";

// So that currentUser is accessed after completely loading the firebase.
fb.auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  if (!app) {
    new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
