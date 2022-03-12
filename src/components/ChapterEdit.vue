<template>
	<ProjectCardTemplate class="grid">
		<template slot="image">
			<img
				v-if="data.img"
				class="image"
				:src="`https://aridbtumen.cloudimg.io/width/100/x/${data.img}`"
				:alt="`image for ${data.title}`"
			/>
			<FileUpload :class="{ invisible: data.img }" @uploaded="uploaded" />
		</template>
		<template slot="text">
			<h2 class="title">
				<ContentEditable v-model="data.title" placeholder="Titel" />
			</h2>
			<div class="subtitle">
				<ContentEditable v-model="data.subtitle" placeholder="Subtitle" />
				<div class="daterange">
					<BaseInput
						v-model="data.from"
						class="dateinput"
						type="date"
						label="From"
						name="timestamp"
						placeholder="dd.mm.yyyy"
					/>
					<BaseInput
						v-model="data.to"
						class="dateinput"
						type="date"
						label="Until"
						name="timestamp"
						placeholder="dd.mm.yyyy"
					/>
				</div>
			</div>
			<BaseInput
				v-model="data.img"
				label="Image"
				name="img-src"
				placeholder="https://..."
			/>
			<BaseInput label="Section">
				<select v-model="data.section" class="input">
					<option value="work">Work</option>
					<option value="education">Education</option>
				</select>
			</BaseInput>
			<BaseInput class="description" label="Description">
				<ContentEditable
					v-model="data.description"
					class="input-description"
					placeholder="you are awesome!"
				/>
			</BaseInput>
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
			? db.collection("chapters").doc(this.savedData.id)
			: db.collection("chapters");
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

.subtitle {
	margin: 0;
}

.daterange {
	display: flex;
	flex-wrap: wrap;

	@media screen and (min-width: 700px) {
		flex-wrap: nowrap;

		.dateinput {
			flex: 1;

			&:not(:first-of-type) {
				margin-left: 0.5rem;
			}

			&:not(:last-of-type) {
				margin-right: 0.5rem;
			}
		}
	}
}

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
