<template>
	<ProjectCardTemplate class="skill-wrapper">
		<h2 class="h2">Skills</h2>
		<figure class="skills">
			<WordCloud :words="tags" class="skill-cloud" />
		</figure>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "~/components/ProjectCardTemplate.vue";
import WordCloud from "~/components/WordCloud.vue";

export default {
	components: { ProjectCardTemplate, WordCloud },
	computed: {
		tags() {
			return this.$store.getters.getTags;
		},
	},
};
</script>

<style lang="scss" scoped>
.h2 {
	padding: 1rem 1.5rem 0;
	font-size: 2.5rem;
	text-decoration: underline;

	@media screen and (max-width: 700px) {
		font-size: 1.5rem;
	}
}

.skill-wrapper.card {
	display: block;
}

.skills {
	position: relative;
	padding-bottom: 60%;
	margin: 0;
	overflow: hidden;
}

$cloud-padding: 2rem;
.skill-cloud {
	position: absolute !important;
	top: 0;
	right: $cloud-padding;
	bottom: $cloud-padding;
	left: $cloud-padding;
	width: auto !important;
	height: auto !important;

	@media screen and (max-width: 700px) {
		$cloud-padding: 1rem;

		right: $cloud-padding;
		bottom: $cloud-padding;
		left: $cloud-padding;
	}
}
</style>
