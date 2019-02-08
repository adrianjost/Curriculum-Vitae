<template>
	<ProjectCardTemplate :img="data.img">
		<template slot="image">
			<FileUpload @url="upload" />
		</template>
		<h2 class="title">
			<ContentEditable v-model="data.title" placeholder="Titel" />
			<small class="category">
				<ContentEditable v-model="data.category" placeholder="Category" />
			</small>
		</h2>
		<p class="description">
			<ContentEditable
				v-model="data.description"
				placeholder="you are awesome!"
			/>
		</p>
		<BaseInput
			v-model="data.date"
			type="date"
			label="Date"
			name="timestamp"
			placeholder="dd.mm.yyyy"
		/>
		<BaseInput
			v-model="data.src"
			label="Link"
			name="src"
			placeholder="https://..."
		/>
		<label>
			<input v-model="data.isPublished" type="checkbox" />
			published
		</label>
		<div class="actions">
			<button class="button" @click="saveArticle()">Save</button>
		</div>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "./ProjectCardTemplate.vue";
import ContentEditable from "./ui/BaseContentEditable.vue";
import BaseInput from "./ui/BaseInput.vue";
import FileUpload from "./FileUpload.vue";

import { firebase } from "@firebase/app";
import "@firebase/storage";
const storage = firebase.storage();

export default {
	name: "ProjectCard",
	components: {
		BaseInput,
		FileUpload,
		ContentEditable,
		ProjectCardTemplate,
	},
	data() {
		return {
			data: {},
		};
	},
	methods: {
		upload(url) {
			this.data.img = url;
			this.$forceUpdate();
		},
		saveArticle() {
			this.$store.dispatch("projects/set", this.data);
			this.data = {};
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.button {
	color: inherit;
}
</style>
