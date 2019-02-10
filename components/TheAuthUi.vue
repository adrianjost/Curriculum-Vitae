<template>
	<div id="firebaseui-auth-container" />
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { config } from "@/assets/firebaseConfig";
firebase.initializeApp(config);

import firebaseui from "firebaseui";
let loginUi;

export default {
	name: "TheAuthUi",
	mounted() {
		loginUi = new firebaseui.auth.AuthUI(firebase.auth());
		const uiConfig = {
			signInSuccessUrl: this.$route.query.redirect || "/admin",
			signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
		};
		loginUi.start("#firebaseui-auth-container", uiConfig);
	},
};
</script>

<style lang="scss">
@import "./../node_modules/firebaseui/dist/firebaseui.css";
</style>
