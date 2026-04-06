<template>
	<div>
		<p v-if="isLoading" class="state-message">Loading projects...</p>
		<p v-if="loadError" class="state-message error">{{ loadError }}</p>
		<client-only>
			<template v-if="!loadError">
				<ProjectCardEdit
					class="projectcard inverted"
					:autocomplete-tags="tags"
					@saved="addProject($event)"
				/>
				<ProjectCardEdit
					v-for="(data, index) in sortedProjects"
					:key="data.id"
					:saved-data="data"
					:class="{
						projectcard: true,
						inverted: index % 2,
					}"
					:autocomplete-tags="tags"
					@saved="sortedProjects = getSortedProjects()"
					@deleted="removeProject(data.id)"
				/>
			</template>
		</client-only>
	</div>
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/lib/firebase.js";

import ProjectCardEdit from "~/components/ProjectCardEdit.vue";

export default {
	components: {
		ProjectCardEdit,
	},
	setup() {
		definePageMeta({
			layout: "admin",
		});
	},
	data() {
		return {
			isLoading: false,
			loadError: "",
			projects: [],
			sortedProjects: [],
		};
	},
	computed: {
		tags() {
			return this.projects
				.map((project) => project.tags || [])
				.reduce(
					(acc, tags) => acc.concat(tags.filter((tag) => !acc.includes(tag))),
					[]
				);
		},
	},
	mounted() {
		this.fetchProjects();
	},
	methods: {
		async fetchProjects() {
			this.isLoading = true;
			this.loadError = "";

			try {
				this.projects = await getDocs(collection(db, "projects")).then(
					(querySnapshot) => {
						return querySnapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}));
					}
				);
				this.sortedProjects = this.getSortedProjects(this.projects);
			} catch (error) {
				if (error?.code === "permission-denied") {
					this.loadError =
						"You are signed in, but this account has no editor permission.";
				} else {
					this.loadError = "Could not load projects. Please try again.";
				}
			} finally {
				this.isLoading = false;
			}
		},
		addProject(project) {
			this.projects.push(project);
			this.sortedProjects = this.getSortedProjects(this.projects);
		},
		removeProject(id) {
			const projectIndex = this.projects.findIndex(
				(project) => project.id === id
			);
			if (projectIndex === -1) {
				return;
			}
			this.projects.splice(projectIndex, 1);
			this.sortedProjects = this.getSortedProjects(this.projects);
		},
		getSortedProjects(projects) {
			if (!projects) {
				projects = this.projects;
			}
			return projects.slice(0).sort((a, b) => {
				// result == -1 => a before b
				// result ==  0 => unknwon
				// result ==  1 => b before a
				const isPublishedResult =
					!!a.isPublished === !!b.isPublished ? 0 : !!a.isPublished ? 1 : -1;
				let dateResult = 0;
				if (a.date && b.date) {
					dateResult = b.date.localeCompare(a.date);
				} else if (a.date) {
					dateResult = 1;
				} else if (b.date) {
					dateResult = -1;
				} else {
					dateResult = 0;
				}
				const result = isPublishedResult === 0 ? dateResult : isPublishedResult;
				/*
				console.group(a, b);
				console.log(isPublishedResult, a.isPublished, b.isPublished);
				console.log(dateResult, a.date, b.date);
				console.log(
					"Result:",
					result === 0 ? "=" : result < 0 ? "a, b" : "b, a",
					isPublishedResult === 0 ? dateResult : isPublishedResult
				);
				console.groupEnd();
				*/
				return result;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
$space-between: 5rem;
$space-around: 2rem;

.state-message {
	color: #fff;
	text-align: center;
	opacity: 0.9;

	&.error {
		color: #f8b4b4;
	}
}

.projectcard {
	margin-top: $space-between;
	margin-bottom: $space-between;

	&:first-of-type {
		margin-top: $space-around;
	}

	&:last-of-type {
		margin-bottom: $space-around;
	}
}
</style>
