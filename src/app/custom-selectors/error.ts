import i18n from 'i18n-js';

import { AppState } from '../../core/store';
import { getError } from '../../core/store/error';

export function getLocalizedError(state: AppState): string | undefined {
	const error = getError(state);
	if (!error) { return; }
	return state.error.localize
		? i18n.t(error) : error;
}
