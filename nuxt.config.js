const pkg = require("./package");
const fetch = require("isomorphic-fetch");

module.exports = {
	mode: "universal",
	srcDir: "src/",

	/*
	 ** Headers of the page
	 */
	head: {
		title: pkg.name,
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: pkg.description },
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: "#fff" },

	/*
	 ** Global CSS
	 */
	css: [],

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [],

	/*
	 ** Nuxt.js modules
	 */
	modules: ["@nuxtjs/pwa"],

	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: "pre",
					test: /\.(js|vue)$/,
					loader: "eslint-loader",
					exclude: /(node_modules)/,
				});
			}
		},
	},

	generate: {
		routes: function() {
			return fetch(
				"https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/"
			)
				.then((res) => res.json())
				.then((data) => {
					return data.data.map((project) => {
						return {
							route: "/projects/" + project.id,
							payload: project,
						};
					});
				});
		},
	},
};
