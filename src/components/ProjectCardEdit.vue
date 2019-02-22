<template>
	<ProjectCardTemplate>
		<template slot="image">
			<img
				v-if="data.img"
				class="image--contain"
				:src="`https://aridbtumen.cloudimg.io/width/700/x/${data.img}`"
				:alt="`image for ${data.title}`"
			/>
			<FileUpload :class="{ invisible: data.img }" @uploaded="uploaded" />
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
				class="input-description"
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
			<button @click="deleteArticle(data.id)">delete</button>
		</div>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "./ProjectCardTemplate.vue";
import ContentEditable from "./ui/BaseContentEditable.vue";
import BaseInput from "./ui/BaseInput.vue";
import FileUpload from "./FileUpload.vue";

import { db } from "~/plugins/firebase.js";

export default {
	name: "ProjectCard",
	components: {
		BaseInput,
		FileUpload,
		ContentEditable,
		ProjectCardTemplate,
	},
	props: {
		savedData: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			data: {},
			doc: undefined,
		};
	},
	watch: {
		savedData: {
			handler: function(to) {
				this.importSaved(to);
			},
			deep: true,
		},
	},
	created() {
		this.importSaved();
	},
	beforeMount() {
		if (this.savedData.id) {
			this.doc = db.collection("projects").doc(this.savedData.id);
		} else {
			this.doc = db.collection("projects");
		}
	},
	methods: {
		uploaded(url) {
			this.data.img = url;
			this.$forceUpdate();
		},
		saveArticle() {
			let apiCall;
			if (this.savedData.id) {
				apiCall = this.doc.set(this.data, { merge: true });
			} else {
				apiCall = this.doc.add(this.data);
			}
			apiCall
				.then((res) => {
					const newData = this.data;
					newData.id = res.id;
					this.$emit("saved", newData);
					if (!this.savedData.id) {
						this.data = {};
					}
				})
				.catch(console.error);
		},
		deleteArticle(id) {
			if (window.confirm("sure?")) {
				this.doc
					.delete()
					.then(() => {
						this.$emit("deleted");
					})
					.catch(console.error);
			}
		},
		importSaved(newData) {
			newData = newData || this.savedData || {};
			if (newData.id) {
				this.data = newData;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.button {
	color: inherit;
}
.input-description {
	display: block;
}
.image--contain {
	width: 100%;
	height: 100%;
	object-fit: contain;
}
.invisible {
	opacity: 0;
}
</style>
