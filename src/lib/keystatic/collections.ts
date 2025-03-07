import { collection, fields } from "@keystatic/core";

import {
	createAssetOptions,
	createCollection,
	createCollectionPaths,
	createContentFieldOptions,
	createLabel,
} from "@/lib/keystatic/lib";

export const pages = createCollection((locale) => {
	const paths = createCollectionPaths("/pages/", locale);

	return collection({
		label: createLabel("Pages", locale),
		path: paths.contentPath,
		slugField: "title",
		format: { contentField: "content" },
		entryLayout: "content",
		columns: ["title"],
		// previewUrl: createPreviewUrl("/{slug}"),
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			image: fields.object(
				{
					src: fields.image({
						label: "Image",
						validation: { isRequired: false },
						...createAssetOptions(paths.assetPath),
					}),
					caption: fields.text({
						label: "Image caption",
						validation: { isRequired: false },
					}),
				},
				{
					label: "Image",
				},
			),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths.assetPath),
				components: {},
			}),
		},
	});
});

export const links = createCollection((locale) => {
	const paths = createCollectionPaths("/links/", locale);

	return collection({
		label: createLabel("Links", locale),
		path: paths.contentPath,
		slugField: "name",
		format: { contentField: "content" },
		entryLayout: "content",
		columns: ["name"],
		// previewUrl: createPreviewUrl("/links/{slug}"),
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: { isRequired: true },
				},
			}),
			href: fields.url({
				label: "URL",
				validation: { isRequired: true },
			}),
			content: fields.mdx({
				label: "Description",
				options: createContentFieldOptions(paths.assetPath),
				components: {},
			}),
		},
	});
});
