const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

// INIT
const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

try {
	admin.initializeApp({
		credential: admin.credential.applicationDefault(),
		databaseURL: "https://curriculum-vitae-5cd0a.firebaseio.com",
	});
} catch (e) {
	console.error(e);
}

const db = admin.firestore();
app.get("/:id", (req, res) => {
	return db
		.collection("projects")
		.doc(req.params.id)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.sendStatus(404);
			}
			data = doc.data();
			data.id = doc.id;
			if (data.isPublished !== true) {
				return res.sendStatus(403);
			}
			return res.json({ status: 200, data });
		})
		.catch((error) => {
			res.status(500);
			res.send(error);
		});
});

app.get("/", (req, res) => {
	return db
		.collection("projects")
		.where("isPublished", "==", true)
		.orderBy("date", "desc")
		.get()
		.then((querySnapshot) => {
			const projects = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			return res.json({ status: 200, data: projects });
		})
		.catch((error) => {
			res.status(500);
			res.send(error);
		});
});

exports = module.exports = functions.https.onRequest(app);
