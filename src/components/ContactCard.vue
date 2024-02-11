<template>
	<ProjectCardTemplate class="grid">
		<template slot="image">
			<img
				class="image"
				src="~/static/avatar.svg"
				alt="avatar of Adrian Jost"
			/>
		</template>
		<template slot="text">
			<h2 class="title">Contact me</h2>
			<p class="info">
				<b>My E-Mail:</b>
				<span class="content" @click="copyToClipboard('me@adrianjost.dev')">
					<span>me@adrianjost.dev</span>
					<button
						:class="['btn-copy', copyStatus]"
						type="button"
						aria-label="copy email to clipboard"
					>
						<img
							alt="copy icon"
							class="btn-copy__img"
							src="@/static/clipboard.svg"
							width="36"
							height="36"
							loading="lazy"
						/>
					</button>
				</span>
			</p>
			<form
				action="https://mail.hackedit.de?origin=adrianjost.dev&redirect=https%3A%2F%2Fadrianjost.dev%2Fmailsuccess"
				method="post"
				@submit.prevent="sendMessage()"
			>
				<input type="hidden" name="receiver" value="me@adrianjost.dev" />
				<input type="hidden" name="headline" value="Contacting Adrian Jost" />
				<BaseInput
					v-model="email"
					type="email"
					label="Your E-Mail"
					name="sender"
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
				<BaseInput
					v-model="myName"
					type="text"
					label="Confirm my name"
					name="myName"
					placeholder="Adrian"
					class="i-name"
					:with-error="true"
					:error="error.myName"
				/>
				<div class="actions">
					<button
						type="Submit"
						:class="buttonClass"
						:disabled="submitStatus === 'sending'"
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
			myName: "",
			submitStatus: "ready",
			copyStatus: "",
			validate: {
				email: false,
				message: false,
				myName: false,
			},
		};
	},
	computed: {
		buttonClass() {
			return [this.submitStatus];
		},
		error() {
			const error = {
				email: "",
				message: "",
				myName: "",
			};
			if (this.validate.email) {
				if (!this.email) {
					error.email = "Required so I can respond to your message.";
				} else if (!this.email.match(/\S+@\S+\.\S{2,}/)) {
					error.email = "This looks wrong. 🤔";
				}
			}
			if (this.validate.message) {
				if (!this.message) {
					error.message = "An empty message? 🤨";
				}
			}
			if (this.validate.myName) {
				if (!this.myName.includes("Adrian")) {
					error.myName = "Please confirm MY name.";
				}
			}
			return error;
		},
	},
	watch: {
		email: function (to) {
			this.validate.email = true;
		},
		message: function (to) {
			this.validate.message = true;
		},
		myName: function (to) {
			this.validate.myName = true;
		},
	},
	methods: {
		copyToClipboard(text) {
			navigator.permissions
				.query({ name: "clipboard-write" })
				.then((result) => {
					if (result.state == "granted" || result.state == "prompt") {
						navigator.clipboard
							.writeText(text)
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
			this.validate = { email: true, message: true, myName: true };
			if (this.error.email || this.error.message || this.error.myName) {
				return;
			}
			const mailData = {
				sender: this.email,
				receiver: "me@adrianjost.dev",
				headline: "Contacting Adrian Jost",
				message: `Message from: ${this.email}\n\n---\n\n${this.message}`,
			};
			const formData = new FormData();
			Object.entries(mailData).forEach(([key, value]) => {
				formData.append(key, value);
			});

			this.submitStatus = "sending";
			fetch("https://mail.hackedit.de/?origin=adrianjost.dev", {
				method: "post",
				body: formData,
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(
							`${res.status}${res.statusText ? `- ${res.statusText}` : ""}`
						);
					}
					this.submitStatus = "success";
					this.message = "";
				})
				.catch((error) => {
					this.submitStatus = "error";
					console.error(error);
					this.mailTo();
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
		mailTo() {
			const { sender, message } = this;
			const mailto_link = `mailto:me@adrianjost.dev?subject=Hi%20Adrian&body=${message}`;
			const win = window.open(mailto_link, "emailWindow");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

.info > .content {
	display: inline-flex;
	align-items: center;
	white-space: nowrap;
}

.btn-copy {
	position: relative;
	display: inline-block;
	width: 1em;
	height: 1em;
	margin-left: 0.25em;
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
