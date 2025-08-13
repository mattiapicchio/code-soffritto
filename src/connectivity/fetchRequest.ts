import { FetchError } from './FetchError';
import { getErrorMessage } from './getErrorMessage';

const API_URL = process.env.PUBLIC_API_URL;

/**
 * Makes an HTTP request using the native fetch API and returns the parsed response.
 * Throws a FetchError if the response is not ok.
 *
 * @template TResponse - The expected response type.
 * @param path - The API endpoint path (relative to API_URL).
 * @param config - The RequestInit configuration object.
 * @returns A promise resolving to the parsed response of type TResponse.
 * @throws {FetchError} - If the response is not ok or a network error occurs.
 *
 * @example
 * const data = await fetchRequest<MyType>('/users', { method: 'GET' });
 */
export async function fetchRequest<TResponse>(
	path: string,
	config: RequestInit,
): Promise<TResponse> {
	const url = `${API_URL}${path}`;
	const response = await fetch(url, config);

	const responseType = response.headers.get('content-type');
	const data = responseType?.includes('application/json')
		? await response.json()
		: await response.text();

	if (!response.ok) {
		throw new FetchError({
			message: getErrorMessage(data.ErrorCode) || response.statusText,
			errorCode: data.errorCode,
			status: response.status,
			response: data,
		});
	}

	return data as TResponse;
}
