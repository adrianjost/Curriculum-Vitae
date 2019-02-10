/* eslint-disable no-console */

import { firebase } from "@firebase/app";
import { config } from "@/helpers/firebaseConfig";
import "@firebase/auth";
import "@firebase/firestore";

firebase.initializeApp(config);
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default function firebaseSync() {
	return (store) => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				return store.dispatch("auth/login", user);
			} else {
				return store.dispatch("auth/logout");
			}
		});
	};
}
