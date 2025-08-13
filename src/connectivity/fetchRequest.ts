import { FetchError } from './fetchError';
import { type ErrorCode, getErrorMessage } from './getErrorMessage';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

/**
 * Makes a type-safe HTTP request to the API.
 *
 * @template TResponse - The expected response type.
 * @param {string} path - The API endpoint path (relative to API_URL).
 * @param {RequestInit} config - The RequestInit configuration object for fetch.
 * @param {ErrorCode} [exception] - (Testing only) If provided, simulates an error by immediately throwing a FetchError with the given ErrorCode.
 *   Useful for testing error handling in consuming components without making a real network request.
 * @returns {Promise<TResponse>} A promise resolving to the parsed response of type TResponse.
 * @throws {FetchError} If the response is not ok, a network error occurs, the request is aborted, or if 'exception' is provided for testing.
 *   - For non-2xx responses, throws with a message based on HTTP status.
 *   - For network/abort errors, throws with a specific error code.
 *   - For unknown errors, throws with a generic message.
 * @remarks
 * - Automatically parses JSON responses if content-type is 'application/json', otherwise returns text.
 */

export async function fetchRequest<TResponse>(
	path: string,
	config: RequestInit,
	exception?: ErrorCode,
): Promise<TResponse> {
	if (exception !== undefined) {
		throw new FetchError({
			message: getErrorMessage(exception),
			errorCode: String(exception),
		});
	}

	const url = `${API_URL}${path}`;

	try {
		const response = await fetch(url, config);

		const responseType = response.headers.get('content-type');
		const data = responseType?.includes('application/json')
			? await response.json()
			: await response.text();

		// non-2xx responses
		if (!response.ok) {
			const errorCode = response.status as ErrorCode;

			throw new FetchError({
				message: getErrorMessage(errorCode) || response.statusText,
				errorCode: errorCode.toString(),
				status: response.status,
				response: data,
			});
		}
		return data as TResponse;
	} catch (error) {
		// catches network errors, CORS errors, aborts, and unexpected exceptions

		//Abort error
		if (error instanceof DOMException && error.name === 'AbortError') {
			throw new FetchError({
				message: 'The request was aborted',
				errorCode: 'ABORT_ERROR',
			});
		}

		// Network-level failures
		if (error instanceof TypeError) {
			// This is usually a network error (e.g., failed to fetch)
			throw new FetchError({
				message: 'Network error or CORS issue.',
				errorCode: 'NETWORK_ERROR',
				response: error.message,
			});
		}

		throw new FetchError({
			message: error instanceof Error ? error.message : 'Unknown error',
			errorCode: 'UNKNOWN_ERROR',
			response: error,
		});
	}
}
