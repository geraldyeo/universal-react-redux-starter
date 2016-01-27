import path from 'path';
import webpack from 'webpack';
import rucksack from 'rucksack-css';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import webpackIsomorphicToolsConfig from './isomorphic-tools.config';

export const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);

export default {
	context: path.resolve(__dirname, '..'),
	entry: {
		main: ['babel-polyfill', './app/client.js']
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[id].[hash:5]-[chunkhash:7].js',
		devtoolModuleFilenameTemplate: '[absolute-resource-path]'
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin()
	],
	module: {
		loaders: [
			{test: /\.css$/, loaders: ['style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]', 'postcss-loader']},
			{test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'}
		]
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
