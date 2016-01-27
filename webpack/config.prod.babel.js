import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import strip from 'strip-loader';

import defaults, {webpackIsomorphicToolsPlugin} from './config.defaults';

const relativeAssetsPath = '../static/dist';
const assetsPath = path.join(__dirname, relativeAssetsPath);

export default {
	... defaults,
	devtool: 'source-map',
	output: {
		...defaults.output,
		path: assetsPath,
		publicPath: '/dist/'
	},
	plugins: [
		...defaults.plugins,
		new CleanPlugin([relativeAssetsPath]),
		new ExtractTextPlugin('[name]-[chunkhash].css', {allChunkS: true}),
		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('production')},
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false
		}),
		webpackIsomorphicToolsPlugin
	],
	module: {
		loaders: [
			...defaults.module.loaders,
			{test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel-loader']}
		]
	}
};
