<template>
	<section class="welcome-msg">
		<h2 class="subheader">
			Sign in to continue
		</h2>
		<no-ssr placeholder="loading...">
			<TheAuthUi />
		</no-ssr>
	</section>
</template>

<script>
const TheAuthUi = () => import("@/components/TheAuthUi.vue");

export default {
	name: "Login",
	components: {
		TheAuthUi,
	},
};
</script>

<style lang="scss" scoped>
.welcome-msg {
	color: #fff;
	text-align: center;
}

.subheader {
	font-size: 24px;
}
</style>
