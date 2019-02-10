<template>
	<ProjectCardEdit
		:id="$route.params.id"
		class="projectcard"
		@saved="$router.push(`/#${$event.id}`)"
		@deleted="$router.push(`/`)"
	/>
</template>

<script>
import ProjectCardEdit from "@/components/ProjectCardEdit.vue";

export default {
	components: {
		ProjectCardEdit,
	},
};
</script>

<style lang="scss" scoped>
.projectcard {
	margin: 2rem auto;
}
</style>
