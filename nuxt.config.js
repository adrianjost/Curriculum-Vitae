// import fetch from "isomorphic-unfetch"
import pkg from "./package";
import { getAll } from "./apiCalls";

export default {
	mode: "universal",
	srcDir: "src/",

	env: {
		baseUrl: process.env.BASE_URL || "https://adrianjost.dev",
	},
	/**
	 * Headers of the page
	 * more are defined in the default layout
	 */
	head: {
		htmlAttrs: {
			lang: "en",
			prefix: "og: http://ogp.me/ns#",
		},
		titleTemplate: (titleChunk) =>
			titleChunk ? `Adrian Jost | ${titleChunk}` : "Adrian Jost",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
		link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
		__dangerouslyDisableSanitizers: ["script"],
		script: [
			{
				innerHTML: `!function(n,e){var t,o,i,c=[],f={passive:!0,capture:!0},r=new Date,a="pointerup",u="pointercancel";function p(n,c){t||(t=c,o=n,i=new Date,w(e),s())}function s(){o>=0&&o<i-r&&(c.forEach(function(n){n(o,t)}),c=[])}function l(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,o){function i(){p(t,o),r()}function c(){r()}function r(){e(a,i,f),e(u,c,f)}n(a,i,f),n(u,c,f)}(o,t):p(o,t)}}function w(n){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(e){n(e,l,f)})}w(n),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(n){c.push(n),s()}}(addEventListener,removeEventListener);`,
				type: "text/javascript",
				charset: "utf-8",
			},
		],
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
	plugins: [{ src: "~/plugins/performance.js", mode: "client" }],

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
		analyze: false,
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

		babel: {
			presets({ isServer }) {
				return [
					[
						require.resolve("@nuxt/babel-preset-app"),
						{
							buildTarget: isServer ? "server" : "client",
							corejs: { version: 3 },
						},
					],
				];
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
