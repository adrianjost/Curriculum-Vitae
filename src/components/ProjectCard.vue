<template>
	<ProjectCardTemplate class="grid">
		<div slot="image" style="position: relative; width: 100%; height: 100%">
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

		<template #text>
			<h2 class="title">
				{{ data.title }}
			</h2>
			<h3 class="subtitle">
				<span class="category">{{ data.category }}</span> -
				{{ dateToString(data.date) }}
			</h3>
			<p class="description">{{ data.description }}</p>
			<b>Used Tools:</b>
			<Pills :data="data.tags" class="tools" />
			<template v-if="data.repo || data.demo || data.npm || data.src">
				<b>Links:</b>
				<div class="actions">
					<div class="actions icon-actions">
						<a
							v-if="data.repo"
							:href="data.repo"
							target="_blank"
							rel="noreferrer"
							class="action"
							title="check out the code repository"
						>
							<img
								class="action-icon"
								alt="GitHub Logo"
								src="@/static/Icon-GitHub.svg"
								width="36"
								height="36"
								loading="lazy"
							/>
						</a>
						<a
							v-if="data.npm"
							:href="data.npm"
							target="_blank"
							rel="noreferrer"
							class="action"
							title="view the published package"
						>
							<img
								class="action-icon"
								alt="NPM Logo"
								src="@/static/Icon-NPM.svg"
								width="36"
								height="36"
								loading="lazy"
							/>
						</a>
						<a
							v-if="data.demo"
							:href="data.demo"
							target="_blank"
							rel="noreferrer"
							class="action"
							title="show me more"
						>
							<img
								class="action-icon"
								alt="Play Icon"
								src="@/static/Icon-Demo.svg"
								width="36"
								height="36"
								loading="lazy"
							/>
						</a>
					</div>
					<a v-if="data.src" target="_blank" rel="noreferrer" :href="data.src">
						Read more →
					</a>
				</div>
			</template>
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

.tools {
	&:not(:last-of-type) {
		margin-bottom: 1em;
	}
}

.actions {
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 0;
	&.icon-actions {
		margin: 0;
	}
	.action-icon {
		height: 2em;
	}
}
</style>
