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

		if (outerPages[to.name]) {
			transitionName = outerPages[to.name];
		} else {
			transitionName = from.name === "contact" ? "slide-right" : "slide-left";
		}

		return {
			name: transitionName,
			mode: "out-in",
		};
	},
};
