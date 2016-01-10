import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';

import routes from '../../app/routes';
import configureStore from '../../common/redux';
import ApiClient from '../../common/helpers/ApiClient';
import Html from '../../common/helpers/Html';

export default function configureServer (app, proxy) {
	// X-Powered-By header has no functional value.
	// Keeping it makes it easier for an attacker to build the site's profile
	// It can be removed safely
	app.disable('x-powered-by');

	app.use(Express.static(path.join(__dirname, '../..', 'static')));

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

		// @todo: create store / fetch anything
		const client = new ApiClient(req);

		const store = configureStore(client);

		function hydrateOnClient () {
			res.send('<!doctype html>\n' + renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
		}

		if (__DISABLE_SSR__) {
			hydrateOnClient();
			return;
		}

		match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
			if (error) {
				res.status(500);
				hydrateOnClient();
			} else if (redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {

			} else {
				res.status(404);
				hydrateOnClient();
			}
		});
	});
}
