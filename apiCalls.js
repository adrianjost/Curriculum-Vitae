import originalFetch from "isomorphic-unfetch";
import fetchRetry from "fetch-retry";
import base64Img from "base64-img";

const fetch = fetchRetry(originalFetch, {
	retries: 3,
	retryDelay: 1000,
});

const apiBaseUrl =
	process.env.API_URL ||
	(process.env.NODE_ENV === "development"
		? "http://localhost:5000/curriculum-vitae-5cd0a/us-central1/fastApiProjects"
		: "https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects");

function getResizedImageUrl(url) {
	// TODO [#159]: mock cloudimg API for network independant tests
	return `https://aridbtumen.cloudimg.io/width/30/x/${url}`;
}

async function encodeImage(url) {
	if (process.client) {
		return undefined;
	}
	return new Promise((resolve, reject) => {
		base64Img.requestBase64(getResizedImageUrl(url), (error, res, body) => {
			error ? reject(error) : resolve(body);
		});
	});
}

const logInvalid = (res) => {
	if (res.status < 200 || res.status >= 300) {
		console.error("Error", res);
	}
	return res;
};

const getData = (urlPath) => () =>
	fetch(`${apiBaseUrl}/${urlPath}`)
		.then(logInvalid)
		.then((res) => res.json())
		.then((data) => data.data);

export const getAbout = getData("about");
export const getChapters = getData("chapters");
export const getTags = getData("tags");

export const getProjects = () =>
	fetch(`${apiBaseUrl}/projects`)
		.then(logInvalid)
		.then((res) => res.json())
		.then((data) =>
			Promise.all(
				data.data.map(async (project) => {
					if (project.img) {
						project.imgPlaceholder = await encodeImage(project.img);
					}
					return project;
				})
			)
		);

export const getAll = () =>
	Promise.all([getAbout(), getChapters(), getTags(), getProjects()]);
