/** @format */

const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  performance: {
    hints: 'error',
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ cache: true }), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // some server doesn't like tag'@'
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'analyse/bundle_size.html',
    }),
  ],
});
