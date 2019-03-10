<template>
	<div>
		<ContactCard />
		<TheBottomNav class="bottom-nav" :links="ctas" />
	</div>
</template>

<script>
import ContactCard from "~/components/ContactCard.vue";
import TheBottomNav from "~/components/TheBottomNav.vue";

export default {
	components: {
		ContactCard,
		TheBottomNav,
	},
	data() {
		return {
			ctas: {
				left: { to: "/about", text: "About Me" },
			},
		};
	},
};
</script>
