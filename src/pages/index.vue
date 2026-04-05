<template>
	<div>
		<ProjectCardTemplate class="grid">
			<template #image>
				<img
					class="image image--cover"
					style="object-position: center top"
					src="/ProfileImage.jpg"
					alt="profile image of Adrian Jost"
				/>
			</template>
			<template #text>
				<h2 class="h2">About Me</h2>
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-if="about" v-html="about" />
				<p v-else class="empty-state">
					About content is temporarily unavailable.
				</p>
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
								src="/Icon-GitHub.svg"
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
								src="/Icon-Medium.svg"
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
								src="/Icon-Linkedin.svg"
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
								src="/Icon-NPM.svg"
								width="36"
								height="36"
								loading="lazy"
							/>
						</a>
					</div>
				</div>
			</template>
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
import Chapter from "~/components/Chapter.vue";
import TheBottomNav from "~/components/TheBottomNav.vue";

import transition from "~/mixins/transition";

export default {
	components: {
		ProjectCardTemplate,
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
@use "@/styles/variables";

.card {
	margin: variables.$spacing-cards 0;

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

	@media screen and (width >= 700px) {
		padding-top: 0;
	}
}

.actions {
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 0;

	@media screen and (width >= 700px) {
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

.empty-state {
	margin: 0.75rem 0 0;
}

.skills {
	position: relative;
	padding-bottom: 60%;
	margin: 0;
	overflow: hidden;

	@media screen and (width <= 700px) {
		margin: 0 -1.5rem -1.5rem;
	}
}

.skills-text-fallback {
	max-height: 0;
	margin: 0;
	overflow: hidden;
	white-space: pre-line;
	pointer-events: none;
	opacity: 0;
}

$cloud-padding: 0;

.skill-cloud {
	position: absolute !important;
	inset: 0 $cloud-padding $cloud-padding;
	width: auto !important;
	height: auto !important;

	@media screen and (width <= 700px) {
		$cloud-padding: 1rem;

		right: $cloud-padding;
		bottom: $cloud-padding;
		left: $cloud-padding;
	}
}
</style>
