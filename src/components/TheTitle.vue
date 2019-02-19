<template>
	<div class="header">
		<div class="logo" />
		<h1 class="title">Adrian Jost</h1>
		<p class="subtitle">Student - Designer - Developer</p>
	</div>
</template>

<script>
export default {
	name: "TheTitle",
};
</script>

<style lang="scss" scoped>
.header {
	color: #fff;
	text-align: center;
}
.logo {
	$logo-size: 7rem;

	display: block;
	width: $logo-size;
	height: $logo-size;
	margin: 0 auto;
	background-color: #fff;
	background-image: url("~static/icon.png");
	background-position: center;
	background-size: cover;
	border-radius: $logo-size;

	@media screen and (max-width: 600px) {
		$logo-size: 5rem;

		width: $logo-size;
		height: $logo-size;
	}
}
.title,
.subtitle {
	padding: 0;
	margin: 0;
}
.title {
	font-size: 4rem;
	font-weight: bold;

	@media screen and (max-width: 600px) {
		font-size: 2.5rem;
	}
}
.subtitle {
	font-family: "Quicksand", sans-serif;
	font-size: 2rem;
	letter-spacing: -0.02em;

	@media screen and (max-width: 600px) {
		font-size: 1.2rem;
	}
}
</style>
