<template>
	<nav aria-label="Main">
		<ul v-bind="$attrs" class="navigation">
			<li v-for="route in routes" :key="route.title" class="nav-item-wrapper">
				<NuxtLink v-if="route.to" class="nav-item" :to="route.to">
					{{ route.title }}
				</NuxtLink>
				<span
					v-if="route.event"
					class="nav-item"
					@click="$emit('navEvent', route.event)"
				>
					{{ route.title }}
				</span>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: "TheNav",
	props: {
		routes: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="scss" scoped>
.navigation {
	display: block;
	padding: 0;
	margin: 0;
	list-style: none;
}
.nav-item-wrapper {
	display: inline-block;
	border-right: 1px solid #fff;
	&:last-of-type {
		border-right: 0;
	}
}
.nav-item {
	position: relative;
	display: inline-block;
	padding: 0 1em;
	font-weight: bold;
	color: #fffa;
	text-decoration: none;
	cursor: pointer;

	@media screen and (max-width: 700px) {
		padding: 0 0.5em;
	}
	&.nuxt-link-exact-active {
		color: #fff;
		text-decoration: underline;
	}
	&::before {
		position: absolute;
		top: -1em;
		bottom: -1em;
		left: 0;
		width: 100%;
		content: "";
	}
}
</style>
