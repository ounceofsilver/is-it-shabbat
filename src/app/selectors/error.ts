import i18n from 'i18n-js';

import { AppState } from '../../core/store/use';
import { getError } from '../../core/store/use/error/selectors';

export function getLocalizedError(state: AppState): string | undefined {
	const error = getError(state);
	if (!error) { return; }
	return state.error.localize
		? i18n.t(error) : error;
}
