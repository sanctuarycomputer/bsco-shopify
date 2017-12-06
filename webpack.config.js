const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'production';


module.exports = {
  entry: {
    filename: './_src/js/app.js'
  },
  output: {
    filename: 'assets/bsco.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', { 'modules': false }]
          ]
        }
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: { glob: './_src/static/**/*' },
        to: './assets',
        flatten: true
      }
    ]),
    // uglify js
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: false
    }),
    // env plugin
    new webpack.DefinePlugin({
      'proccess.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
  ]
};
