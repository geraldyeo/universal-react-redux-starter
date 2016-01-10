require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var rucksack = require('rucksack-css');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools.config'));

var assetsPath = path.resolve(__dirname, '../static/dist');
var host = (process.env.HOST || 'localhost');
var port = parseInt(process.env.PORT) + 1 || 9001;
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr';

var commonLoaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: ['react-hmre']
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

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: ['./app/client.js', hotMiddlewareScript]
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
      __DEVELOPMENT_TOOLS__: false
    }),
    webpackIsomorphicToolsPlugin.development()
  ],
  module: {
    loaders: commonLoaders.concat()
  },
  progress: true,
  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ]
};
