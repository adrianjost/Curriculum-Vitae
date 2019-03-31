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
				<span>adrianjost@hackedit.de</span>
				<button
					:class="['btn-copy', copyStatus]"
					type="button"
					@click="copyToClipboard"
				>
					<img class="btn-copy__img" src="@/static/clipboard.svg" />
				</button>
			</p>
			<form>
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
						:disabled="submitStatus === 'sending'"
						@click="sendMessage()"
					>
						Send Message
						<span v-if="submitStatus === 'success'">✔</span>
						<span v-else-if="submitStatus === 'error'">✖</span>
						<span v-else>→</span>
					</button>
				</div>
			</form>
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
			submitStatus: "ready",
			copyStatus: "",
			validate: {
				email: false,
				message: false,
			},
		};
	},
	computed: {
		buttonClass() {
			return ["button", this.submitStatus];
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
					error.message = "You tried to send an empty message?";
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
		copyToClipboard() {
			navigator.permissions
				.query({ name: "clipboard-write" })
				.then((result) => {
					if (result.state == "granted" || result.state == "prompt") {
						navigator.clipboard
							.writeText("adrianjost@hackedit.de")
							.then(() => {
								/* clipboard successfully set */
								this.copyStatus = "success";
							})
							.catch(() => {
								/* clipboard write failed */
								this.copyStatus = "error";
							})
							.finally(() => {
								setTimeout(() => {
									this.copyStatus = "";
								}, 500);
							});
					}
				});
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
			this.submitStatus = "sending";
			fetch("http://mail.hackedit.de/", {
				method: "post",
				body: formData,
			})
				.then(() => {
					this.submitStatus = "success";
					this.message = "";
				})
				.catch(() => {
					this.submitStatus = "error";
				})
				.finally(() => {
					for (const key in this.validate) {
						this.validate[key] = false;
					}
					setTimeout(() => {
						this.submitStatus = "";
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

.btn-copy {
	position: relative;
	display: inline-block;
	width: 1em;
	height: 1em;
	cursor: pointer;
	background: none;
	border: none;
	&.success {
		outline: none;
		&::after {
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			height: 100%;
			content: "";
			background: rgba(0, 0, 0, 0.4);
			border-radius: 50%;
			animation: scale 0.3s forwards;
		}
	}
	&.error {
		animation: shake 0.3s forwards;
	}

	.btn-copy__img {
		width: 100%;
		height: 100%;
	}
}

@keyframes scale {
	0% {
		transform: scale(0);
	}
	25%,
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		transform: scale(3);
		transform-origin: 50% 50%;
	}
}

@keyframes shake {
	0% {
		transform: translateX(0%);
	}
	25% {
		transform: translateX(-50%);
	}
	50% {
		transform: translateX(50%);
	}
	100% {
		transform: translateX(0%);
	}
}
</style>
