<template>
	<div id="app">
		<header>
			<h1 class="title">Administration</h1>
			<TheNav class="nav" :routes="navRoutes" @navEvent="handleNavEvent" />
		</header>
		<main>
			<Nuxt />
		</main>
	</div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import TheNav from "../components/TheNav.vue";

export default {
	name: "Admin",
	components: {
		TheNav,
	},
	data() {
		return {
			navRoutes: [
				{ to: "/admin", title: "Projects" },
				{ to: "/admin/about", title: "About" },
				{ event: "logout", title: "Logout" },
			],
		};
	},
	mounted() {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				// User signed out.
				this.$router.push({
					path: "/admin/nigol",
					query: {
						redirect: this.$route.path,
					},
				});
			}
		});
	},
	methods: {
		handleNavEvent(event) {
			if (event === "logout") {
				firebase.auth().signOut();
				this.$router.push("/");
			}
		},
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
	color: #fff;
	text-align: center;
}

.nav {
	margin: 0 0 1rem;
	text-align: center;
}

@media screen and (max-width: 900px) {
	#app {
		padding: 1rem;
	}
}
</style>
