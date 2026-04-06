<template>
	<div id="app">
		<header>
			<h1 class="title">Administration</h1>
			<p v-if="currentUser" class="auth-meta">
				Signed in as {{ currentUser.email }}
			</p>
			<TheNav class="nav" :routes="navRoutes" @navigation="handleNavEvent" />
		</header>
		<main v-if="authReady && currentUser">
			<NuxtPage />
		</main>
		<main v-else-if="!authReady">
			<p class="status">Checking authentication...</p>
		</main>
		<main v-else>
			<p class="status">Redirecting to sign in...</p>
		</main>
	</div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "~/lib/firebase.js";
import TheNav from "../components/TheNav.vue";

export default {
	name: "Admin",
	components: {
		TheNav,
	},
	data() {
		return {
			authReady: false,
			currentUser: null,
			unsubscribeAuthState: null,
			navRoutes: [
				{ to: "/admin", title: "Projects" },
				{ to: "/admin/about", title: "About" },
				{ event: "logout", title: "Logout" },
			],
		};
	},
	mounted() {
		this.unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
			this.currentUser = user;
			this.authReady = true;
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
	beforeUnmount() {
		if (this.unsubscribeAuthState) {
			this.unsubscribeAuthState();
		}
	},
	methods: {
		async handleNavEvent(event) {
			if (event === "logout") {
				await signOut(auth);
				this.$router.push("/");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/styles/variables";

#app {
	position: relative;
	max-width: variables.$content-width-max;
	padding: 1rem;
	margin: 0 auto;
	color: variables.$color-text;
}

.title {
	color: #fff;
	text-align: center;
}

.auth-meta {
	margin-block: 0.5rem;
	font-size: 0.95rem;
	text-align: center;
	opacity: 0.9;
	color: #fff;
}

.nav {
	margin: 0 0 1rem;
	text-align: center;
}

.status {
	text-align: center;
	opacity: 0.9;
}

@media screen and (width <= 900px) {
	#app {
		padding: 1rem;
	}
}
</style>
