<template>
	<div>
		<label :class="{ 'with-error': withError }">
			<span
				:class="{ label: true, active: internalValue && internalValue !== 0 }"
			>
				{{ label }}
			</span>
			<slot>
				<input
					v-model="internalValue"
					class="input"
					:type="type"
					v-bind="$attrs"
				/>
			</slot>
		</label>
		<small
			v-if="withError"
			:style="{ visibility: error ? 'visible' : 'hidden' }"
			class="error"
		>
			{{ error ? error : "valid input" }}
		</small>
	</div>
</template>

<script>
export default {
	name: "BaseInput",
	props: {
		value: {
			type: String,
			default: "",
		},
		label: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "text",
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
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables";

$input-padding-left: 12px;

label {
	position: relative;
	clear: both;
	display: block;
	margin: 0;
	border: 1px solid variables.$color-text;
	border-radius: 4px;

	&:first-of-type {
		margin-top: 1rem;
	}
}

.label {
	position: absolute;
	top: 0;
	left: $input-padding-left;
	z-index: 5;
	font-size: 0.75em;
	line-height: 1;
	background: #fff;
	border-right: 1px solid #fff;
	border-left: 1px solid #fff;
	transform: translateY(-0.75em);
}

.input {
	width: 100%;
	padding: 8px $input-padding-left;
	outline: none;
	background: transparent;
	border: none;
	border-radius: 4px;
	transition: color 0.2s linear;

	&:focus {
		color: variables.$color-text;
	}
}

.error {
	color: variables.$color-secondary;
}
</style>
