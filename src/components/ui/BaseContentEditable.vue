<template>
	<span
		:class="{ input: true, 'is-empty': isEmpty }"
		contenteditable="true"
		:data-placeholder="placeholder"
		@input="setEmptystate($event.target.innerText)"
		@blur="$emit('input', $event.target.innerText)"
		v-text="value"
	/>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
	},
	data() {
		return { isEmpty: true };
	},
	methods: {
		setEmptystate(newText) {
			this.isEmpty = newText === "";
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.input {
	border-bottom: 1px solid transparent;
	transition: border 0.3s ease;
	&:focus {
		border-bottom-color: inherit;
		outline: none;
	}
}
.is-empty {
	display: inline-block;
	&[data-placeholder]::after {
		content: attr(data-placeholder);
		opacity: 0.5;
	}
}
</style>
