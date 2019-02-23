<template>
	<div id="app">
		<TheTitle class="title" />
		<TheNav class="nav" :routes="navRoutes" />
		<Nuxt />
	</div>
</template>

<script>
import TheTitle from "../components/TheTitle.vue";
import TheNav from "../components/TheNav.vue";

export default {
	name: "Default",
	components: {
		TheTitle,
		TheNav,
	},
	data() {
		return {
			navRoutes: [
				{ to: "/projects", title: "Projects" },
				{ to: "/about", title: "About" },
				{ to: "/contact", title: "Contact" },
			],
		};
	},
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

#app {
	position: relative;
	max-width: $content-width-max;
	padding: 1rem;
	margin: 0 auto;
	color: $color-text;
}

.title {
	margin-bottom: 2rem;
}

.nav {
	position: absolute;
	top: 1em;
	right: 0;
}

@media screen and (max-width: 900px) {
	#app {
		padding: 1rem;
	}
}

@media screen and (max-width: 700px) {
	.title {
		margin-bottom: 0;
	}
	.nav {
		position: relative;
		padding: 0 0 1rem;
		margin: 0 0 1rem;
		text-align: center;
	}
}
</style>
