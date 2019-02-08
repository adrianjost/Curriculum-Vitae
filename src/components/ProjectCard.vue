<template>
	<ProjectCardTemplate :img="data.img">
		<div slot="image"></div>
		<template slot="title">{{ data.title }}</template>
		<template slot="category">{{ data.category }}</template>
		<template slot="description">{{ data.description }}</template>
		<template slot="actions"
			><a :href="data.src">Mehr erfahren →</a></template
		>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "./ProjectCardTemplate.vue";
export default {
	name: "ProjectCard",
	components: { ProjectCardTemplate },
	props: {
		data: {
			type: Object,
			required: true,
			validator: (value) => {
				return value.img && value.title && value.description;
			},
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
</style>
