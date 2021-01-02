<template>
	<section class="welcome-msg text-center">
		<h1 class="header">Sign in to continue</h1>
		<client-only>
			<FirebaseUi />
		</client-only>
	</section>
</template>

<script>
import FirebaseUi from "~/components/FirebaseUi.vue";

export default {
	components: { FirebaseUi },
};
</script>

<style lang="scss" scoped>
.text-center {
	text-align: center;
}
.welcome-msg {
	color: #fff;
}
.header {
	font-size: 32px;
}
</style>
