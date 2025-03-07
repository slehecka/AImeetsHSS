import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./keystatic.config.@(ts|tsx)", "./src/**/*.@(astro|css|ts|tsx)"],
	corePlugins: {
		container: false,
	},
	plugins: [typographyPlugin],
	theme: {
		extend: {
			borderRadius: {
				none: "0",
				sm: "var(--corner-rounding-sm)",
				md: "var(--corner-rounding-md)",
				lg: "var(--corner-rounding-lg)",
			},
			boxShadow: {
				raised: "var(--shadow-raised)",
				overlay: "var(--shadow-overlay)",
			},
			colors: {
				"text-strong": "var(--color-text-strong)",
				"text-weak": "var(--color-text-weak)",
				"text-brand": "var(--color-text-brand)",
				"text-disabled": "var(--color-text-disabled)",
				"stroke-strong": "var(--color-stroke-strong)",
				"stroke-weak": "var(--color-stroke-weak)",
				"stroke-selected": "var(--color-stroke-selected)",
				"stroke-focus": "var(--color-stroke-focus)",
				"stroke-disabled": "var(--color-stroke-disabled)",
				"stroke-brand-strong": "var(--color-stroke-brand-strong)",
				"stroke-brand-weak": "var(--color-stroke-brand-weak)",
				"fill-strong": "var(--color-fill-strong)",
				"fill-weak": "var(--color-fill-weak)",
				"fill-hover": "var(--color-fill-hover)",
				"fill-press": "var(--color-fill-press)",
				"fill-selected": "var(--color-fill-selected)",
				"fill-disabled": "var(--color-fill-disabled)",
				"fill-overlay": "var(--color-fill-overlay)",
				"fill-brand-strong": "var(--color-fill-brand-strong)",
				"fill-brand-weak": "var(--color-fill-brand-weak)",
				background: "var(--color-background)",
				"background-raised": "var(--color-background-raised)",
				"background-overlay": "var(--color-background-overlay)",
			},
			fontFamily: {
				body: "var(--font-family-body)",
				heading: "var(--font-family-heading)",
			},
			fontSize: {
				display: [
					"var(--font-size-display)",
					{
						lineHeight: "var(--line-height-display)",
						letterSpacing: "var(--letter-spacing-display)",
						fontWeight: "var(--font-weight-display)",
					},
				],
				"heading-1": [
					"var(--font-size-h1)",
					{
						lineHeight: "var(--line-height-h1)",
						letterSpacing: "var(--letter-spacing-h1)",
						fontWeight: "var(--font-weight-strong)",
					},
				],
				"heading-2": [
					"var(--font-size-h2)",
					{
						lineHeight: "var(--line-height-h2)",
						fontWeight: "var(--font-weight-strong)",
					},
				],
				"heading-3": [
					"var(--font-size-h3)",
					{
						lineHeight: "var(--line-height-h3)",
						fontWeight: "var(--font-weight-strong)",
					},
				],
				"heading-4": [
					"var(--font-size-h4)",
					{
						lineHeight: "var(--line-height-h4)",
						fontWeight: "var(--font-weight-strong)",
					},
				],
				lead: [
					"var(--font-size-lead)",
					{
						lineHeight: "var(--line-height-lead)",
					},
				],
				small: [
					"var(--font-size-small)",
					{
						lineHeight: "var(--line-height-small)",
					},
				],
				tiny: [
					"var(--font-size-tiny)",
					{
						lineHeight: "var(--line-height-tiny)",
					},
				],
				uppercase: [
					"var(--font-size-uppercase)",
					{
						lineHeight: "var(--line-height-uppercase)",
						letterSpacing: "var(--letter-spacing-uppercase)",
						fontWeight: "var(--font-weight-strong)",
					},
				],
			},
			fontWeight: {
				weak: "var(--font-weight-weak)",
				emphasised: "var(--font-weight-emphasised)",
				strong: "var(--font-weight-strong)",
			},
			spacing: {
				xs: "var(--space-xs)",
				sm: "var(--space-sm)",
				md: "var(--space-md)",
				lg: "var(--space-lg)",
				xl: "var(--space-xl)",
				"2xl": "var(--space-2xl)",
			},
			typography(_theme: (key: string) => unknown) {
				return {
					DEFAULT: {
						css: {
							maxWidth: null,
							/** Don't add quotes around `blockquote`. */
							"blockquote p:first-of-type::before": null,
							"blockquote p:last-of-type::after": null,
							/** Don't add backticks around inline `code`. */
							"code::before": null,
							"code::after": null,
							"a:hover": {
								textDecoration: "none",
							},
						},
					},
				};
			},
		},
		screens: {
			xs: "30rem",
			sm: "40rem",
			md: "48rem",
			lg: "64rem",
			xl: "80rem",
			"2xl": "96rem",
			"3xl": "120rem",
		},
	},
};

export default config;
