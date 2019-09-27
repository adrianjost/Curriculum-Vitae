import { firebase } from "~/plugins/firebase.js";
import "firebase/performance";

const enablePerfMetrics = () => {
	const perf = firebase.performance();

	document.addEventListener("mousedown", () => {
		const trace = perf.trace("UserEvents");
		trace.incrementMetric("Mouse Clicks", 1);
	});
	document.addEventListener("keydown", (evt) => {
		if (!["TEXTAREA", "INPUT"].includes(evt.target.nodeName)) {
			const trace = perf.trace("UserEvents");
			trace.incrementMetric("Key Presses", 1);
		}
	});
};

if (process.env.NODE_ENV === "production") {
	enablePerfMetrics();
}
