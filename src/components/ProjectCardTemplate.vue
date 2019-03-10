<template>
	<BaseCard class="card">
		<slot>
			<div class="img-wrapper">
				<div class="image-overlay">
					<slot name="image" />
				</div>
			</div>
			<div class="information"><slot name="text" /></div>
		</slot>
	</BaseCard>
</template>

<script>
import BaseCard from "./ui/BaseCard.vue";
export default {
	name: "ProjectCardTemplate",
	components: { BaseCard },
	props: {
		img: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss">
@import "~/styles/variables.scss";

.grid {
	display: grid;
	grid-template-areas: "img info";
	grid-template-rows: 1fr;
	grid-template-columns: 1fr 1fr;
	&.inverted {
		grid-template-areas: "info img";
	}
}
.img-wrapper {
	position: relative;
	grid-area: img;
	padding-bottom: 70%;
	overflow: hidden;
	.image-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.image {
		width: 100%;
		height: 100%;
		object-fit: contain;
		&.image--cover {
			object-fit: cover;
		}
	}
}
.information {
	display: flex;
	flex-direction: column;
	grid-area: info;
	justify-content: center;
	padding: 2rem;
	color: $color-text;
}
.title {
	padding-bottom: 0;
	text-transform: capitalize;
}
.subtitle {
	padding-top: 0;
	font-size: 1em;
	font-weight: normal;
}
.category {
	font-size: 1.25rem;
	font-weight: bold;
	color: $color-secondary;
}
.description {
	display: block;
	width: 100%;
}
.actions {
	margin-top: 0.5em;
	> a,
	> button {
		display: inline-block;
		padding: 0.3em 0.5em;
		margin: 0 0.25em;
		font-family: "Quicksand", sans-serif;
		font-weight: bold;
		line-height: 100%;
		color: darken($color-primary, 6%);
		text-decoration: none;
		text-transform: uppercase;
		border-radius: 0.25em;
		&:first-child {
			margin-left: -0.5em;
		}
		&:last-child {
			margin-right: -0.5em;
		}
		&:hover,
		&:focus {
			background: #0002;
		}
	}
}

@media screen and (max-width: 700px) {
	.grid {
		display: block;
	}
	.img-wrapper {
		padding-bottom: 50%;
	}
	.information {
		padding: 0 1rem 1rem;
	}
}
</style>
