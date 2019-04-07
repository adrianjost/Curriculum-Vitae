import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

const config = {
	apiKey: "AIzaSyDlyFP3-bIBwQ_JcvlaPkJD88WoEUlF9eg",
	authDomain: "curriculum-vitae-5cd0a.firebaseapp.com",
	databaseURL: "https://curriculum-vitae-5cd0a.firebaseio.com",
	projectId: "curriculum-vitae-5cd0a",
	storageBucket: "curriculum-vitae-5cd0a.appspot.com",
	messagingSenderId: "708068057486",
};

// initialize if not already done
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, db, storage };
