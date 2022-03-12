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

import ProfileImageHeader from "~/static/ProfileImageHeader.jpg";
import pkg from "~/../package.json";

const META = {
	author: "Adrian Jost",
	title: "Adrian Jost",
	description: pkg.description,
	image: `${process.env.baseUrl}${ProfileImageHeader}`,
	url: process.env.baseUrl,
};

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
				{ to: "/", title: "About" },
				{ to: "/contact", title: "Contact" },
			],
		};
	},
	head() {
		return {
			meta: [
				{ name: "author", property: "author", content: META.author },
				{ property: "description", content: META.description },

				{ name: "title", property: "og:title", content: META.title },
				{
					name: "description",
					property: "og:description",
					content: META.description,
				},
				{ name: "image", property: "og:image", content: META.image },
				{ property: "og:image:src", content: META.image },
				{ property: "og:url", content: META.url },

				{ name: "twitter:title", content: META.title },
				{ name: "twitter:description", content: META.description },
				{ name: "twitter:image", content: META.image },
				{ name: "twitter:card", content: "summary_large_image" },
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

.title {
	padding-top: 2rem;
}

@media screen and (max-width: 900px) {
	#app {
		padding: 1rem;
	}
}
</style>
