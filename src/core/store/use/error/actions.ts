export enum ErrorType {
	SET = 'Error.SET',
}

// TODO(james): No export
interface ISetErrorAction {
	type: typeof ErrorType.SET;
	message: string;
}

export function setError(message: string): ISetErrorAction {
	return {
		message,
		type: ErrorType.SET,
	};
}

export type ErrorAction = ISetErrorAction;
