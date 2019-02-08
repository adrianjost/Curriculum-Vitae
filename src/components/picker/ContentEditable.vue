<template>
	<span
		:class="{ isEmpty: value === '' }"
		contenteditable="true"
		@input="$emit('input', $event.target.innerText)"
	/>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: "",
		},
	},
};
</script>
<style scoped>
.isEmpty {
	display: inline-block;
	min-width: 5ch;
	min-height: 1em;
	border-bottom: 1px solid #000;
}
</style>
