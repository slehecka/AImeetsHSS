import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { assert } from "@acdh-oeaw/lib";

import type { Locale } from "@/config/i18n.config";
import { getMdxContent } from "@/lib/content/get-mdx-content";
import { createReader, withI18nPrefix, type WithoutI18nPrefix } from "@/lib/keystatic/lib";
import config from "~/keystatic.config.tsx";

export type Collections = keyof typeof config.collections;

export function createCollectionResource<
	TKeys extends WithoutI18nPrefix<Collections>,
	TLocale extends Locale,
>(name: TKeys, locale: TLocale) {
	const reader = createReader(config);
	const collectionName = withI18nPrefix(name, locale);

	const collectionReader = reader.collections[collectionName];
	const collectionConfig = reader.config.collections[collectionName];

	assert(collectionConfig.path);

	function baseUrl(id: string) {
		return pathToFileURL(join(process.cwd(), collectionConfig.path!.replace(/\*+/, id)));
	}

	async function compile(id: string, code: string) {
		return getMdxContent(code, locale, baseUrl(id));
	}

	function list() {
		return collectionReader.list();
	}

	async function read(id: string) {
		const data = await collectionReader.readOrThrow(id, { resolveLinkedFiles: true });

		return {
			collection: name,
			id,
			data,
			compile(code: string) {
				return compile(id, code);
			},
		};
	}

	async function all() {
		const ids = await list();

		return Promise.all(ids.map(read));
	}

	return {
		all,
		baseUrl,
		compile,
		list,
		read,
	};
}

export type Singletons = keyof typeof config.singletons;

export function createSingletonResource<
	TKeys extends WithoutI18nPrefix<Singletons>,
	TLocale extends Locale,
>(name: TKeys, locale: TLocale) {
	const reader = createReader(config);
	const i18nName = withI18nPrefix(name, locale);

	const singletonReader = reader.singletons[i18nName];
	const singletonConfig = reader.config.singletons[i18nName];

	assert(singletonConfig.path);

	function baseUrl() {
		return pathToFileURL(join(process.cwd(), singletonConfig.path!));
	}

	async function compile(code: string) {
		return getMdxContent(code, locale, baseUrl());
	}

	async function read() {
		const data = await singletonReader.readOrThrow({ resolveLinkedFiles: true });

		return {
			singleton: name,
			data,
			compile,
		};
	}

	return {
		baseUrl,
		compile,
		read,
	};
}
