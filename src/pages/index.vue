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
	</div>
</template>

<script>
import ProjectCard from "~/components/ProjectCard.vue";

export default {
	components: {
		ProjectCard,
	},
	computed: {
		projects() {
			return this.$store.getters.getProjects;
		},
	},
};
</script>

<style lang="scss" scoped>
$space-between: 3rem;
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
