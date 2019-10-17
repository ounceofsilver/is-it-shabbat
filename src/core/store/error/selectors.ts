import { AppState } from '..';

export function getError(
	state: AppState,
	translator?: (message: string) => string,
): string | undefined {
	const message = state.error.message;
	return translator && state.error.localize
		? translator(message)
		: message;
}
