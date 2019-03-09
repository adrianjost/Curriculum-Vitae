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
		.then((querySnapshot) => {
			return querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
		});
};

const getChapters = () => {
	return db
		.collection("chapters")
		.get()
		.then((querySnapshot) => {
			return querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
		});
};

// ROUTES

app.get("/tags", (req, res) => {
	return getTags()
		.then((tagList) => {
			return res.json({ status: 200, data: tagList });
		})
		.catch((error) => {
			res.status(500);
			res.send({ status: 500, message: error });
		});
});

app.get("/chapters", (req, res) => {
	return getChapters()
		.then((tagList) => {
			return res.json({ status: 200, data: tagList });
		})
		.catch((error) => {
			res.status(500);
			res.send({ status: 500, message: error });
		});
});

app.get("/projects", (req, res) => {
	return getProjects()
		.then((projects) => {
			return res.json({ status: 200, data: projects });
		})
		.catch((error) => {
			res.status(500);
			res.send({ status: 500, message: error });
		});
});

app.get("/:id", (req, res) => {
	return getProject(req.params.id)
		.then((project) => {
			return res.json({ status: 200, project });
		})
		.catch((error) => {
			const errorCode = error.code || 500;
			res.status(errorCode);
			res.send({ status: errorCode, message: error.message || error });
		});
});

exports = module.exports = functions.https.onRequest(app);
