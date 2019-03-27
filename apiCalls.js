import fetch from "isomorphic-unfetch";
import base64Img from "base64-img";

const apiBaseUrl =
	process.env.NODE_ENV !== "development"
		? "https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects"
		: "http://localhost:5000/curriculum-vitae-5cd0a/us-central1/fastApiProjects";

export function getTags() {
	return fetch(`${apiBaseUrl}/tags`)
		.then((res) => res.json())
		.then((data) => data.data);
}

export function getChapters() {
	return fetch(`${apiBaseUrl}/chapters`)
		.then((res) => res.json())
		.then((data) => data.data);
}

export function getAbout() {
	return fetch(`${apiBaseUrl}/about`)
		.then((res) => res.json())
		.then((data) => data.data);
}

async function encodeImage(url) {
	if (!process.server) {
		return undefined;
	}

	return new Promise((resolve, reject) => {
		base64Img.requestBase64(
			`https://aridbtumen.cloudimg.io/width/30/x/${url}`,
			(error, res, body) => {
				if (error) {
					return reject(error);
				}
				resolve(body);
			}
		);
	});
}

export function getProjects() {
	return fetch(`${apiBaseUrl}/projects`)
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
}

export function getAll() {
	return Promise.all([getProjects(), getTags(), getAbout(), getChapters()]);
}
