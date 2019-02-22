<template>
	<div>
		<ProjectCardEdit class="projectcard inverted" @saved="addProject($event)" />
		<ProjectCardEdit
			v-for="(data, index) in sortedProjects"
			:key="data.id"
			:saved-data="data"
			:class="{
				projectcard: true,
				inverted: index % 2,
			}"
			@deleted="removeProject(data.id)"
		/>
	</div>
</template>
<script>
import { db } from "~/plugins/firebase.js";

import ProjectCardEdit from "@/components/ProjectCardEdit.vue";

export default {
	layout: "admin",
	components: {
		ProjectCardEdit,
	},
	data() {
		return {
			projects: [],
		};
	},
	computed: {
		sortedProjects() {
			return this.projects.slice(0).sort((a, b) => {
				return b.date.localeCompare(a.date);
			});
		},
	},
	methods: {
		async fetchProjects() {
			db.settings({ timestampsInSnapshots: true });
			this.projects = await db
				.collection("projects")
				.orderBy("date", "desc")
				.get()
				.then((querySnapshot) => {
					return querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
				});
		},
		addProject(project) {
			this.projects.push(project);
		},
		removeProject(id) {
			const projectIndex = this.projects.findIndex(
				(project) => project.id === id
			);
			if (projectIndex === -1) {
				return;
			}
			this.projects.splice(projectIndex, 1);
		},
	},
};
</script>

<style lang="scss" scoped>
$space-between: 5rem;
$space-around: 2rem;
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
