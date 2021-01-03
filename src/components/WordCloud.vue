<template>
	<VueWordCloud
		:words="words"
		font-family="Quicksand, sans-serif"
		:color="colorMapping"
		:font-size-ratio="5"
		:spacing="0.7"
	/>
</template>

<script>
import VueWordCloud from "vuewordcloud";

export default {
	components: {
		VueWordCloud,
	},
	props: {
		words: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		maxValue() {
			return Math.max(...this.words.map((skill) => skill[1]));
		},
	},
	methods: {
		colorMapping([, weight]) {
			return `rgba(0, 0, 0, ${0.5 + (weight / this.maxValue) * 0.8})`;
		},
	},
};
</script>
