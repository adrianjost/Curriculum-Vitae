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
				<div class="actions">
					<div class="actions icon-actions">
						<a
							href="https://github.com/adrianjost"
							target="_blank"
							rel="noreferrer"
							class="action"
							title="My GitHub Profile"
						>
							<img
								class="action-icon"
								alt="GitHub Icon"
								src="@/static/Icon-GitHub.svg"
								width="36"
								height="36"
								loading="lazy"
							/>
						</a>
						<a
							href="https://adrianjost.medium.com/"
							target="_blank"
							rel="noreferrer"
							class="action"
							title="My Medium Profile"
						>
							<img
								class="action-icon"
								alt="Medium.com Icon"
								src="@/static/Icon-Medium.svg"
								width="36"
								height="36"
								loading="lazy"
							/>
						</a>
						<a
							href="https://de.linkedin.com/in/adrianjost"
							target="_blank"
							rel="noreferrer"
							class="action"
							title="My LinkedIn Profile"
						>
							<img
								class="action-icon"
								alt="LinkedIn Icon"
								src="@/static/Icon-Linkedin.svg"
								width="36"
								height="36"
								loading="lazy"
							/>
						</a>
						<a
							href="https://www.npmjs.com/~adrianjost"
							target="_blank"
							rel="noreferrer"
							class="action"
							title="My NPM Profile"
						>
							<img
								class="action-icon"
								alt="NPM Icon"
								src="@/static/Icon-NPM.svg"
								width="36"
								height="36"
								loading="lazy"
							/>
						</a>
					</div>
				</div>
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

import transition from "~/mixins/transition";

export default {
	components: {
		ProjectCardTemplate,
		WordCloud,
		Chapter,
		TheBottomNav,
	},
	mixins: [transition],
	data() {
		return {
			ctas: {
				left: { to: "/projects", text: "Projects" },
				right: { to: "/contact", text: "Contact Me" },
			},
		};
	},
	head: {
		title: "About Me",
	},
	computed: {
		about() {
			return this.$store.getters.getAbout;
		},
		tags() {
			return this.$store.getters.getTags.filter(([tag, amount]) => amount > 1);
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
	padding-bottom: 0;

	@media screen and (min-width: 700px) {
		padding-top: 0;
	}
}

.actions {
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 0;

	@media screen and (min-width: 700px) {
		margin-bottom: -0.5em;
	}

	&.icon-actions {
		margin: 0;
	}

	.action-icon {
		height: 2em;
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
