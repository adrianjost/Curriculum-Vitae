<template>
	<div>
		<ProjectCardTemplate
			v-for="(data, index) in projects"
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
				<a v-if="data.src" target="_blank" :href="data.src">Read more →</a>
			</div>
		</ProjectCardTemplate>
	</div>
</template>

<script>
import ProjectCardTemplate from "@/components/ProjectCardTemplate.vue";
import fetch from "isomorphic-fetch";

export default {
	async asyncData(context) {
		// check if you got a payload first
		if (context.payload) {
			// extract the user object passed from nuxt.config.js
			return { projects: context.payload.project };
		} else {
			// if you got no context, go ahead and make the API request
			try {
				const res = await fetch(
					`https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/`
				);
				const data = await res.json();
				return { projects: data.data };
			} catch (error) {
				return { projects: {} };
			}
		}
	},
	components: {
		ProjectCardTemplate,
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
