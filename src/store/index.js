import Vue from "vue";
import Vuex from "vuex";
// "@" equivale a "src". Ex: "@/store/..." = "src/store/".
// Aqui é "*" porque tem vários exports dentro dos arquivos
// de módulos e como queremos acessar tudo usamos o coringa (* - asterisco)
import * as user from "@/store/modules/user.js";
import * as event from "@/store/modules/event.js";
import notification from "@/store/modules/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // registrando os módulos importados
  modules: {
    user,
    event,
    notification
  },
  state: {
    categories: [
      "sustentability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ]
  }
});
