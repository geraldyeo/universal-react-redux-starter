var path = require('path');
var webpack = require('webpack');
var rucksack = require('rucksack-css');

var commonLoaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loaders: ['babel?presets[]=react,presets[]=es2015']
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
  }
];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') }
    })
  ],
  module: {
    loaders: commonLoaders.concat()
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ]
};
