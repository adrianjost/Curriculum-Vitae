import { firebase } from "@firebase/app";
import "@firebase/performance";
import { conf } from "./firebase";

export default (ctx, inject) => {
	// Don't include when Firebase is already initialized
	if (!firebase.apps.length) {
		firebase.initializeApp(conf);
	}

	// Firebase Performance can only be initiated on client side
	if (process.browser) {
		const firePerf = firebase.performance();
		const firePerfObj = firebase.performance;
		inject("firePerf", firePerf);
		inject("firePerfObj", firePerfObj);
	}
};
