import { FetchError } from './fetchError';
import { type ErrorCode, getErrorMessage } from './getErrorMessage';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

/**
 * @template TResponse - The expected response type.
 * @param path - The API endpoint path (relative to API_URL).
 * @param config - The RequestInit configuration object.
 * @param [exception] - (Testing only) If provided, simulates an error by immediately throwing a FetchError with the given ErrorCode.
 *   This is useful for testing error handling in consuming components without making a real network request.
 * @returns A promise resolving to the parsed response of type TResponse.
 * @throws {FetchError} - If the response is not ok, a network error occurs, or if 'exception' is provided for testing.
 *
 */
export async function fetchRequest<TResponse>(
	path: string,
	config: RequestInit,
	exception?: ErrorCode,
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

	if (exception !== undefined) {
		throw new FetchError({
			message: getErrorMessage(exception),
			errorCode: String(exception),
		});
	}

	return data as TResponse;
}
