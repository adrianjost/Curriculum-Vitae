<template>
	<div>
		<ContactCard />
		<TheBottomNav class="bottom-nav" :links="ctas" />
	</div>
</template>

<script>
import ContactCard from "~/components/ContactCard.vue";
import TheBottomNav from "~/components/TheBottomNav.vue";

import transition from "~/mixins/transition";

export default {
	components: {
		ContactCard,
		TheBottomNav,
	},
	mixins: [transition],
	data() {
		return {
			ctas: {
				left: { to: "/", text: "About Me" },
			},
		};
	},
	head: {
		title: "Contact",
	},
};
</script>
