<template>
	<div>
		<ChapterEdit @saved="addChapter($event)" />
		<ChapterEdit
			v-for="data in sortedChapters"
			:key="data.id"
			class="chapter"
			:saved-data="data"
			:autocomplete-tags="tags"
			@saved="sortedChapters = getSortedChapters()"
			@deleted="removeChapter(data.id)"
		/>
	</div>
</template>
<script>
import { db } from "~/plugins/firebase.js";

import ChapterEdit from "~/components/ChapterEdit.vue";

export default {
	layout: "admin",
	components: { ChapterEdit },
	data() {
		return {
			chapters: [],
			sortedChapters: [],
		};
	},
	computed: {
		tags() {
			return this.chapters
				.map((project) => project.tags || [])
				.reduce(
					(acc, tags) => acc.concat(tags.filter((tag) => !acc.includes(tag))),
					[]
				);
		},
	},
	mounted() {
		this.fetchChapters();
	},
	methods: {
		async fetchChapters() {
			this.chapters = await db
				.collection("chapters")
				.get()
				.then((querySnapshot) => {
					return querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
				});
			this.sortedChapters = this.getSortedChapters(this.chapters);
		},
		addChapter(project) {
			this.chapters.push(project);
			this.sortedChapters = this.getSortedChapters(this.chapters);
		},
		removeChapter(id) {
			const projectIndex = this.chapters.findIndex(
				(project) => project.id === id
			);
			if (projectIndex === -1) {
				return;
			}
			this.chapters.splice(projectIndex, 1);
			this.sortedChapters = this.getSortedChapters(this.chapters);
		},
		getSortedChapters(chapters) {
			if (!chapters) {
				chapters = this.chapters;
			}
			return chapters.slice(0).sort((a, b) => b.to.localeCompare(a.to));
		},
	},
};
</script>

<style lang="scss" scoped>
$space-between: 5rem;
$space-around: 2rem;
.chapter {
	margin-top: $space-between;
	margin-bottom: $space-between;
	&:first-of-type {
		margin-top: $space-around;
	}
	&:last-of-type {
		margin-bottom: $space-around;
	}
}
</style>
