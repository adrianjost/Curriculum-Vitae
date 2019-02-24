<template>
	<ProjectCardTemplate class="skill-wrapper">
		<h2 class="h2">things I used</h2>
		<figure class="skills">
			<WordCloud :words="tags" class="skill-cloud" />
		</figure>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "~/components/ProjectCardTemplate.vue";
import WordCloud from "~/components/WordCloud.vue";

import fetch from "isomorphic-fetch";

export default {
	components: { ProjectCardTemplate, WordCloud },
	async asyncData(context) {
		// check if you got a payload first
		if (context.payload) {
			// extract the tags passed from nuxt.config.js
			return { tags: context.payload };
		} else {
			// if you got no context, go ahead and make the API request
			try {
				const res = await fetch(
					`https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/tags`
				);
				const data = await res.json();
				return { tags: data.data };
			} catch (error) {
				return { tags: [] };
			}
		}
	},
};
</script>

<style lang="scss" scoped>
.h2 {
	font-size: 2.5rem;
	text-decoration: underline;

	@media screen and (max-width: 700px) {
		font-size: 1.5rem;
	}
}

.skill-wrapper.card {
	display: block;
	text-align: center;
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
