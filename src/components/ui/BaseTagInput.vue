<template>
	<BaseInput :label="label">
		<no-ssr>
			<VueTagsInput
				v-model="newTag"
				class="tag-input"
				:tags="value.map((item) => ({ text: item }))"
				:autocomplete-items="filteredAutocompleteItems"
				:placeholder="placeholder"
				@tags-changed="tagsChanged"
			/>
		</no-ssr>
	</BaseInput>
</template>

<script>
import BaseInput from "./BaseInput.vue";
const VueTagsInput = () =>
	process.client ? import("@johmun/vue-tags-input") : {};

export default {
	name: "BaseTagInput",
	components: {
		BaseInput,
		VueTagsInput,
	},
	props: {
		value: {
			type: Array,
			default: () => [],
		},
		label: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		autocomplete: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			newTag: "",
		};
	},
	computed: {
		filteredAutocompleteItems() {
			return this.autocomplete
				.filter(
					(tag) => tag.toLowerCase().indexOf(this.newTag.toLowerCase()) !== -1
				)
				.map((item) => ({ text: item }));
		},
	},
	methods: {
		tagsChanged(newTags) {
			this.$emit("update", newTags.map((tag) => tag.text));
			this.newTag = "";
		},
	},
};
</script>
<style lang="scss">
@import "@/styles/variables.scss";

.tag-input {
	background: transparent;
	border-radius: 4px;
	.ti-input {
		border: 0;
	}
	.ti-tag {
		background-color: $color-primary;
	}
	.ti-autocomplete {
		width: calc(100% + 2px);
		margin-right: -1px;
		margin-left: -1px;
		overflow: hidden;
		background-color: #ccc;
		border: 0;
		border-bottom-right-radius: 4px;
		border-bottom-left-radius: 4px;
		transform: translateY(-5px);
	}
}
</style>
