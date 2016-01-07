import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import fetch from 'isomorphic-fetch';

const clientConfig = {
	host: process.env.HOSTNAME || 'localhost',
	port: process.env.PORT || '9090'
};


/**
 * Our HTML template
 * @param  {[type]} renderedContent [description]
 * @param  {[type]} initialState    [description]
 * @param  {Object} head            [description]
 * @return {[type]}                 [description]
 */
function renderHTMLPage (renderedContent, initialState, head = {
	title: 'React Webpack Node',
	meta: {
		charset: '<meta charset="UTF-8" />',
		viewport: '<meta name="viewport" content="width=device-width, initial-scale=1" />'
	}
}) {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			${head.meta.charset}
			${head.title}
        	${head.meta.viewport}
		</head>
		<body>
			<div id="root">${renderedContent}</div>
			<script>
				window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
			</script>
			<script src="/assets/app.js"></script>
		</body>
		</html>
	`;
}

/**
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
	const renderedPage = renderHTMLPage('Hello, world!', {});
	res.status(200).send(renderedPage);
};
