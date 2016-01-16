var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
	config.set({
		browsers: ['PhantomJS'],

		singleRun: !!process.env.CONTINUOUS_INTEGRATION,

		frameworks: [ 'mocha' ],

		files: [
			'../node_modules/phantomjs-polyfill/bind-polyfill.js',
			'tests.webpack.js'
		],

		preprocessors: {
			'tests.webpack.js': [ 'webpack', 'sourcemap' ]
		},

		reporters: [ 'mocha' ],

		plugins: [
			require('karma-webpack'),
			require('karma-mocha'),
			require('karma-mocha-reporter'),
			require('karma-phantomjs-launcher'),
			require('karma-sourcemap-loader')
		],

		webpack: {
			devtool: 'inline-source-map',
			context: path.resolve(__dirname, '..'),
			module: {
				loaders: [
					{ test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel'] }
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
