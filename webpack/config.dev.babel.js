import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import defaults, {webpackIsomorphicToolsPlugin} from './config.defaults';

const assetsPath = path.resolve(__dirname, '../static/dist');
const host = (process.env.HOST || 'localhost');
const port = parseInt(process.env.PORT, 10) + 1 || 9001;
const hotMiddlewareScript = `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`;

const babelrc = fs.readFileSync('./.babelrc');
let babelrcObject = {};

try {
	babelrcObject = JSON.parse(babelrc);
} catch (err) {
	console.error('==>     ERROR: Error parsing your .babelrc.');
	console.error(err);
}

babelrcObject.presets = babelrcObject.presets || [];
babelrcObject.plugins = babelrcObject.plugins || [];

export default {
	...defaults,
	devtool: 'inline-source-map',
	entry: {
		main: [...defaults.entry.main, hotMiddlewareScript]
	},
	output: {
		...defaults.output,
		path: assetsPath,
		publicPath: `http://${host}:${port}/dist/`
	},
	plugins: [
		...defaults.plugins,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('development')},
			__CLIENT__: true,
			__SERVER__: false,
			__PRODUCTION__: false,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: false
		}),
		webpackIsomorphicToolsPlugin.development()
	],
	module: {
		preLoaders: [
			{test: /\.(js|jsx)$/, loader: 'eslint-loader', exclude: /node_modules/}
		],
		loaders: [
			...defaults.module.loaders,
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true,
					presets: babelrcObject.presets.concat('react-hmre'),
					plugins: babelrcObject.plugins
				}
			}
		]
	}
};
