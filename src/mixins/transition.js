export default {
	transition(to, from) {
		if (!from) {
			return {
				name: "page",
				mode: "out-in",
			};
		}

		const outerPages = {
			projects: "slide-right",
			contact: "slide-left",
		};

		const transitionName = outerPages[to.name]
			? outerPages[to.name]
			: from.name === "contact"
			? "slide-right"
			: "slide-left";

		return {
			name: transitionName,
			mode: "out-in",
		};
	},
};
