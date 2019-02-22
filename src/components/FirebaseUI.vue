<template>
	<section class="welcome-msg text-center">
		<div id="firebaseui-auth-container" />
	</section>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";

export default {
	name: "Login",
	mounted() {
		let firebaseui = require("firebaseui");
		const loginUi = new firebaseui.auth.AuthUI(firebase.auth());
		const uiConfig = {
			signInSuccessUrl: this.$route.query.redirect || "/admin",
			signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
		};
		loginUi.start("#firebaseui-auth-container", uiConfig);
	},
};
</script>

<style lang="scss">
@import "firebaseui/dist/firebaseui.css";
</style>
