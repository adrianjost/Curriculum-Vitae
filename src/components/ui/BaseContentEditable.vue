<template>
	<span
		:class="{ input: true, 'is-empty': isEmpty }"
		contenteditable="true"
		:data-placeholder="placeholder"
		@input="onInput($event)"
		@blur="onInput($event)"
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
		modelValue: function (newVal) {
			this.updateContent(newVal);
		},
		value: function (newVal) {
			this.updateContent(newVal);
		},
	},
	mounted() {
		this.updateContent(this.currentValue);
	},
	methods: {
		updateContent(newText) {
			// Only update if the text actually changed to avoid cursor jumping
			if (this.$el.innerText !== newText) {
				this.$el.innerText = newText;
			}
			this.setEmptystate(newText);
		},
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
