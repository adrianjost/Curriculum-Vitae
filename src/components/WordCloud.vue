<template>
	<VueWordCloud
		:words="words"
		font-family="Quicksand"
		:color="colorMapping"
		:font-size-ratio="7"
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
			return `rgba(0, 0, 0, ${0.2 + (weight / this.maxValue) * 0.8})`;
		},
	},
};
</script>
