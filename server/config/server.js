import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import HTML from '../../app/helpers/Html';

export default function configureServer (app, proxy) {
	// X-Powered-By header has no functional value.
	// Keeping it makes it easier for an attacker to build the site's profile
	// It can be removed safely
	app.disable('x-powered-by');

	app.use(Express.static(path.join(__dirname, '../..', 'public')));

	// Proxy to API server
	app.use('/api', (req, res) => {
		proxy.web(req, res);
	});

	// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
	proxy.on('error', (error, req, res) => {
		let json;
		if (error.code !== 'ECONNRESET') {
			console.error('proxy error', error);
		}
		if (!res.headersSent) {
			res.writeHead(500, {'content-type': 'application/json'});
		}

		json = {error: 'proxy_error', reason: error.message};
		res.end(JSON.stringify(json));
	});

	app.use((req, res) => {
		if (__DEVELOPMENT__) {
			webpackIsomorphicTools.refresh();
		}

		function hydrateOnClient() {
			 // res.send('<!doctype html>\n' +
			 // 	renderToString(<Html assets={webpackIsomorphicTools.assets()} />));
			res.status(200).send('<!doctype html>');
		}

		if (__DISABLE_SSR__) {
			hydrateOnClient();
			return;
		}

		hydrateOnClient();
	});
}
