<template>
	<span
		:class="{ input: true, 'is-empty': isEmpty }"
		contenteditable="true"
		:data-placeholder="placeholder"
		@input="onInput($event)"
		@blur="onInput($event)"
		v-text="currentValue"
	/>
</template>

<script>
export default {
	props: {
		modelValue: {
			type: String,
			default: undefined,
		},
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
	},
	emits: ["update:modelValue", "input"],
	data() {
		return { isEmpty: true };
	},
	computed: {
		currentValue() {
			return this.modelValue !== undefined ? this.modelValue : this.value;
		},
	},
	watch: {
		modelValue: function () {
			this.setEmptystate(this.currentValue);
		},
		value: function () {
			this.setEmptystate(this.currentValue);
		},
	},
	mounted() {
		this.setEmptystate(this.currentValue);
	},
	methods: {
		onInput(event) {
			const text = event.target.innerText;
			this.setEmptystate(text);
			this.$emit("update:modelValue", text);
			this.$emit("input", text);
		},
		setEmptystate(newText) {
			this.isEmpty = (newText || "") === "";
		},
	},
};
</script>
<style lang="scss" scoped>
@use "@/styles/variables";

.input {
	border: 1px solid transparent;
	border-radius: 0.125em;
	transition: border 0.3s ease;

	&:focus {
		outline: none;
		border-color: inherit;
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
