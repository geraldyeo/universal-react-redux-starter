var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
	config.set({

		browsers: ['Electron'],

		singleRun: !!process.env.CONTINUOUS_INTEGRATION,

		frameworks: ['tap'],

		files: [
			'tests.webpack.js'
		],

		preprocessors: {
			'tests.webpack.js': ['webpack', 'sourcemap']
		},

		reporters: ['tap', 'coverage'],

		coverageReporter: {
			type: 'text',
			dir: 'coverage/'
		},

		plugins: [
			require('karma-webpack'),
			require('karma-tap'),
			require('karma-tap-reporter'),
			require('karma-electron-launcher'),
			require('karma-sourcemap-loader'),
			require('karma-coverage')
		],

		webpack: {
			node : {
				fs: 'empty'
			},
			devtool: 'inline-source-map',
			context: path.resolve(__dirname, '..'),
			module: {
				preLoaders: [
					{test: /\.js$/, exclude: /(tests|node_modules)/, loader: 'isparta'}
				],
				loaders: [
					{test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel'}
				]
			},
			resolve: {
				extensions: ['', '.json', '.js', '.jsx'],
				modulesDirectories: ['app', 'node_modules']
			},
			plugins: [
				new webpack.IgnorePlugin(/\.json$/),
				new webpack.NoErrorsPlugin(),
				new webpack.DefinePlugin({
					__CLIENT__: true,
					__SERVER__: false,
					__DEVELOPMENT__: true,
					__DEVTOOLS__: false
				})
			]
		},

		webpackServer: {
			noInfo: true
		}

	});
};
