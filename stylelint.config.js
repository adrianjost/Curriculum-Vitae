module.exports = {
	extends: [
		// Use the Standard config as the base
		// https://github.com/stylelint-scss/stylelint-config-standard-scss
		"stylelint-config-standard-scss",
		// Support HTML and Vue files
		// https://github.com/stylelint-html/stylelint-config-html
		"stylelint-config-html",
		// Enforce a standard order for CSS properties
		// https://github.com/stormwarning/stylelint-config-recess-order
		"stylelint-config-recess-order",
	],
	plugins: [
		// Bring in some extra rules for SCSS
		"stylelint-scss",
	],
	// Rule lists:
	// - https://stylelint.io/user-guide/rules/
	// - https://github.com/kristerkari/stylelint-scss#list-of-rules
	rules: {
		// Allow newlines inside class attribute values
		"string-no-newline": null,
		"selector-class-pattern": /^[a-z][a-z0-9-_]+$/,
		"selector-id-pattern": /^[a-z][a-z0-9-_]+$/,
		// Limit the number of universal selectors in a selector,
		// to avoid very slow selectors
		"selector-max-universal": 1,
		// ===
		// SCSS
		// ===
		"scss/dollar-variable-colon-space-after": "always",
		"scss/dollar-variable-colon-space-before": "never",
		"scss/dollar-variable-no-missing-interpolation": true,
		"scss/dollar-variable-pattern": /^[a-z][a-z0-9-_]+$/,
		"scss/double-slash-comment-whitespace-inside": "always",
		"scss/operator-no-newline-before": true,
		"scss/operator-no-unspaced": true,
		"scss/selector-no-redundant-nesting-selector": true,
		// Allow SCSS and CSS module keywords beginning with `@`
		"at-rule-no-unknown": null,
		"scss/at-rule-no-unknown": true,
	},
};
