<template>
	<article class="card">
		<div class="img" :style="{ 'background-image': `url(${data.img})` }" />
		<div class="desc">
			<h2 class="title"
				>{{ data.title }}
				<small class="category">{{ data.category }}</small></h2
			>
			<p>{{ data.desc }}</p>
			<a class="readmore" :href="data.src">Mehr erfahren →</a>
		</div>
	</article>
</template>

<script>
export default {
	name: "ProjectCard",
	props: {
		data: {
			type: Object,
			required: true,
			validator: (value) => {
				return value.img && value.title && value.desc;
			},
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.card {
	display: grid;
	grid-template-areas: "img desc";
	grid-template-rows: 1fr;
	grid-template-columns: 1fr 1fr;
	width: 100%;
	max-width: $content-width-max;
	margin-right: auto;
	margin-left: auto;
	background: #fff;
	box-shadow: 0 25px 100px rgba(0, 0, 0, 0.5);
	&.inverted {
		grid-template-areas: "desc img";
	}
}
.img {
	grid-area: img;
	padding-bottom: 70%;
	background-position: center;
	background-size: cover;
}
.desc {
	display: flex;
	flex-wrap: wrap;
	grid-area: desc;
	align-items: center;
	padding: 2rem;
	color: $color-text;
}
.title {
	text-transform: capitalize;
	.category {
		&:before {
			display: inline-block;
			width: 0.5em;
			height: 0.1em;
			margin-right: 0.25em;
			margin-bottom: 0.25em;
			content: "";
			background: $color-text;
			border-radius: 1em;
		}
		font-size: 0.75em;
		color: $color-secondary;
	}
}
.readmore {
	font-family: "Quicksand", sans-serif;
	font-weight: bold;
	color: $color-primary;
}
</style>
