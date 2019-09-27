import { firebase } from "~/plugins/firebase.js";
import "firebase/performance";

if (process.env.NODE_ENV === "production") {
	firebase.performance();
}
