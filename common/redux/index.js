import createLogger from 'redux-logger';
import { devTools } from 'redux-devtools';

import { createStore, applyMiddleware, compose } from 'redux';
// import sagaMiddleware from 'redux-saga';
import rootReducer from './modules';
// import rootSaga from './middlewares/incrementSaga';

export default function configureStore (client, initialState) {
	const middlewares = [/* sagaMiddleware(rootSaga) */];

	let finalCreateStore;
	if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
		finalCreateStore = compose(
			applyMiddleware(...middlewares),
			applyMiddleware(createLogger()),
			devTools(),
			typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
		)(createStore);
	} else {
		finalCreateStore = applyMiddleware(...middlewares)(createStore);
	}

	const store = finalCreateStore(rootReducer, initialState);

	if (__DEVELOPMENT__ && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./modules', () => {
			const nextReducer = require('./modules');
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
