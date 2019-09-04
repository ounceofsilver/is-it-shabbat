import { ErrorAction, ErrorType } from './actions';

// State
export interface IErrorState {
	message?: string;
	localize?: boolean;
}
const initialState: IErrorState = {};

// Reducer
export default (
	state: IErrorState = initialState,
	action: ErrorAction,
): IErrorState => {
	switch (action.type) {
	case ErrorType.SET:
		return {
			...state,
			message: action.message,
			localize: action.localize,
		};
	default:
		return state;
	}
};
