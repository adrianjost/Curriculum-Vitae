const getters = {
	list: (state) => {
		return Object.values(state.data).sort((a, b) => {
			return b.date.localeCompare(a.date);
		});
	},
	get: (state) => {
		return (id) => {
			return state.data[id];
		};
	},
};

const orderBy = ["date", "desc"]; // or more params

export default {
	firestorePath: "projects/",
	firestoreRefType: "collection",
	statePropName: "data",
	moduleName: "projects",
	namespaced: true,
	getters,
	sync: {
		orderBy,
	},
};
