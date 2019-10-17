export enum ErrorType {
	SET = 'Error.SET',
}

interface ISetErrorAction {
	type: typeof ErrorType.SET;
	message: string;
	localize?: boolean;
}

export function setError(message: string, localize: boolean = true): ISetErrorAction {
	return {
		message,
		localize,
		type: ErrorType.SET,
	};
}

export function clearError(): ISetErrorAction {
	return {
		message: undefined,
		localize: undefined,
		type: ErrorType.SET,
	};
}

export type ErrorAction = ISetErrorAction;
