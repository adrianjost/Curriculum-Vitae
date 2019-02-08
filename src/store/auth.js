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
		const syncedStores = [
			store
				.dispatch("projects/openDBChannel", null, { root: true })
				.catch(console.error), // eslint-disable-line no-console
		];
		return Promise.all(syncedStores);
	},
	async logout(store) {
		try {
			const syncedStores = [
				firebase.auth().signOut(),
				store
					.dispatch(
						"projects/closeDBChannel",
						{ clearModule: true },
						{ root: true }
					)
					.catch(console.error), // eslint-disable-line no-console
			];
			await Promise.all(syncedStores);
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
