<template>
	<div>
		<ProjectCardTemplate class="grid">
			<template slot="image">
				<img
					class="image image--cover"
					style="object-position: center top"
					src="~/static/ProfileImage.jpg"
					alt="profile image of Adrian Jost"
				/>
			</template>
			<template slot="text">
				<h2 class="h2">About Me</h2>
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="about" />
			</template>
		</ProjectCardTemplate>

		<ProjectCardTemplate class="skill-wrapper with-padding">
			<h2 class="h2">My Skills</h2>
			<figure class="skills">
				<WordCloud :words="tags" class="skill-cloud" />
			</figure>
		</ProjectCardTemplate>

		<ProjectCardTemplate v-if="work.length" class="with-padding">
			<h2 class="h2">My Employers</h2>
			<Chapter v-for="chapter in work" :key="chapter.key" :data="chapter" />
		</ProjectCardTemplate>

		<ProjectCardTemplate v-if="education.length" class="with-padding">
			<h2 class="h2">My Education</h2>
			<Chapter
				v-for="chapter in education"
				:key="chapter.key"
				:data="chapter"
			/>
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
	head: {
		title: "CV",
	},
	components: {
		ProjectCardTemplate,
		WordCloud,
		Chapter,
		TheBottomNav,
	},
	data() {
		return {
			ctas: {
				left: { to: "/projects", text: "Projects" },
				right: { to: "/contact", text: "Contact Me" },
			},
		};
	},
	computed: {
		about() {
			return this.$store.getters.getAbout;
		},
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
	margin: $spacing-cards 0;
	&.with-padding {
		padding: 1rem 1.5rem;
	}
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

	@media screen and (max-width: 700px) {
		margin: 0 -1.5rem -1.5rem;
	}
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
