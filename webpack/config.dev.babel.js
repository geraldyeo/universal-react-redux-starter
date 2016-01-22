import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import rucksack from 'rucksack-css';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import webpackIsomorphicToolsConfig from './isomorphic-tools.config';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);
const assetsPath = path.resolve(__dirname, '../static/dist');
const host = (process.env.HOST || 'localhost');
const port = parseInt(process.env.PORT, 10) + 1 || 9001;
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr';

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

const commonLoaders = [
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		loader: 'babel-loader',
		query: {
			cacheDirectory: true,
			presets: babelrcObject.presets.concat('react-hmre'),
			plugins: babelrcObject.plugins
		}
	},
	{
		test: /\.css$/,
		loaders: [
			'style-loader',
			'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
			'postcss-loader'
		]
	},
	{
		test: webpackIsomorphicToolsPlugin.regular_expression('images'),
		loader: 'url-loader?limit=10240'
	}
];

export default {
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		main: ['babel-polyfill', './app/client.js', hotMiddlewareScript]
	},
	output: {
		path: assetsPath,
		filename: '[name]-[hash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: 'http://' + host + ':' + port + '/dist/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('development') },
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
			{ test: /\.(js|jsx)$/, loader: 'eslint-loader', exclude: /node_modules/ }
		],
		loaders: commonLoaders.concat()
	},
	progress: true,
	resolve: {
		extensions: ['', '.json', '.js', '.jsx'],
		modulesDirectories: ['app', 'node_modules']
	},
	postcss: [
		rucksack({
			autoprefixer: true
		})
	],
	eslint: {
		configFile: path.resolve(__dirname, '../.eslintrc')
	}
};
