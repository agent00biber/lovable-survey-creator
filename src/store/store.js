import Vue from "vue";
import Vuex from "vuex";

import authModule from "@/store/authModule.js";
import createModule from "@/store/createModule.js";
import surveyModule from "@/store/surveyModule.js";
import navModule from "@/store/navModule.js";
import analyticsModule from "@/store/analyticsModule.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule,
    surveyModule,
    createModule,
    navModule,
    analyticsModule
  }
});
