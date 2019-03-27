const pkg = require("./package");
const fetch = require("isomorphic-unfetch");

import { getAll } from "./apiCalls";

module.exports = {
	mode: "universal",
	srcDir: "src/",

	render: {
		bundleRenderer: {
			shouldPrefetch: (file, type) => {
				return !file.includes("admin");
			},
			shouldPreload: (file, type) => {
				return !file.includes("admin");
			},
		},
	},

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
		link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
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
	modules: ["@nuxtjs/pwa", "@nuxtjs/sitemap", "nuxt-purgecss"],

	sitemap: {
		generate: true,
		hostname: process.env.BASE_URL || "https://adrianjost.dev",
		filter({ routes, options }) {
			return routes.filter((route) => !route.url.includes("admin"));
		},
		/*
		routes() {
			return fetch(
				"https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/projects"
			)
				.then((res) => res.json())
				.then((data) => data.data.map((project) => "/projects/" + project.id));
		},
		*/
	},

	purgeCSS: {
		mode: "postcss",
		// your settings here
	},

	/*
	 ** Build configuration
	 */
	build: {
		//analyze: true,
		quiet: false,
		//extractCSS: true,
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
		splitChunks: {
			layouts: true,
			pages: true,
			commons: true,
		},
		optimization: {
			splitChunks: {
				chunks: "all",
				automaticNameDelimiter: ".",
				name: true,
				cacheGroups: {
					admin: {
						name: "admin",
						test: /admin/,
					},
				},
			},
		},
		filenames: {
			app: ({ isDev }) => (isDev ? "[name].js" : "[name].[chunkhash].js"),
			chunk: ({ isDev }) => (isDev ? "[name].js" : "[name].[chunkhash].js"),
			css: ({ isDev }) => (isDev ? "[name].css" : "[name].[contenthash].css"),
		},
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
			config.node = {
				fs: "empty",
			};
		},
	},

	generate: {
		routes() {
			return getAll().then((data) => {
				const projects = data[0];
				const routes = [];
				/* projects.map((project) => ({
					route: "/projects/" + project.id,
					payload: data,
				})); */
				[
					"/",
					"/about",
					"/contact",
					"/admin",
					"/admin/nigol",
					"/admin/about",
				].forEach((route) => {
					routes.push({
						route: route,
						payload: data,
					});
				});
				return routes;
			});
		},
	},
};
