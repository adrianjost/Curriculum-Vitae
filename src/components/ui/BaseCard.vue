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
@use "src/styles/variables";

.card {
	width: 100%;
	max-width: variables.$content-width-max;
	margin-right: auto;
	margin-left: auto;
	background: #fff;
	box-shadow: 0 25px 100px rgb(0 0 0 / 50%);
}
</style>
