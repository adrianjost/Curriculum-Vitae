<template>
	<div>
		<TheTitle />
		<ProjectCardEdit v-if="isAuthenticated" class="projectcard" />
		<ProjectCardTemplate
			v-for="(data, index) in demoCards"
			:key="index"
			:img="data.img"
			:data="{ ...data, img: data.img + `i=${index}` }"
			:class="{ projectcard: true, inverted: index % 2 }"
		>
			<h2 class="title">
				{{ data.title }}
				<small class="category">{{ data.category }}</small>
			</h2>
			<h3 class="subtitle">{{ dateToString(data.date) }}</h3>
			<p class="description">{{ data.description }}</p>
			<div class="actions">
				<template v-if="isAuthenticated">
					<RouterLink :to="`/settings/edit/${data.id}`">
						edit
					</RouterLink>
					<button @click="deleteArticle(data.id)">delete</button>
				</template>
				<a v-if="data.src" :href="data.src">Mehr erfahren →</a>
			</div>
		</ProjectCardTemplate>
	</div>
</template>

<script>
import TheTitle from "@/components/TheTitle.vue";
import ProjectCardEdit from "@/components/ProjectCardEdit.vue";
import ProjectCardTemplate from "@/components/ProjectCardTemplate.vue";

export default {
	components: {
		TheTitle,
		ProjectCardEdit,
		ProjectCardTemplate,
	},
	computed: {
		demoCards() {
			return this.$store.getters["projects/list"];
		},
		isAuthenticated() {
			return this.$store.getters["auth/isAuthenticated"];
		},
	},
	methods: {
		deleteArticle(id) {
			if (window.confirm("sure?")) {
				this.$store.dispatch("projects/delete", id);
			}
		},
		dateToString(timestamp) {
			if (!timestamp) {
				return;
			}
			const date = new Date(Date.parse(timestamp));
			const options = { year: "numeric", month: "long" };
			return date.toLocaleDateString("de-DE", options);
		},
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
