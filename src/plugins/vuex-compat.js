import { defineNuxtPlugin } from "#app";
import { createStore } from "vuex";
import { getAll } from "~/../apiCalls";

const storeFactory = () =>
	createStore({
		state: () => ({
			tags: [],
			projects: [],
			chapters: [],
			about: [],
		}),
		getters: {
			getProject: (state) => (id) =>
				state.projects.find((project) => project.id === id) || {},
			getProjects: (state) => state.projects,
			getTags: (state) => state.tags,
			getAbout: (state) => state.about,
			getChapters: (state) =>
				[...state.chapters].sort((a, b) => b.to.localeCompare(a.to)),
			getWork: (state, getters) =>
				getters.getChapters.filter((chapter) => chapter.section === "work"),
			getEducation: (state, getters) =>
				getters.getChapters.filter(
					(chapter) => chapter.section === "education"
				),
		},
		mutations: {
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
		},
		actions: {
			initStore({ commit }, payload) {
				const [about, chapters, tags, projects] = payload;
				commit("setAbout", about);
				commit("setChapters", chapters);
				commit("setTags", tags);
				commit("setProjects", projects);
			},
		},
	});

export default defineNuxtPlugin(async (nuxtApp) => {
	const store = storeFactory();
	if (!store.state.projects.length) {
		try {
			const data = await getAll();
			store.dispatch("initStore", data);
		} catch (error) {
			console.error("Failed to initialize store data", error);
		}
	}
	nuxtApp.vueApp.use(store);
});
