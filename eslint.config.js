const pluginVue = require("eslint-plugin-vue");
const configPrettier = require("eslint-config-prettier");

module.exports = [
	{
		ignores: ["node_modules/**", "dist/**", ".nuxt/**", "functions/**"],
	},
	...pluginVue.configs["flat/recommended"],
	{
		rules: {
			...configPrettier.rules,
			// Only allow debugger in development
			"no-debugger":
				process.env.NODE_ENV === "production" || process.env.PRE_COMMIT
					? "error"
					: "off",
			// Only allow `console.log` in development
			"no-console":
				process.env.NODE_ENV === "production" || process.env.PRE_COMMIT
					? [
							"error",
							{
								allow: ["warn", "error"],
							},
						]
					: "off",
			"vue/component-name-in-template-casing": [
				"error",
				"PascalCase",
				{
					ignores: [
						"component",
						"template",
						"transition",
						"transition-group",
						"keep-alive",
						"slot",
						"client-only",
					],
				},
			],
			"vue/multi-word-component-names": "off", // incompatible with nuxt routing
		},
	},
];
