<template>
	<BaseInput :label="label">
		<client-only>
			<VueTagsInput
				v-model="newTag"
				class="tag-input"
				:tags="value.map((item) => ({ text: item }))"
				:autocomplete-items="filteredAutocompleteItems"
				:placeholder="placeholder"
				@tags-changed="tagsChanged"
			/>
		</client-only>
	</BaseInput>
</template>

<script>
import { defineAsyncComponent } from "vue";
import BaseInput from "./BaseInput.vue";
const VueTagsInput = defineAsyncComponent(() =>
	import("@vojtechlanka/vue-tags-input").then((module) => module.VueTagsInput)
);

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
			this.$emit(
				"update",
				newTags.map((tag) => tag.text)
			);
			this.newTag = "";
		},
	},
};
</script>
<style lang="scss">
@use "@/styles/variables";

div.tag-input {
	background: transparent;
	border-radius: 4px;

	.ti-input {
		border: 0;
	}

	.ti-tag {
		background-color: variables.$color-primary;
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
