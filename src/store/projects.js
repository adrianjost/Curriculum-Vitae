const getters = {
	list: (state) => {
		return Object.values(state.data).sort((a, b) => {
			return a.date - b.date;
		});
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
