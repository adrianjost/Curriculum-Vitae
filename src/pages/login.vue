<template>
	<section class="welcome-msg text-center">
		<h1 class="header">
			Welcome
		</h1>
		<h2 class="subheader">
			Sign in to continue
		</h2>
		<div id="firebaseui-auth-container" />
	</section>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";

import firebaseui from "firebaseui";
let loginUi;

export default {
	name: "Login",
	mounted() {
		loginUi = new firebaseui.auth.AuthUI(firebase.auth());
		const uiConfig = {
			signInSuccessUrl: this.$route.query.redirect || "/",
			signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
		};
		loginUi.start("#firebaseui-auth-container", uiConfig);
	},
};
</script>

<style lang="scss" scoped>
@import "~firebaseui/dist/firebaseui.css";

.text-center {
	text-align: center;
}
.welcome-msg {
	color: #fff;
}
.header {
	font-size: 56px;
}

.subheader {
	font-size: 24px;
}

#firebaseui-auth-container {
	padding: 1em 0;
}
</style>
