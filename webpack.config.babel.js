import path from 'path';
import webpack from 'webpack';

import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/util';

export default {
  entry: [
    'react-hot-loader/patch',
    './src/client',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/js/`,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css/, use: 'style-loader' },
      { test: /\.css/, use: 'css-loader' },
      { test: /\.scss$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]}
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};
