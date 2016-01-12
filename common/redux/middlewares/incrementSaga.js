import { call, put, take } from 'redux-saga';
import { INCREMENT_ASYNC, increment } from '../modules/counter';

function delay (ms) {
	return new Promise(resolve => setTimeout(() => resolve(true), ms));
}

// function * incrementAsync () {
// 	while (yield take(INCREMENT_ASYNC)) {
// 		yield call(delay, 1000);
// 		yield put(increment());
// 	}
// }
// 
export default function* testIncrementAsync () {

}
