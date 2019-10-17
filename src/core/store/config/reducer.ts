import { ConfigAction, ConfigType } from './actions';
import { ILocation } from './types';

// State
export interface IConfigState {
	ff: {
		omer: boolean;
	};
	location?: ILocation;
}
const initialState: IConfigState = {
	ff: {
		omer: true,
	},
};

// Reducer
export default (
	state: IConfigState = initialState,
	action: ConfigAction,
): IConfigState => {
	switch (action.type) {
	case ConfigType.SET_LOCATION:
		return {
			...state,
			location: action.location,
		};
	default:
		return state;
	}
};
