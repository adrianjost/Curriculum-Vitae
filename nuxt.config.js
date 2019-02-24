const pkg = require("./package");
const fetch = require("isomorphic-fetch");
var request = require("request").defaults({ encoding: null });

function encodeImage(url) {
	return new Promise((resolve, reject) => {
		request.get(
			`https://aridbtumen.cloudimg.io/width/30/x/${url}`,
			(error, response, body) => {
				if (!error && response.statusCode == 200) {
					data =
						"data:" +
						response.headers["content-type"] +
						";base64," +
						new Buffer(body).toString("base64");
					return resolve(data);
				}
				return reject(error);
			}
		);
	});
}

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
	plugins: [{ src: "@plugins/firebase", ssr: false }],

	/*
	 ** Nuxt.js modules
	 */
	modules: ["@nuxtjs/pwa", "@nuxtjs/sitemap"],
	sitemap: {
		generate: true,
		hostname: process.env.BASE_URL || "https://alpha-adrianjost.hackedit.de",
		filter({ routes, options }) {
			return routes.filter((route) => !route.url.includes("admin"));
		},
		routes() {
			return fetch(
				"https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/"
			)
				.then((res) => res.json())
				.then((data) => data.data.map((project) => "/projects/" + project.id));
		},
	},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		//analyze: true,
		quiet: false,
		//extractCSS: true,
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
		routes() {
			return fetch(
				"https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects/"
			)
				.then((res) => res.json())
				.then((data) =>
					Promise.all(
						data.data.map(async (project) => {
							if (project.img) {
								project.imgPlaceholder = await encodeImage(project.img);
							}
							return project;
						})
					)
				)
				.then((projects) => {
					let routes = projects.map((project) => ({
						route: "/projects/" + project.id,
						payload: project,
					}));
					routes.push({
						route: "/",
						payload: projects,
					});
					routes.push({
						route: "/projects",
						payload: projects,
					});
					return routes;
				});
		},
	},
};
