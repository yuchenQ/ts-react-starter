/** @format */

const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const Dashboard = require('webpack-dashboard');
const baseConfig = require('./webpack.config.base');

const dashboard = new Dashboard();
const DEFAULT_PORT = 8000;

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',

  performance: {
    hints: 'warning',
  },

  devServer: {
    compress: true,
    hot: true,
    quiet: true, // lets WebpackDashboard do its thing
    host: process.env.DEV_HOST || '0.0.0.0',
    port: process.env.DEV_PORT || DEFAULT_PORT,
    historyApiFallback: true,
    overlay: { errors: true },
    open: true,
    stats: {
      colors: true,
      assets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false,
      hash: false,
      modules: false,
      timings: false,
      version: false,
    },
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new DashboardPlugin({
      port: process.env.DEV_PORT || DEFAULT_PORT,
      handler: dashboard.setData,
    }),
  ],
});
