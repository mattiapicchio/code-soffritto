export enum ErrorCode {
	NOT_FOUND = 404,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
}

export function getErrorMessage(errorCode: ErrorCode): string {
	if (errorCode == null) {
		return 'Something went wrong';
	}

	switch (errorCode) {
		case ErrorCode.NOT_FOUND:
			return 'The requested resource was not found.';
		case ErrorCode.UNAUTHORIZED:
			return 'You are not authorized to access this resource.';
		case ErrorCode.FORBIDDEN:
			return 'Access to this resource is forbidden.';
		default:
			return 'An unknown error occurred.';
	}
}
