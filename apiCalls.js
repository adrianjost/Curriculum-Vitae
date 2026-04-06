import fetchRetry from "fetch-retry";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { marked } from "marked";
import { db } from "./src/lib/firebase.js";

const fetch = fetchRetry(globalThis.fetch.bind(globalThis), {
	retries: 3,
	retryDelay: 1000,
});

const apiBaseUrl = process.env.API_URL;
const shouldUseMockApi = Boolean(apiBaseUrl);

async function encodeImage(url) {
	if (process.client) {
		return undefined;
	}

	const resizedUrl = `https://adrianjost.twic.pics/gcs/${url.split("/").pop()}&twic=v1/resize=30`;
	const response = await globalThis.fetch(resizedUrl, {
		method: "GET",
		redirect: "follow",
		headers: {
			accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
			"cache-control": "no-cache",
			pragma: "no-cache",
			"user-agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to load image for placeholder: ${response.status}`);
	}

	const buffer = Buffer.from(await response.arrayBuffer());
	const contentType = response.headers.get("content-type") || "image/jpeg";
	return `data:${contentType};base64,${buffer.toString("base64")}`;
}

const getDataFromSnapshot = (querySnapshot) =>
	querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

const fetchMockData = (urlPath) =>
	fetch(`${apiBaseUrl}/${urlPath}`).then((res) => {
		if (!res.ok) {
			throw new Error(`Mock API request failed (${res.status}) for ${urlPath}`);
		}
		return res.json().then((json) => json.data);
	});

const getAboutFromMockApi = () => fetchMockData("about");
const getChaptersFromMockApi = () => fetchMockData("chapters");
const getProjectsFromMockApi = () =>
	fetchMockData("projects").then((projects) =>
		Promise.all(
			projects.map(async (project) => {
				if (project.img) {
					project.imgPlaceholder = await encodeImage(project.img);
				}
				return project;
			})
		)
	);

export const getAbout = () =>
	shouldUseMockApi
		? getAboutFromMockApi()
		: getDocs(collection(db, "about"))
				.then((snapshot) =>
					snapshot.docs.map((doc) => doc.data().text).join("")
				)
				.then((text) => marked(text));

export const getChapters = () =>
	shouldUseMockApi
		? getChaptersFromMockApi()
		: getDocs(collection(db, "chapters")).then(getDataFromSnapshot);

export const getProjects = () =>
	shouldUseMockApi
		? getProjectsFromMockApi()
		: getDocs(
				query(
					collection(db, "projects"),
					where("isPublished", "==", true),
					orderBy("date", "desc")
				)
			)
				.then(getDataFromSnapshot)
				.then((projects) =>
					Promise.all(
						projects.map(async (project) => {
							if (project.img) {
								project.imgPlaceholder = await encodeImage(project.img);
							}
							return project;
						})
					)
				);

export const getAll = () =>
	Promise.all([getAbout(), getChapters(), getProjects()]);
