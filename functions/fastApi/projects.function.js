const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const markdown = require("marked");

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

// HELPER

const sendData = (res) => (data) => {
	return res.json({ status: 200, data: data });
};

const sendError = (res) => (error) => {
	const errorCode = typeof error.code === "number" ? error.code : 500;
	res.status(errorCode);
	return res.send({ status: errorCode, message: error.message || error });
};

const getDataFromQuerySnapshot = (querySnapshot) =>
	querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

// METHODS

const getTags = () => {
	return db
		.collection("projects")
		.where("isPublished", "==", true)
		.get()
		.then((querySnapshot) => {
			const tags = querySnapshot.docs
				.map((doc) => doc.data().tags || [])
				.reduce((acc, tags) => {
					tags.forEach((tag) => {
						acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
					});
					return acc;
				}, {});
			return Object.keys(tags).map((tag) => [tag, tags[tag]]);
		});
};

const getProject = (id) => {
	return db
		.collection("projects")
		.doc(id)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				throw { code: 404, message: "" };
			}
			data = doc.data();
			data.id = doc.id;
			if (data.isPublished !== true) {
				throw { code: 403, message: "" };
			}
			return data;
		});
};

const getProjects = () => {
	return db
		.collection("projects")
		.where("isPublished", "==", true)
		.orderBy("date", "desc")
		.get()
		.then(getDataFromQuerySnapshot);
};

const getAbout = () => {
	return db
		.collection("about")
		.get()
		.then((querySnapshot) => {
			return querySnapshot.docs.map((doc) => doc.data().text).join("");
		})
		.then((aboutText) => markdown(aboutText));
};

const getChapters = () => {
	return db
		.collection("chapters")
		.get()
		.then(getDataFromQuerySnapshot);
};

// ROUTES

const routeMethods = {
	"/tags": getTags,
	"/chapters": getChapters,
	"/about": getAbout,
	"/projects": getProjects,
};

Object.entries(routeMethods).forEach(([route, method]) =>
	app.get(route, (req, res) => {
		return method()
			.then(sendData(res))
			.catch(sendError(res));
	})
);

app.get("/:id", (req, res) => {
	return getProject(req.params.id)
		.then(sendData(res))
		.catch(sendError(res));
});

exports = module.exports = functions.https.onRequest(app);
