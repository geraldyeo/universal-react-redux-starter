const LOAD = 'ACTIVITY/LOAD';
const LOAD_SUCCESS = 'ACTIVITY/LOAD_SUCCESS';
const LOAD_FAIL = 'ACTIVITY/LOAD_FAIL';

const initialState = {
	loaded: false
};

// reducer
export default function activity (state = initialState, action) {
	switch (action.type) {
	case LOAD:
		return {
			...state,
			loading: true
		};
	case LOAD_SUCCESS:
		return {
			...state,
			loading: false,
			loaded: true,
			data: action.result
		};
	case LOAD_FAIL:
		return {
			...state,
			loading: false,
			loaded: false,
			data: action.error
		};
	default:
		return state;
	}
}

// action creators
export function load () {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadActivity')
	};
}
