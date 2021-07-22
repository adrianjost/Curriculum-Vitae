<template>
	<div>
		<section
			v-for="year of projectYears"
			:id="year"
			:key="year"
			class="section-year"
		>
			<h2 class="section-year_title">
				{{ year }}
			</h2>

			<div class="project-cards">
				<ProjectCard
					v-for="(data, index) in projectsByYears[year]"
					:id="data.id"
					:key="index"
					:data="data"
					class="project-card"
					:class="{
						inverted: index % 2,
					}"
				/>
			</div>
		</section>
		>

		<TheBottomNav class="bottom-nav" :links="ctas" />
	</div>
</template>

<script>
import ProjectCard from "~/components/ProjectCard.vue";
import TheBottomNav from "~/components/TheBottomNav.vue";

import transition from "~/mixins/transition";

export default {
	components: {
		ProjectCard,
		TheBottomNav,
	},
	mixins: [transition],
	data() {
		return {
			ctas: {
				right: { to: "/", text: "About Me" },
			},
		};
	},
	head: {
		title: "Projects",
	},
	computed: {
		projects() {
			return this.$store.getters.getProjects;
		},
		projectsByYears() {
			const projectsByYears = {};
			this.projects.forEach((project) => {
				const year = project.date.split("-")[0];
				if (!projectsByYears[year]) {
					projectsByYears[year] = [];
				}
				projectsByYears[year].push(project);
			});
			return projectsByYears;
		},
		projectYears() {
			return Object.keys(this.projectsByYears).sort((a, b) => {
				return b - a;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

.section-year {
	margin-bottom: 6rem;
	.section-year_title {
		padding: 0 0 ($spacing-cards / 3);
		color: #fff;
	}
}
.project-cards {
	display: grid;
	grid-auto-columns: calc(100% - 2.5rem);
	grid-auto-flow: column;
	grid-gap: 2rem;
	padding: 0 1rem;
	padding-bottom: 1rem;
	margin: 0 -1rem;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	scroll-snap-type: x mandatory;
	scroll-snap-align: center;

	.project-card {
		box-shadow: none;
		// min-width: 250px;

		// margin: $spacing-cards 0;
		&:first-of-type {
			margin-top: 0;
		}
		&:last-of-type {
			margin-bottom: 0;
		}
	}

	&::after {
		display: block;
		width: 1rem;
		content: "";
	}
}
</style>
