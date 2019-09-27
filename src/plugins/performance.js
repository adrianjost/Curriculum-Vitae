import { firebase } from "~/plugins/firebase.js";
import "firebase/performance";

const enablePerfMetrics = () => {
	const perf = firebase.performance();

	const trace = perf.trace("UserEvents");
	document.addEventListener("mousedown", () => {
		trace.incrementMetric("Mouse Clicks", 1);
	});
	document.addEventListener("keydown", (evt) => {
		if (!["TEXTAREA", "INPUT"].includes(evt.target.nodeName)) {
			trace.incrementMetric("Key Presses", 1);
		}
	});
};

if (process.env.NODE_ENV === "production") {
	enablePerfMetrics();
}
