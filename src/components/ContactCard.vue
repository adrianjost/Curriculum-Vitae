<template>
	<ProjectCardTemplate class="grid">
		<template slot="image">
			<img
				class="image"
				src="~/static/avatar.svg"
				:alt="`profile image of Adrian Jost`"
			/>
		</template>
		<template slot="text">
			<h2 class="title">Contact me</h2>
			<p class="info">
				<b>My E-Mail:</b>
				<span class="encrypted">{{ encrypt("adrianjost@hackedit.de") }}</span>
			</p>
			<BaseInput
				v-model="email"
				type="email"
				label="Your E-Mail"
				name="email"
				placeholder="your@mail.com"
				class="i-email"
				:with-error="true"
				:error="error.email"
			/>
			<BaseTextarea
				v-model="message"
				label="Your Message"
				name="message"
				:placeholder="'Hi Adrian,\nI saw your portfolio and...'"
				rows="3"
				class="i-message"
				:with-error="true"
				:error="error.message"
			/>
			<div class="actions">
				<button
					:class="buttonClass"
					:disabled="status === 'sending'"
					@click="sendMessage()"
				>
					Send Message
					<span v-if="status === 'success'">✔</span>
					<span v-else-if="status === 'error'">✖</span>
					<span v-else>→</span>
				</button>
			</div>
		</template>
	</ProjectCardTemplate>
</template>

<script>
import ProjectCardTemplate from "./ProjectCardTemplate.vue";
import BaseInput from "./ui/BaseInput.vue";
import BaseTextarea from "./ui/BaseTextarea.vue";
import { setTimeout } from "timers";

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
			status: "ready",
			validate: {
				email: false,
				message: false,
			},
		};
	},
	computed: {
		buttonClass() {
			return ["button", this.status];
		},
		error() {
			const error = {
				email: "",
				message: "",
			};
			if (this.validate.email) {
				if (!this.email) {
					error.email = "Required so I can respond to your message.";
				} else if (!this.email.match(/\S+@\S+\.\S{2,}/)) {
					error.email = "Your E-Mail looks invalid.";
				}
			}
			if (this.validate.message) {
				if (!this.message) {
					error.message = "You try to send an empty message?";
				}
			}
			return error;
		},
	},
	watch: {
		email: function(to) {
			this.validate.email = true;
		},
		message: function(to) {
			this.validate.message = true;
		},
	},
	methods: {
		encrypt(text) {
			return text
				.split("")
				.reverse()
				.join("");
		},
		sendMessage() {
			this.validate = { email: true, message: true };
			if (this.error.email || this.error.message) {
				return;
			}
			const formData = new FormData();
			formData.append("receiver", "adrianjost@hackedit.de");
			formData.append("headline", "Contacting Adrian Jost");
			formData.append(
				"message",
				`Message from: ${this.email}\n\n---\n\n${this.message}`
			);
			this.status = "sending";
			fetch("http://mail.hackedit.de/", {
				method: "post",
				body: formData,
			})
				.then(() => {
					this.status = "success";
					this.message = "";
				})
				.catch(() => {
					this.status = "error";
				})
				.finally(() => {
					setTimeout(() => {
						this.status = "";
					}, 3000);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";
.button {
	color: inherit;
}
.i-email,
.i-message {
	margin: 0.5em 0 0;
}
.info {
	margin: 0.5em 0 0;
}
.encrypted {
	unicode-bidi: bidi-override;
	direction: rtl;
	cursor: default;
	user-select: none;
}
</style>
