import { VIEWS } from '../../utils/constants';

const initialState = {
	view: false,
}

const viewReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case VIEWS:
			return {
				...state,
				view: payload,
			};
		default:
			return state;
	}
}

export default viewReducer;