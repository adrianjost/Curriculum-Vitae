<template>
	<div class="chapter">
		<img
			class="image"
			:alt="`image for ${data.title}`"
			:src="`https://aridbtumen.cloudimg.io/width/100/x/${data.img}`"
		/>
		<div class="text">
			<h2 class="title">
				{{ data.title }}
			</h2>
			<h3 class="subtitle">
				<span class="duration">
					{{ dateToString(data.from) }} - {{ dateToString(data.to) }}
				</span>
				{{ data.subtitle }}
			</h3>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	methods: {
		dateToString(timestamp) {
			if (!timestamp) {
				return;
			}
			const date = new Date(Date.parse(timestamp));
			const options = { year: "numeric", month: "2-digit" };
			return date.toLocaleDateString("de-DE", options);
		},
	},
};
</script>

<style lang="scss" scoped>
.chapter {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	padding: 0.5rem 0;
}
.image {
	width: 4rem;
	height: auto;
	object-fit: contain;
	margin-right: 1rem;
}
.text {
	flex: 1;
	.duration::after {
		content: "| ";
	}
}
.title {
	padding-bottom: 0;
	font-weight: bold;
}
.subtitle {
	padding-top: 0;
	font-weight: lighter;
}

@media screen and (max-width: 700px) {
	.chapter {
		flex-wrap: wrap;
	}
	.image {
		width: 100%;
		height: 3rem;
		margin: 0;
	}
	.text {
		text-align: center;
		.duration {
			&::after {
				content: "";
			}

			display: block;
		}
	}
}
</style>
