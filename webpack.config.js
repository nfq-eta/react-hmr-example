var
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  output: {
    path: `${__dirname}/dist/`,
    filename: "main.js",
    publicPath: "/"
  },

  module: {
    loaders: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      include: __dirname
    } ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    //new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ].concat(
    process.env.NODE_ENV == 'production' ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ] : []
  ),

  devServer: {
    open: true,
    inline: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: [
      {
        context: [ '/api/**', '/api-v1/**' ],
        target: 'https://other-server.example.com',
        secure: false
      }
    ],
  },
};
