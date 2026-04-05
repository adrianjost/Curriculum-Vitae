<template>
	<div class="cloud" aria-label="Skills word cloud">
		<span
			v-for="entry in cloudWords"
			:key="entry.word"
			class="word"
			:style="entry.style"
		>
			{{ entry.word }}
		</span>
		<ul class="sr-only">
			<li v-for="[word] in normalizedWords" :key="`text-${word}`">
				{{ word }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		words: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		normalizedWords() {
			const dynamicWords = this.words
				.filter((entry) => Array.isArray(entry) && entry.length >= 2)
				.map(([word, weight]) => [String(word), Number(weight) || 1]);

			return dynamicWords.length ? dynamicWords : [];
		},
		maxValue() {
			if (!this.normalizedWords.length) {
				return 1;
			}

			return Math.max(...this.normalizedWords.map(([, weight]) => weight), 1);
		},
		cloudWords() {
			const count = this.normalizedWords.length || 1;

			return this.normalizedWords.map(([word, weight], index) => {
				const ratio = Math.min(weight / this.maxValue, 1);
				const progress = (index + 1) / count;
				const angle = index * 2.399963229728653;
				const radius = Math.sqrt(progress) * 45;
				const x = Math.cos(angle) * radius;
				const y = Math.sin(angle) * radius;

				return {
					word,
					style: {
						left: `calc(50% + ${x.toFixed(2)}%)`,
						top: `calc(50% + ${y.toFixed(2)}%)`,
						fontSize: `${1 + ratio * 2.2}rem`,
						opacity: 0.45 + ratio * 0.55,
						zIndex: Math.round(10 + ratio * 10),
					},
				};
			});
		},
	},
};
</script>

<style scoped>
.cloud {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	font-family: Quicksand, Roboto, Helvetica, sans-serif;
	line-height: 1;
}

.word {
	position: absolute;
	word-break: keep-all;
	white-space: nowrap;
	user-select: none;
	transform: translate(-50%, -50%);
}

.sr-only {
	max-height: 0;
	padding: 0;
	margin: 0;
	overflow: hidden;
	font-size: 0;
	line-height: 0;
	opacity: 0;
}
</style>
