import { firebase } from "@firebase/app";
import "@firebase/auth";

const state = {
	authState: undefined,
};

const getters = {
	isAuthenticated: (state) => {
		return state.authState;
	},
};

const mutations = {
	logout(state) {
		state.authState = false;
	},
	login(state, user) {
		state.authState = true;
	},
};

const actions = {
	async login(store, user) {
		store.commit("login", user);
		await store
			.dispatch("projects/openDBChannel", null, { root: true })
			.catch(console.error); // eslint-disable-line no-console
	},
	async logout(store) {
		try {
			await store.dispatch("projects/closeDBChannel", {}, { root: true });
			await store.dispatch(
				"projects/fetchAndAdd",
				{ where: [["isPublished", "==", true]], orderBy: ["date", "desc"] },
				{ root: true }
			);
			store.commit("logout");
		} catch (error) {
			console.error(error); // eslint-disable-line no-console
		}
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
