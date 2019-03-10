<template>
	<div id="app">
		<header>
			<TheTitle class="title" />
			<TheNav class="nav" :routes="navRoutes" />
		</header>
		<main>
			<Nuxt />
		</main>
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
				{ to: "/", title: "Projects" },
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

.nav {
	position: relative;
	margin: 0.5rem 0;
	text-align: center;
}
main {
	margin: 2rem 0;
}

@media screen and (max-width: 900px) {
	#app {
		padding: 1rem;
	}
}
</style>
