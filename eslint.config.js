/** @typedef {import("@typescript-eslint/utils").TSESLint.FlatConfig.ConfigArray} Config */

import base from "@acdh-oeaw/eslint-config";
import astro from "@acdh-oeaw/eslint-config-astro";
import playwright from "@acdh-oeaw/eslint-config-playwright";
import react from "@acdh-oeaw/eslint-config-react";
import solid from "@acdh-oeaw/eslint-config-solid";
import tailwindcss from "@acdh-oeaw/eslint-config-tailwindcss";
import gitignore from "eslint-config-flat-gitignore";

export const reactFiles = [
	"keystatic.config.@(ts|tsx)",
	"**/content/**/*.@(ts|tsx)",
	"**/keystatic/**/*.@(ts|tsx)",
];

react.forEach((config) => {
	config.files ??= reactFiles;
});

const solidFiles = ["**/*.@(ts|tsx)"];

solid.forEach((config) => {
	config.files ??= solidFiles;
	config.ignores ??= reactFiles;
});

/** @type {Config} */
const config = [
	gitignore({ strict: false }),
	...base,
	...astro,
	...react,
	...solid,
	...tailwindcss,
	...playwright,
];

export default config;
