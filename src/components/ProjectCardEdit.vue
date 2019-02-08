<template>
	<ProjectCardTemplate :img="data.img">
		<template slot="image">
			<label class="upload">
				Choose a file
				<div
					class="progress"
					:style="{ transform: 'scaleX(' + progressUpload / 100 + ')' }"
				></div>
				<input
					class="hidden"
					type="file"
					accept="image/*"
					@change="detectFiles($event.target.files)"
				/>
			</label>
		</template>
		<template slot="title"
			><ContentEditable v-model="data.title"
		/></template>
		<template slot="category"
			><ContentEditable v-model="data.category"
		/></template>
		<template slot="description"
			><ContentEditable v-model="data.description"
		/></template>
		<template slot="actions"
			><button class="button" @click="saveArticle()">Save</button></template
		>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "./ProjectCardTemplate.vue";
import ContentEditable from "./picker/ContentEditable.vue";

import { firebase } from "@firebase/app";
import "@firebase/storage";
const storage = firebase.storage();

export default {
	name: "ProjectCard",
	components: {
		ContentEditable,
		ProjectCardTemplate,
	},
	data() {
		return {
			data: {},
			progressUpload: 0,
			file: File,
			uploadTask: "",
		};
	},
	watch: {
		uploadTask: function() {
			this.uploadTask.on(
				"state_changed",
				(sp) => {
					this.progressUpload = Math.floor(
						(sp.bytesTransferred / sp.totalBytes) * 100
					);
				},
				null,
				() => {
					this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
						this.data.img = downloadURL;
						this.$emit("url", downloadURL);
						this.$forceUpdate();
					});
				}
			);
		},
	},
	methods: {
		detectFiles(fileList) {
			Array.from(fileList).forEach((file) => {
				this.upload(file);
			});
		},
		upload(file) {
			this.uploadTask = storage.ref(file.name).put(file);
		},
		saveArticle() {
			this.$store.dispatch("projects/set", this.data);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.upload {
	position: absolute;
	top: 5%;
	right: 5%;
	bottom: 5%;
	left: 5%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	color: #999;
	border: 2px dashed #999;
	border-radius: 2em;
	.progress {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 3em;
		background-color: #0808;
		transform-origin: 0 0;
	}
}
.button {
	color: inherit;
}
.hidden {
	display: none;
}
</style>
