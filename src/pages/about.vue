<template>
	<div>
		<ProjectCardTemplate>
			<h2 class="h2">About Me</h2>
			<p>
				I'm currently studying IT Systems Engineering to improve my
				architectural and technical background. To put this knowledge into
				practice I'm working as a front-end developer at the HPI School Cloud.
				This is the place where my passion for solving problems with code and
				designing products, that are actually used, comes together.
			</p>
			<p>In my spare time, I like to ride my mountain- and road bike.</p>
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
		<TheBottomNav class="bottom-nav" :links="ctas" />
	</div>
</template>

<script>
import ProjectCardTemplate from "~/components/ProjectCardTemplate.vue";
import WordCloud from "~/components/WordCloud.vue";
import Chapter from "~/components/Chapter.vue";
import TheBottomNav from "~/components/TheBottomNav.vue";

export default {
	components: { ProjectCardTemplate, WordCloud, Chapter, TheBottomNav },
	data() {
		return {
			ctas: {
				left: { to: "/", text: "Projects" },
				right: { to: "/contact", text: "Contact Me" },
			},
		};
	},
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
@import "~/styles/variables.scss";

.card {
	padding: 1rem 1.5rem;
	margin: $spacing-cards 0;
	&:first-of-type {
		margin-top: 0;
	}
	&:last-of-type {
		margin-bottom: 0;
	}
}

.h2 {
	padding: 0;
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
