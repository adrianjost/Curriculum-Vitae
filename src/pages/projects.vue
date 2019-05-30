<template>
	<div>
		<transition name="fade">
			<div class="feature-toggle-wrapper">
				<button
					v-if="featuredOnly"
					class="feature-toggle"
					type="button"
					@click="showAll"
				>
					VIEW ALL PROJECTS
				</button>
			</div>
		</transition>
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

import transition from "~/mixins/transition";

export default {
	head: {
		title: "Projects",
	},

	components: {
		ProjectCard,
		TheBottomNav,
	},
	mixins: [transition],
	data() {
		return {
			featuredOnly: true,
			ctas: {
				right: { to: "/", text: "About Me" },
			},
		};
	},
	computed: {
		featuredProjects() {
			return this.allProjects.filter((project) => project.featured);
		},
		allProjects() {
			return this.$store.getters.getProjects;
		},
		projects() {
			return this.featuredOnly ? this.featuredProjects : this.allProjects;
		},
	},
	methods: {
		showAll() {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
			this.featuredOnly = false;
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
.feature-toggle-wrapper {
	position: sticky;
	top: 1rem;
	z-index: 2;
	display: flex;
	justify-content: center;
}
.feature-toggle {
	padding: 8px 16px;
	margin-bottom: 0.5 * $spacing-cards;
	background: white;
	border: none;
	border-radius: 64px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
