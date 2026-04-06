<template>
	<section class="welcome-msg text-center">
		<button class="login-button" :disabled="isLoading" @click="loginWithGoogle">
			{{ isLoading ? "Signing in..." : "Sign in with Google" }}
		</button>
		<p v-if="loginError" class="login-error">{{ loginError }}</p>
	</section>
</template>

<script>
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "~/lib/firebase.js";

export default {
	name: "Login",
	data() {
		return {
			isLoading: false,
			loginError: "",
			unsubscribeAuthState: null,
		};
	},
	mounted() {
		const redirectPath = this.$route.query.redirect || "/admin";
		this.unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
			if (user) {
				this.$router.push(redirectPath);
			}
		});
	},
	beforeUnmount() {
		if (this.unsubscribeAuthState) {
			this.unsubscribeAuthState();
		}
	},
	methods: {
		async loginWithGoogle() {
			this.isLoading = true;
			this.loginError = "";

			const provider = new GoogleAuthProvider();

			try {
				await signInWithPopup(auth, provider);
			} catch (error) {
				this.loginError = error?.message || "Login failed. Please try again.";
			} finally {
				this.isLoading = false;
			}
		},
	},
};
</script>

<style lang="scss">
.login-button {
	padding: 0.65rem 1rem;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	background: #fff;
	border: 0;
	border-radius: 0.25rem;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}
}

.login-error {
	margin-top: 0.75rem;
	color: #f8b4b4;
}
</style>
