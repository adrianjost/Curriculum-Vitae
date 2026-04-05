<template>
	<div
		tabindex="0"
		class="click-area"
		@click="toggleZoom"
		@keydown.prevent.enter="toggleZoom"
		@keydown.prevent.space="toggleZoom"
		@keydown.tab="preventIfFullscreen"
		@keydown.prevent.esc="zoomOut"
	>
		<div :class="{ 'image-wrapper': true, zoomed: isZoomed }">
			<VLazyImage
				v-bind="$attrs"
				:style="{ 'object-position': imagePosition }"
				:class="{
					'image--cover': imageCover,
					image: true,
					isZoomed,
				}"
			/>
		</div>
		<div :class="{ frame: true, visible: isZoomed }" />
		<div class="hint">click to zoom</div>
	</div>
</template>

<script>
import VLazyImage from "v-lazy-image";

export default {
	components: {
		VLazyImage,
	},
	props: {
		isZoomedIn: {
			type: Boolean,
		},
		imageCover: {
			type: Boolean,
		},
		imagePosition: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			isZoomed: false,
		};
	},
	computed: {
		toggleZoom() {
			return this.isZoomed ? this.zoomOut : this.zoomIn;
		},
	},
	methods: {
		zoomIn() {
			window.addEventListener("scroll", this.zoomOut);
			this.isZoomed = true;
			this.$emit("update:isZoomedIn", true);
		},
		zoomOut() {
			window.removeEventListener("scroll", this.zoomOut);
			this.isZoomed = false;
		},
		preventIfFullscreen(event) {
			if (this.isZoomed) {
				event.preventDefault();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/styles/variables";

.click-area {
	width: 100%;
	height: 100%;
	user-select: none;

	.hint {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.5rem;
		text-align: center;
		background: #fff;
		box-shadow: 0 0 10px 0 rgb(0 0 0 / 25%);
		opacity: 0;
		transition: opacity 0.3s ease-in-out 0.1s;
	}

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		cursor: zoom-in;
		content: "";
		border: 3px solid variables.$color-secondary;
		opacity: 0;
		transition: opacity 0.3s ease-in-out 0.1s;
	}

	&:focus {
		outline: none;

		&::before,
		.hint {
			opacity: 1;
		}
	}
}

.image {
	object-fit: contain;

	&.image--cover {
		object-fit: cover;
	}
}

.image-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	cursor: zoom-in;
	transition: all 0.4s cubic-bezier(0.08, 0.69, 0.2, 0.99);

	&.zoomed {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 4;
		cursor: zoom-out;

		.image {
			object-fit: contain !important;
			object-position: center center !important;
		}
	}
}

.frame {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 3;
	width: 100%;
	height: 100%;
	pointer-events: none;
	background: #fff;
	opacity: 0;
	transition: opacity 0.2s ease-in-out;

	&.visible {
		opacity: 1;
	}
}
</style>
