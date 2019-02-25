import fetch from "isomorphic-unfetch";
import base64Img from "base64-img";

export const state = () => ({
	tags: [],
	projects: [],
});

export const getters = {
	getProject: (state) => {
		return (id) => {
			return state.projects.find((project) => project.id === id) || {};
		};
	},
	getProjects: (state) => {
		return state.projects;
	},
	getTags: (state) => {
		return state.tags;
	},
};

export const mutations = {
	setProjects(state, projects) {
		state.projects = projects;
	},
	setTags(state, tags) {
		state.tags = tags;
	},
};

function getTags() {
	return fetch(
		`https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/tags`
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

function getProjects() {
	return fetch(
		"https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/"
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

export const actions = {
	async nuxtServerInit({ commit }, NuxtContext) {
		return Promise.all([getProjects(), getTags()]).then(([projects, tags]) => {
			commit("setProjects", projects);
			commit("setTags", tags);
		});
	},
};
