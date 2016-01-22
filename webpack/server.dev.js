import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../app/config';
import webpackConfig from './config.dev.babel';

const compiler = webpack(webpackConfig);
const host = config.host || 'localhost';
const port = (config.port + 1) || 9001;
const serverOptions = {
	contentBase: 'http://' + host + ':' + port,
	quiet: true,
	noInfo: true,
	hot: true,
	inline: true,
	lazy: false,
	publicPath: webpackConfig.output.publicPath,
	headers: {'Access-Control-Allow-Origin': '*'},
	stats: {colors: true}
};

const app = Express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.listen(port, function (err) {
	if (err) {
		console.error(err);
	} else {
		console.info('==> 🚧  Webpack development server listening on port %s', port);
	}
});
