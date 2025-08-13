/**
 * Options for building a fetch request config.
 * @property method - HTTP method (GET, POST, etc.).
 * @property headers - Custom headers to include in the request.
 * @property body - Request body (object will be stringified, FormData is sent as-is).
 * @property signal - Optional AbortSignal for cancellation.
 * @property accessToken - Bearer token for Authorization header.
 * @property contentType - Content-Type header value.
 * @property locale - Accept-Language header value.
 */

const DEFAULT_TIMEOUT = 5000;
export interface GetRequestConfigOptions {
	method?: string;
	headers?: Record<string, string>;
	body?: Record<string, unknown> | string | FormData | null | undefined;
	timeout?: number;
	accessToken?: string;
	contentType?: string;
	locale?: string;
}

/**
 * Builds a RequestInit config for fetch, merging headers and handling body stringification.
 *
 * @param options - Request config options.
 * @returns A RequestInit object for fetch.
 *
 * @example
 * const config = getRequestConfig({ method: 'GET', accessToken: 'token' });
 * const config2 = getRequestConfig({ method: 'POST', accessToken: 'token', body: { foo: 'bar' } });
 */
export function getRequestConfig(
	options: GetRequestConfigOptions = {},
): RequestInit {
	const { body, timeout = DEFAULT_TIMEOUT, ...rest } = options;
	const headers: Record<string, string> = { ...options.headers };

	if (options.accessToken) {
		headers.Authorization = `Bearer ${options.accessToken}`;
	}
	if (options.contentType) {
		headers['Content-Type'] = options.contentType;
	}
	if (options.locale) {
		headers['Accept-Language'] = options.locale;
	}

	const isJsonBody =
		body !== undefined &&
		typeof body === 'object' &&
		body !== null &&
		!(body instanceof FormData);

	return Object.assign(
		{ ...rest, headers, signal: AbortSignal.timeout(timeout) },
		body !== undefined
			? {
					body: isJsonBody ? JSON.stringify(body) : body,
				}
			: {},
	);
}
