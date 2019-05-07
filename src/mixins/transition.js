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

		let transitionName = "page";
		if (outerPages[to.name]) {
			transitionName = outerPages[to.name];
		} else if (from.name === "contact") {
			transitionName = "slide-right";
		} else if (from.name === "about") {
			transitionName = "slide-left";
		}

		return {
			name: transitionName,
			mode: "out-in",
		};
	},
};
