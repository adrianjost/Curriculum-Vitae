<template>
	<!-- TODO use new layout -->
	<ProjectCardTemplate
		:id="project.id"
		:img="project.img"
		:data="{ ...project, img: project.img }"
		:class="{ projectcard: true }"
	>
		<h2 class="title">
			{{ project.title }}<small class="category">{{ project.category }}</small>
		</h2>
		<h3 class="subtitle">{{ dateToString(project.date) }}</h3>
		<p class="description">{{ project.description }}</p>
		<div class="actions">
			<a v-if="project.src" target="_blank" :href="project.src">Read more →</a>
		</div>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "~/components/ProjectCardTemplate.vue";

export default {
	components: {
		ProjectCardTemplate,
	},
	computed: {
		project() {
			return this.$store.getters.getProject(this.$route.params.id);
		},
	},
	methods: {
		dateToString(timestamp) {
			if (!timestamp) {
				return;
			}
			const date = new Date(Date.parse(timestamp));
			const options = { year: "numeric", month: "long" };
			return date.toLocaleDateString("de-DE", options);
		},
	},
};
</script>
