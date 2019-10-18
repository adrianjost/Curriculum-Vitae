<template>
	<div>
		<ProjectCardTemplate class="grid">
			<template slot="image">
				<img
					class="image"
					src="~/static/email.svg"
					alt="avatar of Adrian Jost"
				/>
			</template>
			<template slot="text">
				<h2 class="title">E-Mail delivered</h2>
				<p class="info">
					Thank you for your E-Mail. <br />
					I will respond as soon as possible.
				</p>
			</template>
		</ProjectCardTemplate>
		<TheBottomNav class="bottom-nav" :links="ctas" />
	</div>
</template>

<script>
import ProjectCardTemplate from "~/components/ProjectCardTemplate.vue";
import TheBottomNav from "~/components/TheBottomNav.vue";

import transition from "~/mixins/transition";

export default {
	components: {
		ProjectCardTemplate,
		TheBottomNav,
	},
	mixins: [transition],
	head: {
		title: "E-Mail delivered",
	},
	data() {
		return {
			ctas: {
				left: { to: "/contact", text: "Zurück" },
			},
		};
	},
};
</script>
<style lang="scss" scoped>
img.image {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 50%;
	height: 50%;
	transform: translate(-50%, -50%);
}
</style>
