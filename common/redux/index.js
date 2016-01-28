import {browserHistory} from 'react-router';
import {createStore} from 'redux';
import reducer from './modules';
import getEnhancers from './enhancers';

export default function configureStore (client, initialState) {
	const {routerMiddleware, enhancers} = getEnhancers(client);

	const store = createStore(
		reducer,
		initialState,
		enhancers
	);

	// Required for replaying actions from devtools to work
	if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
		routerMiddleware.listenForReplays(store);
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
