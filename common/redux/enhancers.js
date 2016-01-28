import createLogger from 'redux-logger';
import {browserHistory} from 'react-router';
import {syncHistory} from 'redux-simple-router';
import {applyMiddleware, compose} from 'redux';
import sagaMiddleware from 'redux-saga';
import DevTools from '../helpers/DevTools';
import sagas from './sagas';
import apiClientMiddleware from './middlewares/apiClientMiddleware';

export default function getEnhancers (client) {
	const commonMiddlewares = [apiClientMiddleware(client), sagaMiddleware(...sagas)];
	let routerMiddleware, enhancers;

	if (__CLIENT__) {
		let middlewares = [routerMiddleware = syncHistory(browserHistory)];
		if (__DEVELOPMENT__ && __DEVTOOLS__) {
			middlewares.concat(
				applyMiddleware(createLogger()),
				DevTools.instrument(),
				((typeof window === 'object' &&
				typeof window.devToolsExtension !== 'undefined')
					? window.devToolsExtension() : f => f)
			);
		}
		enhancers = compose(
			applyMiddleware(...commonMiddlewares),
			applyMiddleware(...middlewares)
		);
	} else {
		enhancers = applyMiddleware(...commonMiddlewares);
	}

	return {
		routerMiddleware,
		enhancers
	};
}
