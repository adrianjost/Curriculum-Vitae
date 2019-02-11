<template>
	<ProjectCardTemplate :img="data.img">
		<h2 class="title">
			{{ data.title }}
		</h2>
		<h3 class="subtitle">
			<span class="category">{{ data.category }}</span> -
			{{ dateToString(data.date) }}
		</h3>
		<p class="description">{{ data.description }}</p>
		<div class="actions">
			<a v-if="data.src" target="_blank" :href="data.src">Read more →</a>
		</div>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "@/components/ProjectCardTemplate.vue";

export default {
	components: { ProjectCardTemplate },
	props: {
		data: {
			type: Object,
			required: true,
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
	},
};
</script>
