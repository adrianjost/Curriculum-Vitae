<template>
	<ProjectCardTemplate>
		<template slot="image">
			<img
				class="image"
				src="~/static/avatar.svg"
				:alt="`profile image of Adrian Jost`"
			/>
		</template>
		<template slot="text">
			<h2 class="title">Contact me</h2>
			<BaseInput
				v-model="email"
				type="email"
				label="Your E-Mail:"
				name="email"
				placeholder="your@mail.com"
				class="i-email"
			/>
			<BaseTextarea
				v-model="message"
				label="Your Message:"
				name="message"
				:placeholder="'Hi Adrian,\nI saw your portfolio and...'"
				rows="3"
				class="i-message"
			/>
			<div class="actions">
				<button class="button" @click="sendMessage()">Send →</button>
			</div>
		</template>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "./ProjectCardTemplate.vue";
import BaseInput from "./ui/BaseInput.vue";
import BaseTextarea from "./ui/BaseTextarea.vue";

export default {
	name: "ContactCard",
	components: {
		BaseInput,
		BaseTextarea,
		ProjectCardTemplate,
	},
	data() {
		return {
			email: "",
			message: "",
		};
	},
	watch: {
		savedData: {
			handler: function(to) {
				this.importSaved(to);
			},
			deep: true,
		},
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";
.button {
	color: inherit;
}
.i-email,
.i-message {
	margin: 1em 0 0.5em;
}
</style>
