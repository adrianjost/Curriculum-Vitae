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
	router: {
		base: process.env.BASE || "/",
	},
	icon: {
		// Icon options
		sizes: [16, 120, 144, 152, 192, 384, 512, 1024, 2048],
	},
	manifest: {
		name: "Adrian Jost",
		short_name: "Adrian Jost",
		lang: "de-de",
		start_url: "/?homescreen=true",
		display: "standalone",
		background_color: "#fff",
		theme_color: "#FF1744",
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: "#fff" },

	/*
	 ** Global CSS
	 */
	css: ["@styles/base.scss"],

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
		//analyze: true,
		extractCSS: true,
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
			config.optimization = {
				splitChunks: {
					chunks: "all",
				},
			};
		},
	},

	generate: {
		extractCSS: true,
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
