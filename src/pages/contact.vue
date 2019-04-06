<template>
	<LazyHydrate when-idle>
		<ContactCard />
		<TheBottomNav class="bottom-nav" :links="ctas" />
	</LazyHydrate>
</template>

<script>
import LazyHydrate from "vue-lazy-hydration";
import ContactCard from "~/components/ContactCard.vue";
import TheBottomNav from "~/components/TheBottomNav.vue";

export default {
	components: {
		LazyHydrate,
		ContactCard,
		TheBottomNav,
	},
	data() {
		return {
			ctas: {
				left: { to: "/", text: "About Me" },
			},
		};
	},
};
</script>
