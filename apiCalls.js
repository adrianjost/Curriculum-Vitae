import fetch from "isomorphic-unfetch";
import base64Img from "base64-img";

const apiBaseUrl =
	process.env.NODE_ENV === "development"
		? "http://localhost:5000/curriculum-vitae-5cd0a/us-central1/fastApiProjects"
		: "https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects";

async function encodeImage(url) {
	if (process.client) {
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

const getTags = fetch(`${apiBaseUrl}/tags`)
	.then((res) => res.json())
	.then((data) => data.data);

const getChapters = fetch(`${apiBaseUrl}/chapters`)
	.then((res) => res.json())
	.then((data) => data.data);

const getAbout = fetch(`${apiBaseUrl}/about`)
	.then((res) => res.json())
	.then((data) => data.data);

const getProjects = fetch(`${apiBaseUrl}/projects`)
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
	Promise.all([getProjects, getTags, getAbout, getChapters]);
