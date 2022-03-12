<template>
	<div class="pills">
		<span v-for="pill in sortedData" :key="pill" class="pill">{{ pill }}</span>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		sortedData() {
			return [...this.data].sort((a, b) => a.localeCompare(b));
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

.pills {
	// prevent whitespaces to affect spacing
	display: flex;
	flex-wrap: wrap;
}

.pill {
	display: inline-block;
	padding: 8px 12px;
	margin: 4px 2px;
	font-size: 0.75em;
	text-transform: uppercase;
	background: transparent;
	border: 1px solid $color-primary;
	border-radius: 3em;
}
</style>
