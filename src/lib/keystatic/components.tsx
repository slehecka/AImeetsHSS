/* @jsxImportSource react */

import { fields } from "@keystatic/core";
import { mark } from "@keystatic/core/content-components";
import { DownloadIcon } from "lucide-react";

import { createAssetOptions, createComponent } from "@/lib/keystatic/lib";

export const createDownloadLink = createComponent((assetPath, _locale) => {
	return mark({
		label: "DownloadLink",
		icon: <DownloadIcon />,
		style: { color: "var(--kui-color-foreground-accent)" },
		schema: {
			file: fields.file({
				label: "File",
				validation: { isRequired: true },
				...createAssetOptions(assetPath),
			}),
		},
	});
});
