<template>
	<div class="chapter">
		<div class="summary">
			<img role="presentation" class="image" :src="data.img" />
			<div class="info">
				<h3 class="title">
					{{ data.title }}
				</h3>
				<h4 class="subtitle">
					<span class="duration">
						{{ dateToString(data.from) }} -
						<template v-if="isActive">now </template>
						<template v-else>{{ dateToString(data.to) }} </template>
					</span>
					{{ data.subtitle }}
				</h4>
			</div>
		</div>
		<p v-if="data.description" class="description">
			{{ data.description }}
		</p>
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
	computed: {
		isActive() {
			return new Date(Date.parse(this.data.to)) >= Date.now();
		},
	},
	methods: {
		dateToString(timestamp) {
			if (!timestamp) {
				return;
			}
			const date = new Date(Date.parse(timestamp));
			const options = { year: "numeric", month: "2-digit" };
			return date.toLocaleDateString("en-US", options);
		},
	},
};
</script>

<style lang="scss" scoped>
.chapter {
	padding: 0.5rem 0;
}

.summary {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
}

.image {
	width: 4rem;
	height: auto;
	margin-right: 1rem;
	object-fit: contain;
}

.info {
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

.description {
	column-count: 2;
	column-rule: 1px solid grey;
}

@media screen and (width <= 700px) {
	.chapter:not(:last-of-type) {
		border-bottom: 1px solid gray;
	}

	.summary {
		flex-wrap: wrap;
	}

	.image {
		width: 100%;
		height: 3rem;
		margin: 0;
		object-position: left;
	}

	.info {
		.duration {
			&::after {
				content: "";
			}

			display: block;
		}
	}

	.description {
		column-count: 1;
	}
}
</style>
