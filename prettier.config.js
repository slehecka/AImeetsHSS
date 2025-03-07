/** @typedef {import('prettier').Config} Config */

import base from "@acdh-oeaw/prettier-config";

/** @type {Config} */
const config = {
	...base,
	plugins: ["prettier-plugin-astro"],
	overrides: [
		...(base.overrides ?? []),
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};

export default config;
