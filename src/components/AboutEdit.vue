<template>
	<ProjectCardTemplate class="card">
		<textarea
			v-model="text"
			class="about-me"
			placeholder="About me..."
			@keyup="resizeTextarea($event)"
		/>
		<div class="actions">
			<button class="button" @click="saveArticle()">Save</button>
		</div>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "./ProjectCardTemplate.vue";

import { db } from "~/plugins/firebase.js";

export default {
	name: "ProjectCard",
	components: {
		ProjectCardTemplate,
	},
	data() {
		return {
			doc: undefined,
			text: "",
		};
	},
	created() {
		db.collection("about")
			.get()
			.then((querySnapshot) => {
				const doc = querySnapshot.docs[0];
				this.doc = db.collection("about").doc(doc.id);
				this.text = doc.data().text;
			});
	},
	methods: {
		saveArticle() {
			this.doc
				.set({ text: this.text }, { merge: true })
				.then((res) => {
					this.$emit("saved", this.text);
				})
				.catch(console.error);
		},
		resizeTextarea(event) {
			event.target.style.height = `0`;
			event.target.style.height = `${event.target.scrollHeight}px`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

.card {
	padding: 0.5em;
}

.about-me {
	width: 100%;
	min-height: 5em;
}

.actions .button {
	margin: 0;
}

textarea {
	resize: vertical;
}
</style>
