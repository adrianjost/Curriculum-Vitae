<template>
	<div>
		<TheTitle />
		<ProjectCard
			v-for="(data, index) in demoCards"
			:key="index"
			:data="{ ...data, img: data.img + `i=${index}` }"
			:class="{ projectcard: true, inverted: index % 2 }"
		/>
	</div>
</template>

<script>
import TheTitle from "@/components/TheTitle.vue";
import ProjectCard from "@/components/ProjectCard.vue";

export default {
	components: {
		TheTitle,
		ProjectCard,
	},
	data: () => ({
		demoCard: {
			title: "Cute Puppy",
			desc:
				"Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. 'Fix, Schwyz!' quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg. ",
			img: `https://picsum.photos/500/500/?random}`,
			category: "hobby",
		},
	}),
	computed: {
		demoCards() {
			return [
				this.demoCard,
				this.demoCard,
				this.demoCard,
				this.demoCard,
				this.demoCard,
				this.demoCard,
				this.demoCard,
			];
		},
	},
};
</script>

<style lang="scss" scoped>
$space-between: 5rem;
$space-around: 2rem;
.projectcard {
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
