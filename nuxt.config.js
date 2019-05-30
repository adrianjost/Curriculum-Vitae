// import fetch from "isomorphic-unfetch"
import pkg from "./package";
import { getAll } from "./apiCalls";

export default {
	mode: "universal",
	srcDir: "src/",

	/*
	 ** Headers of the page
	 */
	head: {
		titleTemplate: (titleChunk) =>
			titleChunk ? `Adrian Jost | ${titleChunk}` : "Adrian Jost",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: pkg.description },
		],
		link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
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
	modules: ["@nuxtjs/pwa", "@nuxtjs/sitemap"],

	sitemap: {
		hostname: process.env.BASE_URL || "https://adrianjost.dev",
		filter({ routes }) {
			return routes.filter((route) => !route.url.includes("admin"));
		},
	},

	/*
	 ** Build configuration
	 */
	router: {
		base: process.env.BASE || "/",
	},

	build: {
		analyze: process.env.NODE_ENV !== "production",
		quiet: false,
		html: {
			minify: {
				collapseWhitespace: true,
				conservativeCollapse: true,
				collapseBooleanAttributes: true,
				decodeEntities: true,
				minifyCSS: true,
				minifyJS: true,
				processConditionalComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				trimCustomFragments: true,
				useShortDoctype: true,
			},
		},

		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && process.client) {
				config.module.rules.push({
					enforce: "pre",
					test: /\.(js|vue)$/,
					loader: "eslint-loader",
					exclude: /(node_modules)/,
				});
			}
			config.node = {
				fs: "empty",
			};
		},
	},

	generate: {
		routes() {
			return getAll().then((data) => {
				return [
					"/",
					"/projects",
					"/contact",
					"/admin",
					"/admin/nigol",
					"/admin/about",
				].map((route) => ({
					route: route,
					url: route,
					payload: data,
				}));
			});
		},
	},
};
