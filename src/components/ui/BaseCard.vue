<template>
	<section class="card">
		<slot />
	</section>
</template>

<script>
export default {
	name: "BaseCard",
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables.scss";

.card {
	width: 100%;
	max-width: variables.$content-width-max;
	margin-right: auto;
	margin-left: auto;
	background: #fff;
	box-shadow: 0 25px 100px rgba(0, 0, 0, 0.5);
}
</style>
