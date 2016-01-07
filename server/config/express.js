var path = require('path');
var express = require('express');
var httpProxy = require('http-proxy');

module.exports = function configureExpress (app) {
	app.set('port', (process.env.PORT || 9090));
	
	// X-Powered-By header has no functional value.
	// Keeping it makes it easier for an attacker to build the site's profile
	// It can be removed safely
	app.disable('x-powered-by');

	app.use(express.static(path.join(__dirname, '../..', 'public')));

	var node_env = process.env.NODE_ENV;
	var port = (node_env === 'production') ? app.get('port') : 9900;
}