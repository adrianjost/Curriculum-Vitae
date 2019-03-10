import fetch from "isomorphic-unfetch";
import base64Img from "base64-img";

export function getTags() {
	return fetch(
		`https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/tags`
	)
		.then((res) => res.json())
		.then((data) => data.data);
}

export function getChapters() {
	return fetch(
		`https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/chapters`
	)
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
	return fetch(
		"https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/projects"
	)
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
	return Promise.all([getProjects(), getTags(), getChapters()]);
}
