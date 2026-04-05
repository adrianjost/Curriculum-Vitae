import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const config = {
	apiKey: "AIzaSyBC8UNa0JZAXq0IYO-LjH3aUT8_2OROnhs",
	authDomain: "curriculum-vitae-5cd0a.firebaseapp.com",
	databaseURL: "https://curriculum-vitae-5cd0a.firebaseio.com",
	projectId: "curriculum-vitae-5cd0a",
	storageBucket: "curriculum-vitae-5cd0a.appspot.com",
	messagingSenderId: "708068057486",
	appId: "1:708068057486:web:a1dff7d0bd7af2da",
};

// Initialize once and reuse app instance across client reloads.
const app = firebase.apps.length
	? firebase.app()
	: firebase.initializeApp(config);
const db = app.firestore();
const storage = app.storage();

export { firebase, db, storage };
