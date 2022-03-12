<template>
	<ProjectCardTemplate class="grid">
		<template slot="image">
			<img
				v-if="data.img"
				:class="{ image: true, 'image--cover': data.imgCover }"
				:style="imgStyles(data)"
				:src="`https://aridbtumen.cloudimg.io/width/700/x/${data.img}`"
				:alt="`image for ${data.title}`"
			/>
			<FileUpload :class="{ invisible: data.img }" @uploaded="uploaded" />
		</template>
		<template slot="text">
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
			<BaseTagInput
				:value="data.tags"
				label="Tools"
				placeholder="C++"
				:autocomplete="autocompleteTags"
				@update="
					data.tags = $event;
					$forceUpdate();
				"
			/>
			<BaseInput
				v-model="data.src"
				label="More Info"
				name="src"
				placeholder="https://..."
			/>
			<BaseInput
				v-model="data.repo"
				label="Repo"
				name="repo"
				placeholder="https://..."
			/>
			<BaseInput
				v-model="data.npm"
				label="NPM"
				name="npm"
				placeholder="https://..."
			/>
			<BaseInput
				v-model="data.demo"
				label="Demo"
				name="demo"
				placeholder="https://..."
			/>
			<BaseInput
				v-model="data.img"
				label="Image"
				name="img-src"
				placeholder="https://..."
			/>
			<label>
				<input v-model="data.imgCover" type="checkbox" />
				Image Cover
			</label>
			<BaseInput
				v-model="data.imgPosition"
				label="Position (x y)"
				name="img-position"
				placeholder="center center"
			/>
			<label>
				<input v-model="data.isPublished" type="checkbox" />
				published
			</label>
			<div class="actions">
				<button
					v-if="savedData.id"
					class="btn-secondary"
					@click="deleteArticle(data.id)"
				>
					delete
				</button>
				<button @click="saveArticle()">Save</button>
			</div>
		</template>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "./ProjectCardTemplate.vue";
import ContentEditable from "./ui/BaseContentEditable.vue";
import BaseInput from "./ui/BaseInput.vue";
import FileUpload from "./FileUpload.vue";
import BaseTagInput from "./ui/BaseTagInput.vue";

import { db } from "~/plugins/firebase.js";

export default {
	name: "ProjectCard",
	components: {
		BaseInput,
		FileUpload,
		ContentEditable,
		ProjectCardTemplate,
		BaseTagInput,
	},
	props: {
		savedData: {
			type: Object,
			default: () => ({}),
		},
		autocompleteTags: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			data: {},
		};
	},
	watch: {
		savedData: {
			handler: function (to) {
				this.importSaved(to);
			},
			deep: true,
		},
	},
	created() {
		this.importSaved();
	},
	beforeMount() {
		this.doc = this.savedData.id
			? db.collection("projects").doc(this.savedData.id)
			: db.collection("projects");
	},
	methods: {
		uploaded(url) {
			this.data.img = url;
			this.$forceUpdate();
		},
		saveArticle() {
			const newData = this.data;
			const apiCall = this.savedData.id
				? this.doc.set(newData, { merge: true })
				: this.doc.add(newData);
			apiCall
				.then((res) => {
					if (!this.savedData.id) {
						newData.id = res.id;
						this.data = {};
					}
					this.$emit("saved", newData);
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
		imgStyles(data) {
			return data.imgPosition ? { "object-position": data.imgPosition } : {};
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

.btn-secondary {
	color: inherit;
}

.input-description {
	display: block;
}

.invisible {
	opacity: 0;
}
</style>
