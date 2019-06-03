<template>
	<ProjectCardTemplate class="grid">
		<div slot="image" style="position: relative;width: 100%;height: 100%;">
			<ProjectImage
				:alt="`image for ${data.title}`"
				:image-cover="data.imgCover"
				:image-position="data.imgPosition"
				:src="`https://aridbtumen.cloudimg.io/width/700/x/${data.img}`"
				:src-placeholder="
					data.imgPlaceholder ||
						`https://aridbtumen.cloudimg.io/width/30/x/${data.img}`
				"
			/>
		</div>

		<template slot="text">
			<h2 class="title">
				{{ data.title }}
			</h2>
			<h3 class="subtitle">
				<span class="category">{{ data.category }}</span> -
				{{ dateToString(data.date) }}
			</h3>
			<p class="description">{{ data.description }}</p>
			<b>Used Tools:</b>
			<Pills :data="data.tags" />
			<div v-if="false" class="actions">
				<a v-if="data.src" target="_blank" rel="noreferrer" :href="data.src">
					Read more →
				</a>
			</div>
		</template>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "~/components/ProjectCardTemplate.vue";
import Pills from "~/components/Pills.vue";
import ProjectImage from "~/components/ProjectImage.vue";

export default {
	components: { ProjectCardTemplate, Pills, ProjectImage },
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
			return date.toLocaleDateString("en-US", options);
		},
	},
};
</script>

<style lang="scss" scoped>
/deep/ {
	.v-lazy-image {
		filter: blur(10px);
		transition: filter 0.7s;
	}

	.v-lazy-image-loaded {
		filter: blur(0);
	}
}
</style>
