<template>
	<article class="card">
		<slot>
			<div class="img-wrapper">
				<div class="image-overlay">
					<slot name="image" />
				</div>
			</div>
			<div class="information"><slot name="text" /></div>
		</slot>
	</article>
</template>

<script>
export default {
	name: "ProjectCardTemplate",
	props: {
		img: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

.card {
	display: grid;
	grid-template-areas: "img info";
	grid-template-rows: 1fr;
	grid-template-columns: 1fr 1fr;
	width: 100%;
	max-width: $content-width-max;
	margin-right: auto;
	margin-left: auto;
	background: #fff;
	box-shadow: 0 25px 100px rgba(0, 0, 0, 0.5);
	&.inverted {
		grid-template-areas: "info img";
	}
}
.img-wrapper {
	position: relative;
	grid-area: img;
	padding-bottom: 70%;
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
		color: $color-primary;
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
	.card {
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
