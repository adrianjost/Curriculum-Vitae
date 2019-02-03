<template>
	<div id="app">
		<main class="container">
			<BrowserWarning />
			<RouterView />
		</main>
	</div>
</template>

<script>
import BrowserWarning from "@/components/BrowserWarning.vue";

export default {
	name: "App",
	components: {
		BrowserWarning,
	},
};
</script>
<style lang="scss">
@import "./styles/base";
</style>
<style lang="scss" scoped>
@import "./styles/variables";
$color-range: 10%;

#app {
	position: relative;
	padding: 1rem;
	color: var(--color-text);
	&:before {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		content: "";
		background: linear-gradient(
			30deg,
			darken($color-primary, $color-range * 1.5) 30%,
			lighten($color-primary, $color-range * 0.5)
		);
	}
}
</style>
