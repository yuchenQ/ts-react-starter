/** @format */

import merge from 'webpack-merge';
import { HotModuleReplacementPlugin } from 'webpack';
import { baseConfig } from './webpack.config.base.babel';
import DashboardPlugin from 'webpack-dashboard/plugin';
import Dashboard from 'webpack-dashboard';

const dashboard = new Dashboard();

const devConfig = merge(baseConfig, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    compress: true,
    hot: true,
    quiet: true, // lets WebpackDashboard do its thing
    host: process.env.DEV_HOST || '0.0.0.0',
    port: process.env.DEV_PORT || 8000,
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
      port: process.env.DEV_PORT || 8000,
      handler: dashboard.setData,
    }),
  ],
});

export default devConfig;
