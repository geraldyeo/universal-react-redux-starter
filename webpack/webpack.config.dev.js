require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var rucksack = require('rucksack-css');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools.config'));

var commonLoaders = [
  {
    test: /\.(js|jsx)$/,
    include: path.join(__dirname, '..', 'app'),
    loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0']
  },
  {
    test: /\.html$/,
    loader: 'file?name=[name].[ext]'
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
  devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname, '..', 'app'),
  entry: {
    app: ['./client', 'eventsource-polyfill', hotMiddlewareScript]
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    publicPath: '/assets/'
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
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['app', 'node_modules']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ]
};
