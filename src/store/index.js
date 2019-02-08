import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import createPersistedState from "vuex-persistedstate";
import firebaseAuth from "./plugins/firebaseAuth";
import createEasyFirestore from "vuex-easy-firestore";

import auth from "./auth";
import projects from "./projects";

// do the magic 🔥🧙‍♂️
const easyFirestore = createEasyFirestore([projects], {
	logging: process.env.NODE_ENV !== "production",
});

export default new Vuex.Store({
	plugins: [createPersistedState(), easyFirestore, firebaseAuth()],
	modules: {
		auth,
	},
});
