// import { getAll } from "~/../apiCalls";

export const state = () => ({
	tags: [],
	projects: [],
	chapters: [],
	about: [],
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
	getAbout: (state) => {
		return state.about;
	},
	getChapters: (state) => {
		return [...state.chapters].sort((a, b) => b.to.localeCompare(a.to));
	},
	getWork: (state, getters) => {
		return getters.getChapters.filter((chapter) => chapter.section === "work");
	},
	getEducation: (state, getters) => {
		return getters.getChapters.filter(
			(chapter) => chapter.section === "education"
		);
	},
};

export const mutations = {
	setProjects(state, projects) {
		state.projects = projects;
	},
	setTags(state, tags) {
		state.tags = tags;
	},
	setAbout(state, about) {
		state.about = about;
	},
	setChapters(state, chapters) {
		state.chapters = chapters;
	},
};

function initStore(commit, projects, tags, about, chapters) {
	commit("setProjects", projects);
	commit("setTags", tags);
	commit("setAbout", about);
	commit("setChapters", chapters);
}

/*
export const actions = {
	nuxtServerInit({ commit }, { payload }) {
		if (payload) {
			return initStore(...[commit, ...payload]);
		}
		return getAll().then((res) => initStore(...[commit, ...res]));
	},
};
*/
