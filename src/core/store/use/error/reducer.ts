import { ErrorAction, ErrorType } from './actions';

// State
export interface IErrorState {
	message?: string;
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
		};
	default:
		return state;
	}
};
