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
		<TheBottomNav class="bottom-nav" :links="ctas" />
	</div>
</template>

<script>
import ProjectCard from "~/components/ProjectCard.vue";
import TheBottomNav from "~/components/TheBottomNav.vue";

export default {
	components: {
		ProjectCard,
		TheBottomNav,
	},
	data() {
		return {
			ctas: {
				right: { to: "/about", text: "About Me" },
			},
		};
	},
	computed: {
		projects() {
			return this.$store.getters.getProjects;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

.projectcard {
	margin: $spacing-cards 0;
	&:first-of-type {
		margin-top: 0;
	}
	&:last-of-type {
		margin-bottom: 0;
	}
}
</style>
