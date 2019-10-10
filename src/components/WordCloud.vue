<template>
	<VueWordCloud
		:words="relevantWords"
		font-family="Quicksand"
		:color="colorMapping"
		:font-size-ratio="6"
		:spacing="0.5"
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
		relevantWords() {
			return this.words.filter((skill) => skill[1] > 0);
		},
		maxValue() {
			return Math.max(...this.relevantWords.map((skill) => skill[1]));
		},
	},
	methods: {
		colorMapping([, weight]) {
			return `rgba(0, 0, 0, ${Math.min(0.3 + weight / this.maxValue, 1)})`;
		},
	},
};
</script>
