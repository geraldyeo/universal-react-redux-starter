import createLogger from 'redux-logger';
import { devTools } from 'redux-devtools';

import { browserHistory } from 'react-router';
import { syncHistory } from 'redux-simple-router';
import { createStore, applyMiddleware, compose } from 'redux';
import sagaMiddleware from 'redux-saga';

import rootReducer from './modules';
import sagas from './sagas';
import apiClientMiddleware from './middlewares/apiClientMiddleware';

export default function configureStore (client, initialState) {
	const commonMiddlewares = [apiClientMiddleware(client), sagaMiddleware(...sagas)];

	let reduxRouterMiddleware, finalCreateStore;
	if (__CLIENT__) {
		reduxRouterMiddleware = syncHistory(browserHistory);
		let middlewares = [reduxRouterMiddleware];
		if (__DEVELOPMENT__ && __DEVTOOLS__) {
			middlewares.concat(
				applyMiddleware(createLogger()),
				devTools(),
				typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
			);
		}
		finalCreateStore = compose(
			applyMiddleware(...commonMiddlewares),
			applyMiddleware(...middlewares)
		)(createStore);
	} else {
		finalCreateStore = applyMiddleware(...commonMiddlewares)(createStore);
	}

	const store = finalCreateStore(rootReducer, initialState);

	// Required for replaying actions from devtools to work
	if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
		reduxRouterMiddleware.listenForReplays(store);
	}

	if (__DEVELOPMENT__ && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./modules', () => {
			const nextReducer = require('./modules');
			store.replaceReducer(nextReducer);
		});
	}

	return {
		store,
		history: browserHistory
	};
}
