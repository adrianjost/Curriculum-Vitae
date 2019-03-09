<template>
	<div>
		<ProjectCardTemplate>
			<h2 class="h2">About Me</h2>
			<p>I'm a 21 years old, passionated web developer.</p>
		</ProjectCardTemplate>

		<ProjectCardTemplate v-if="work.length">
			<h2 class="h2">My employers</h2>
			<Chapter v-for="chapter in work" :key="chapter.key" :data="chapter" />
		</ProjectCardTemplate>

		<ProjectCardTemplate v-if="education.length">
			<h2 class="h2">Education</h2>
			<Chapter
				v-for="chapter in education"
				:key="chapter.key"
				:data="chapter"
			/>
		</ProjectCardTemplate>

		<ProjectCardTemplate class="skill-wrapper">
			<h2 class="h2">Skills</h2>
			<figure class="skills">
				<WordCloud :words="tags" class="skill-cloud" />
			</figure>
		</ProjectCardTemplate>
	</div>
</template>

<script>
import ProjectCardTemplate from "~/components/ProjectCardTemplate.vue";
import WordCloud from "~/components/WordCloud.vue";
import Chapter from "~/components/Chapter.vue";

export default {
	components: { ProjectCardTemplate, WordCloud, Chapter },
	computed: {
		tags() {
			return this.$store.getters.getTags;
		},
		work() {
			return this.$store.getters.getWork;
		},
		education() {
			return this.$store.getters.getEducation;
		},
	},
};
</script>

<style lang="scss" scoped>
$space-between: 3rem;
$space-around: 2rem;
.card {
	padding: 1rem 1.5rem;
	margin-top: $space-between;
	margin-bottom: $space-between;
	&:first-of-type {
		margin-top: $space-around;
	}
	&:last-of-type {
		margin-bottom: $space-around;
	}
}

.h2 {
	padding: 0;
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

$cloud-padding: 0;
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
