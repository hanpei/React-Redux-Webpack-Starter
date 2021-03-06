const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    /**
     * This plugin assigns the module and chunk ids by occurence count. What this
     * means is that frequently used IDs will get lower/shorter IDs - so they become
     * more predictable.
     */
    new webpack.optimize.OccurenceOrderPlugin(),
    /**
     * See description in 'webpack.config.dev' for more info.
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    /**
     * Some of you might recognize this! It minimizes all your JS output of chunks.
     * Loaders are switched into a minmizing mode. Obviously, you'd only want to run
     * your production code through this!
     */
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/bundle.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(css|scss)$/,
        exclude: path.join(__dirname, 'src/styles'),
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader!sass-loader' // ExtractTextPlugin必须写一起
        ) 
      },
      {
        test: /\.(css|scss)$/,
        include: path.join(__dirname, 'src/styles'),
        loaders: [
          'style-loader',
          'css-loader', // styles目录中的css不使用css_modules
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    root: [
      path.resolve(__dirname),
    ],
    // add alias for application code directory
    alias:{
      components: 'src/components',
      containers: 'src/containers',
      actions: 'src/actions',
      constants: 'src/constants'
    },
    extensions: [ '', '.js' ]
  }
};
