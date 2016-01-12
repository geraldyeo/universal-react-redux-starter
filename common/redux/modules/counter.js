import { createAction } from 'redux-actions';

// constants
export const INCREMENT_COUNTER = 'COUNTER/INCREMENT';
export const DECREMENT_COUNTER = 'COUNTER/DECREMENT';
export const INCREMENT_ASYNC = 'COUNTER/INCREMENT_ASYNC';

const initialState = 0;

// reducer
export default function counter (state = initialState, action) {
	switch (action.type) {
	case INCREMENT_COUNTER:
		return state + 1;
	case DECREMENT_COUNTER:
		return state - 1;
	default:
		return state;
	}
}

// actions
export function increment () {
	return createAction(INCREMENT_COUNTER);
}

export function incrementAsync () {
	return createAction(INCREMENT_ASYNC);
}

export function decrement (argument) {
	return createAction(DECREMENT_COUNTER);
}
