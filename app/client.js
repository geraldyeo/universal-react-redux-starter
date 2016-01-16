import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import io from 'socket.io-client';

import routes from './routes';
import configureStore from '../common/redux';
import ApiClient from '../common/helpers/ApiClient';

const client = new ApiClient();
const dest = document.getElementById('root');
const { store, history } = configureStore(client, window.__data);

function initSocket () {
	const socket = io('', {path: '/api/ws', transports: ['polling']});
	socket.on('news', (data) => {
		console.log(data);
		socket.emit('my other event', { my: 'data from client' });
	});
	socket.on('msg', (data) => {
		console.log(data);
	});
	return socket;
}
global.socket = initSocket();

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
const component = (
	<Router history={history}>
		{routes}
	</Router>
);

render(
	<Provider store={store} key="provider">
		{component}
	</Provider>,
	dest
);

if (process.env.NODE_ENV !== 'production') {
	window.React = React; // enable debugger

	if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
		console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
	}
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
	const DevTools = require('../common/helpers/DevTools');
	render(
		<Provider store={store} key="provider">
			<div>
				{component}
				<DevTools />
			</div>
		</Provider>,
		dest
	);
}
