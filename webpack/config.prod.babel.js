import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import strip from 'strip-loader';
import rucksack from 'rucksack-css';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import webpackIsomorphicToolsConfig from './isomorphic-tools.config';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);
const relativeAssetsPath = '../static/dist';
const assetsPath = path.join(__dirname, relativeAssetsPath);

const commonLoaders = [
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		loaders: [strip.loader('debug'), 'babel-loader']
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
	devtool: 'source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		main: ['babel-polyfill', './app/client.js']
	},
	output: {
		path: assetsPath,
		filename: '[name]-[chunkhash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: '/dist/'
	},
	plugins: [
		new CleanPlugin([relativeAssetsPath]),
		new ExtractTextPlugin('[name]-[chunkhash].css', {allChunkS: true}),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('production') },
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false
		}),
		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
		webpackIsomorphicToolsPlugin
	],
	module: {
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
