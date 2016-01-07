var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../conf/webpack.config.dev');

var app = express();
var compiler = webpack(config);
var isDev = process.env.NODE_ENV === 'development';

// Development hot reloading
if (isDev) {
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(require('webpack-hot-middleware')(compiler));
}

// Bootstrap express
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

// Start
app.listen(app.get('port'), 'localhost', function (err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:' + app.get('port'));
});
