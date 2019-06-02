<template>
	<div
		tabindex="0"
		class="click-area"
		@click="toggleZoom"
		@keydown.enter="toggleZoom"
		@keydown.tab="preventIfFullscreen"
		@keydown.esc="zoomOut"
	>
		<ZoomImage
			:pose="pose"
			:class="{ 'image-wrapper': true, zoomed: isZoomed }"
		>
			<VLazyImage
				v-bind="$attrs"
				:style="{ 'object-position': imagePosition }"
				:class="{
					'image--cover': imageCover,
					image: true,
					isZoomed,
				}"
			/>
		</ZoomImage>
		<Frame :pose="pose" class="frame" />
		<div class="hint">
			click to zoom
		</div>
	</div>
</template>

<script>
import VLazyImage from "v-lazy-image";

import posed from "vue-pose";

const transition = {
	duration: 400,
	ease: [0.08, 0.69, 0.2, 0.99],
};

export default {
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
		pose() {
			return this.isZoomed ? "zoomedIn" : "zoomedOut";
		},
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
	components: {
		VLazyImage,
		Frame: posed.div({
			zoomedOut: {
				applyAtEnd: { display: "none" },
				opacity: 0,
			},
			zoomedIn: {
				applyAtStart: { display: "block" },
				opacity: 1,
			},
		}),
		ZoomImage: posed.div({
			zoomedOut: {
				position: "absolute",
				width: "100%",
				height: "100%",
				transition,
				flip: true,
			},
			zoomedIn: {
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				transition,
				flip: true,
			},
		}),
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

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
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
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
		border: 3px solid $color-secondary;
		opacity: 0;
		transition: opacity 0.3s ease-in-out 0.1s;
	}
	&:focus {
		outline: none;
		&:not(:hover)::before,
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
	width: 100%;
	height: 100%;
	cursor: zoom-in;
	&.zoomed {
		z-index: 4;
		cursor: zoom-out;
		.image {
			object-position: center center !important;
			object-fit: contain !important;
		}
	}
}
.frame {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 3;
	display: none;
	width: 100%;
	height: 100%;
	background: #fff;
}
</style>
