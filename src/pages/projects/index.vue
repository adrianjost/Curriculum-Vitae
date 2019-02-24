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
import fetch from "isomorphic-fetch";

export default {
	async asyncData(context) {
		// check if you got a payload first
		if (context.payload) {
			// extract the projects object passed from nuxt.config.js
			return { projects: context.payload };
		} else {
			// if you got no context, go ahead and make the API request
			try {
				const res = await fetch(
					`https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/`
				);
				const data = await res.json();
				return { projects: data.data };
			} catch (error) {
				return { projects: {} };
			}
		}
	},
	components: {
		ProjectCard,
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
