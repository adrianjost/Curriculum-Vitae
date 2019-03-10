<template>
	<nav
		class="bottom-nav"
		:style="{ 'justify-content': !links.left ? 'flex-end' : '' }"
	>
		<NuxtLink v-if="links.left" class="nav-link" :to="links.left.to">
			<BaseCard class="nav-item is-left">
				{{ links.left.text }}
			</BaseCard>
		</NuxtLink>
		<div v-if="!links.left || !links.right" class="nav-link" />
		<NuxtLink v-if="links.right" class="nav-link" :to="links.right.to">
			<BaseCard class="nav-item is-right">
				{{ links.right.text }}
			</BaseCard>
		</NuxtLink>
	</nav>
</template>

<script>
import BaseCard from "./ui/BaseCard.vue";
export default {
	components: { BaseCard },
	props: {
		links: {
			type: Object,
			required: true,
			validator: (value) => {
				const validLink = (link) => !link || (!!link.to && !!link.text);
				return validLink(value.left) && validLink(value.right);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

.bottom-nav {
	display: flex;
	margin-top: $spacing-cards;
}
.nav-link {
	@media screen and (min-width: 700px) {
		flex: 1;
	}

	text-decoration: none;
	&:not(:first-child) {
		margin-left: $spacing-cards;

		@media screen and (max-width: 700px) {
			margin-left: 0.5rem;
		}
	}
}
.nav-item {
	padding: 1em;
	font-weight: bold;
	background: #fff;
	transition: color 0.3s ease-in-out;
	&:hover {
		color: $color-secondary;
	}
	&.is-left {
		text-align: left;
		&::before {
			content: "←";
		}
	}
	&.is-right {
		text-align: right;
		&::after {
			content: "→";
		}
	}
}
</style>
