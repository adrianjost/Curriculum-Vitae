<template>
	<div>
		<TheTitle />
		<ProjectCardEdit v-if="isAuthenticated" class="projectcard" />
		<ProjectCardTemplate
			v-for="(data, index) in articles"
			:id="data.id"
			:key="index"
			:img="data.img"
			:data="{ ...data, img: data.img + `i=${index}` }"
			:class="{ projectcard: true, inverted: index % 2 }"
		>
			<h2 class="title">
				{{ data.title.trim()
				}}<small class="category">{{ data.category.trim() }}</small>
			</h2>
			<h3 class="subtitle">{{ dateToString(data.date) }}</h3>
			<p class="description">{{ data.description }}</p>
			<div class="actions">
				<template v-if="isAuthenticated">
					<button
						:checked="data.isPublished"
						type="checkbox"
						@click="setPublishState(data, !data.isPublished)"
					>
						{{ data.isPublished ? "unpublish" : "publish" }}
					</button>
					<RouterLink :to="`/${data.id}/edit`">
						edit
					</RouterLink>
				</template>
				<a v-if="data.src" target="_blank" :href="data.src">Read more →</a>
			</div>
		</ProjectCardTemplate>
	</div>
</template>

<script>
import TheTitle from "@/components/TheTitle.vue";
const ProjectCardEdit = () =>
	import(/* webpackChunkName: "view-[request]" */ "@/components/ProjectCardEdit.vue");
import ProjectCardTemplate from "@/components/ProjectCardTemplate.vue";

export default {
	components: {
		TheTitle,
		ProjectCardEdit,
		ProjectCardTemplate,
	},
	computed: {
		articles() {
			return this.$store.getters["projects/list"];
		},
		isAuthenticated() {
			return this.$store.getters["auth/isAuthenticated"];
		},
	},
	methods: {
		dateToString(timestamp) {
			if (!timestamp) {
				return;
			}
			const date = new Date(Date.parse(timestamp));
			const options = { year: "numeric", month: "long" };
			return date.toLocaleDateString("de-DE", options);
		},
		setPublishState(obj, state) {
			obj.isPublished = state;
			this.$store.dispatch("projects/set", obj);
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
