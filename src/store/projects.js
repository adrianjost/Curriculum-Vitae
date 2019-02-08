const getters = {
	list: (state) => {
		return Object.values(state.data);
	},
};

export default {
	firestorePath: "projects/",
	firestoreRefType: "collection",
	statePropName: "data",
	moduleName: "projects",
	namespaced: true,
	getters,
};
