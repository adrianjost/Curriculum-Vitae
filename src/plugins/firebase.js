import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const config = {
	apiKey: "AIzaSyDlyFP3-bIBwQ_JcvlaPkJD88WoEUlF9eg",
	authDomain: "curriculum-vitae-5cd0a.firebaseapp.com",
	databaseURL: "https://curriculum-vitae-5cd0a.firebaseio.com",
	projectId: "curriculum-vitae-5cd0a",
	storageBucket: "curriculum-vitae-5cd0a.appspot.com",
	messagingSenderId: "708068057486",
	appId: "1:708068057486:web:a1dff7d0bd7af2da",
};

// initialize if not already done
try {
	firebase.initializeApp(config);
} catch (e) {
	console.warn("firebase already initialized => skipping");
}

const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, db, storage };
