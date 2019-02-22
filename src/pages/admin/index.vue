<template>
	<div>
		<ProjectCardEdit class="projectcard inverted" @saved="addProject($event)" />
		<ProjectCardEdit
			v-for="(data, index) in projects"
			:key="index"
			:saved-data="data"
			:class="{
				projectcard: true,
				inverted: index % 2,
			}"
			@deleted="removeProject(index)"
		/>
	</div>
</template>
<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { db } from "~/plugins/firebase.js";

import ProjectCardEdit from "@/components/ProjectCardEdit.vue";

export default {
	components: {
		ProjectCardEdit,
	},
	data() {
		return {
			projects: [],
		};
	},
	beforeMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				// User signed out.
				this.$router.push({
					path: "/nigol",
					query: {
						redirect: this.$route.path,
					},
				});
			}
		});
		return this.fetchProjects();
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
		removeProject(index) {
			this.projects.splice(index, 1);
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
