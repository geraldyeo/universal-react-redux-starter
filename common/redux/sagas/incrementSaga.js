import { call, put, take, fork } from 'redux-saga';
import { INCREMENT_ASYNC, increment } from '../modules/counter';
import { delay } from '../../utils';

function * incrementAsync () {
	while (yield take(INCREMENT_ASYNC)) {
		yield call(delay, 1000);
		yield put(increment());
	}
}

export default function * incrementSaga () {
	yield fork(incrementAsync);
}
