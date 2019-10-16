import { AppState } from '..';

export function getError(state: AppState): string | undefined {
	return state.error.message;
}
