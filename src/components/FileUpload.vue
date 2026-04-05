<template>
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

<script>
import { storage } from "~/plugins/firebase.js";

export default {
	data() {
		return {
			progressUpload: 0,
			uploadTask: "",
		};
	},
	watch: {
		uploadTask: function () {
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
						this.$emit("uploaded", downloadURL);
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
	},
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables";

.upload {
	position: absolute;
	inset: 5%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	color: variables.$color-primary;
	cursor: pointer;
	border: 2px dashed variables.$color-primary;
	border-radius: 2em;
	filter: drop-shadow(0 0 4px #fff);

	.progress {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 3em;
		background-color: #0808;
		transform-origin: 0 0;
	}
}

.hidden {
	display: none;
}
</style>
