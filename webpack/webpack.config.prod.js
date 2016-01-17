require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');
var rucksack = require('rucksack-css');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools.config'));

var relativeAssetsPath = '../static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

var commonLoaders = [
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

module.exports = {
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
