import fetch from "isomorphic-unfetch";
import base64Img from "base64-img";

const apiBaseUrl =
	process.env.USE_LOCAL_API === "true"
		? "http://localhost:5000/curriculum-vitae-5cd0a/us-central1/fastApiProjects"
		: "https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects";

function getResizedImageUrl(url) {
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

const getData = (urlPath) => () =>
	fetch(`${apiBaseUrl}/${urlPath}`)
		.then((res) => res.json())
		.then((data) => data.data);

export const getAbout = getData("about");
export const getChapters = getData("chapters");
export const getTags = getData("tags");

export const getProjects = () =>
	fetch(`${apiBaseUrl}/projects`)
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
