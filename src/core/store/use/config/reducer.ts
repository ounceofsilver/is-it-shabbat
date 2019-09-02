import { ILocation } from '../../../models/config';
import { ConfigAction, ConfigType } from './actions';

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
