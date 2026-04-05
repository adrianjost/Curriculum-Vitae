<template>
	<div>
		<ProjectCard
			v-for="(data, index) in projects"
			:id="data.id"
			:key="index"
			:data="data"
			:class="{
				projectcard: true,
				inverted: index % 2,
			}"
		/>
		<p v-if="!projects.length" class="empty-state">
			Projects are temporarily unavailable.
		</p>
		<TheBottomNav class="bottom-nav" :links="ctas" />
	</div>
</template>

<script>
import ProjectCard from "~/components/ProjectCard.vue";
import TheBottomNav from "~/components/TheBottomNav.vue";

import transition from "~/mixins/transition";

export default {
	components: {
		ProjectCard,
		TheBottomNav,
	},
	mixins: [transition],
	data() {
		return {
			ctas: {
				right: { to: "/", text: "About Me" },
			},
		};
	},
	head: {
		title: "Projects",
	},
	computed: {
		projects() {
			return this.$store.getters.getProjects;
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/styles/variables";

.projectcard {
	margin: variables.$spacing-cards 0;

	&:first-of-type {
		margin-top: 0;
	}

	&:last-of-type {
		margin-bottom: 0;
	}
}

.empty-state {
	padding: 2rem 1.5rem;
	margin: variables.$spacing-cards 0;
	text-align: center;
	background: rgb(255 255 255 / 80%);
	border-radius: 0.75rem;
}
</style>
