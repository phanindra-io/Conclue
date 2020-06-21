import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#00897B" // Teal-darken-1 from Vuetify colors
      }
    }
  }
};

export default new Vuetify(opts);
