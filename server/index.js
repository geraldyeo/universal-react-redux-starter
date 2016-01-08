import path from 'path';
import http from 'http';
import httpProxy from 'http-proxy';
import PrettyError from 'pretty-error';
import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

import config from '../app/config';
import configureExpress from './config/express';
import configureRoutes from './config/routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
	target: 'http://' + config.apiHost + ':' + config.apiPort,
	ws: true
});

// Bootstrap express
configureExpress(app);

// Bootstrap routes
configureRoutes(app);

if (config.port) {
	server.listen(config.port, (err) => {
		if (err) {
			console.error(err);
		}
		console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
		console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
	});
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}
