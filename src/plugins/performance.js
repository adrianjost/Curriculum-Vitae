import { defineNuxtPlugin } from "#app";
import { getPerformance } from "firebase/performance";
import { app } from "~/lib/firebase.js";

let perf;
const enablePerfMetrics = () => {
	if (perf) {
		return;
	}
	perf = getPerformance(app);
	/*
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
	*/
};

export default defineNuxtPlugin(() => {
	if (process.env.NODE_ENV === "production") {
		enablePerfMetrics();
	}
});
