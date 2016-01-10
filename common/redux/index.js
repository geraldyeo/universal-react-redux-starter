import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './modules';
import createLogger from 'redux-logger';
import { devTools } from 'redux-devtools';

export default function configureStore (client, initialState = {}) {
	const middlewares = [];

	let finalCreateStore;
	if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
		finalCreateStore = compose(
			applyMiddleware(...middlewares),
			applyMiddleware(createLogger()),
			devTools()
		)(_createStore);
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
