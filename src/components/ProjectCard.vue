<template>
	<ProjectCardTemplate>
		<picture slot="image" :alt="'image for' + data.title">
			<source
				v-for="breakpoint in imgBreakpoints"
				:key="breakpoint.break"
				:media="`(min-width: ${breakpoint.break}px)`"
				:srcset="
					`https://aridbtumen.cloudimg.io/width/${breakpoint.size}/x/${
						data.img
					}`
				"
			/>
			<img
				class="image--contain"
				:src="`https://aridbtumen.cloudimg.io/width/700/x/${data.img}`"
			/>
		</picture>

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
	data() {
		return {
			// breakpoint
			imgBreakpoints: [
				{
					break: 950,
					size: 700,
				},
				{
					break: 550,
					size: 650,
				},
				{
					break: 300,
					size: 300,
				},
			],
		};
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
<style scoped>
.image--contain {
	width: 100%;
	height: 100%;
	object-fit: contain;
}
</style>
