<template>
	<BaseInput
		:label="label"
		:with-error="withError"
		:error="error"
		v-bind="$attrs"
	>
		<textarea ref="textArea" v-model="internalValue" rows="3" v-bind="$attrs" />
	</BaseInput>
</template>

<script>
import BaseInput from "./BaseInput.vue";

import autosize from "autosize";
export default {
	name: "BaseTextarea",
	components: { BaseInput },
	props: {
		value: {
			type: String,
			default: "",
		},
		label: {
			type: String,
			default: "",
		},
		withError: {
			type: Boolean,
			default: false,
		},
		error: {
			type: String,
			default: "",
		},
	},
	data() {
		return { internalValue: this.value };
	},
	watch: {
		internalValue: function (to) {
			if (to !== this.value) {
				this.$emit("input", to);
			}
		},
		value: function (to) {
			if (to !== this.internalValue) {
				this.internalValue = to;
			}
		},
	},
	mounted() {
		autosize(this.$refs.textArea);
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";
$input-padding-left: 12px;

textarea {
	width: 100%;
	padding: 8px $input-padding-left;
	resize: vertical !important;
	background: transparent;
	border: 0;
	border-radius: 4px;
	outline: none;
	transition: color 0.2s linear;
	&:focus {
		color: $color-text;
	}
}
</style>
