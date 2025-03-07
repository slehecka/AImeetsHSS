import { createUrl } from "@acdh-oeaw/lib";

import { env } from "@/config/env.config";

export function isAriaCurrent(href: string, currentUrl: URL): boolean {
	const targetUrl = createUrl({ pathname: href, baseUrl: env.PUBLIC_APP_BASE_URL });

	return targetUrl.origin === currentUrl.origin && targetUrl.pathname === currentUrl.pathname;
}
