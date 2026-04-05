import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const app = getApps().length ? getApp() : initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
