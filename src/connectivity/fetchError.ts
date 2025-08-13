/**
 * Interface for fetch error objects.
 * @property name - The error name (usually 'FetchError').
 * @property message - The error message.
 * @property errorCode - Application-specific error code.
 * @property status - HTTP status code (optional).
 * @property response - The raw response or error payload (optional).
 */
export interface IFetchError {
	name: string;
	message: string;
	errorCode: string;
	status?: number;
	response?: unknown;
}

/**
 * Custom error class for network and HTTP errors.
 * Extends the built-in Error class and implements IFetchError.
 *
 * @example
 * throw new FetchError({
 *   message: 'Simulated network failure',
 *   errorCode: 'NETWORK_ERROR',
 *   status: 503,
 *   response: { info: 'Service Unavailable' }
 * });
 */
export class FetchError extends Error implements IFetchError {
	errorCode: string;
	status?: number;
	response?: unknown;

	/**
	 * Constructs a new FetchError instance.
	 * @param params - Error details.
	 * @param params.message - The error message.
	 * @param params.errorCode - Application-specific error code.
	 * @param params.status - HTTP status code (optional).
	 * @param params.response - The raw response or error payload (optional).
	 */
	constructor({
		message,
		errorCode,
		status,
		response,
	}: {
		message: string;
		errorCode: string;
		status?: number;
		response?: unknown;
	}) {
		super(message);
		this.name = 'FetchError';
		this.errorCode = errorCode;
		this.status = status;
		this.response = response;
	}
}
