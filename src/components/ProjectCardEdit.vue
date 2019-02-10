<template>
	<ProjectCardTemplate :img="data.img">
		<template slot="image">
			<FileUpload @uploaded="uploaded" />
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

export default {
	name: "ProjectCard",
	components: {
		BaseInput,
		FileUpload,
		ContentEditable,
		ProjectCardTemplate,
	},
	props: {
		id: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			data: {},
		};
	},
	computed: {
		savedData() {
			return this.$store.getters["projects/get"](this.id);
		},
	},
	watch: {
		savedData: function(to) {
			this.importSaved(to);
		},
	},
	created() {
		this.importSaved();
	},
	methods: {
		uploaded(url) {
			this.data.img = url;
			this.$forceUpdate();
		},
		saveArticle() {
			this.$store.dispatch("projects/set", this.data);
			this.$emit("saved", this.data);
			this.data = {};
		},
		deleteArticle(id) {
			if (window.confirm("sure?")) {
				this.$store.dispatch("projects/delete", id);
				this.$emit("deleted");
			}
		},
		importSaved(newData) {
			newData = newData || this.savedData;
			if (this.id && (newData || {}).id) {
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
</style>
