<template>
	<ProjectCardTemplate
		:id="data.id"
		:img="data.img"
		:data="{ ...data, img: data.img }"
		:class="{ projectcard: true }"
	>
		<h2 class="title">
			{{ data.title }}<small class="category">{{ data.category }}</small>
		</h2>
		<h3 class="subtitle">{{ dateToString(data.date) }}</h3>
		<p class="description">{{ data.description }}</p>
		<div class="actions">
			<a v-if="data.src" target="_blank" :href="data.src">Read more →</a>
		</div>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "@/components/ProjectCardTemplate.vue";

import fetch from "isomorphic-fetch";

export default {
	components: {
		ProjectCardTemplate,
	},
	async asyncData({ payload, params }) {
		// check if you got a payload first
		if (payload) {
			// extract the user object passed from nuxt.config.js
			return { data: payload };
		} else {
			// if you got no context, go ahead and make the API request
			try {
				const res = await fetch(
					`https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/${
						params.id
					}`
				);
				const data = await res.json();
				return { data: data.data };
			} catch (error) {
				return { data: {} };
			}
		}
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
