<template>
	<label>
		<span
			:class="{ label: true, active: internalValue && internalValue !== 0 }"
		>
			{{ label }}
		</span>
		<textarea ref="textArea" v-model="internalValue" v-bind="$attrs"
	/></label>
</template>

<script>
import autosize from "autosize";
export default {
	name: "BaseTextarea",
	props: {
		value: {
			type: String,
			default: "",
		},
		label: {
			type: String,
			default: "",
		},
	},
	data() {
		return { internalValue: this.value };
	},
	watch: {
		internalValue: function(to) {
			if (to !== this.value) {
				this.$emit("input", to);
			}
		},
		value: function(to) {
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
label {
	position: relative;
	display: block;
	margin: 1em 0 0.75em;
	clear: both;
}
.label {
	position: absolute;
	top: 0;
	left: $input-padding-left;
	font-size: 0.75em;
	background: #fff;
	border-right: 1px solid #fff;
	border-left: 1px solid #fff;
	transform: translateY(-0.75em);
}
textarea {
	width: 100%;
	padding: 8px $input-padding-left;
	resize: vertical !important;
	background: transparent;
	border: 1px solid $color-text;
	border-radius: 4px;
	outline: none;
	transition: color 0.2s linear;
	&:focus {
		color: $color-text;
	}
}
</style>
