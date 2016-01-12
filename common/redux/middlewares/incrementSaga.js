import { call, put, take } from 'redux-saga';
import { INCREMENT_ASYNC, increment } from '../modules/counter';

function delay (ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms);
	});
}

function * incrementAsync () {
	while (yield take(INCREMENT_ASYNC)) {
		yield call(delay, 1000);
		yield put(increment());
	}
}

export default [incrementAsync];
