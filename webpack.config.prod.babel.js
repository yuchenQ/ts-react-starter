/** @format */

import merge from 'webpack-merge';
import { baseConfig } from './webpack.config.base.babel';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const prodConfig = merge(baseConfig, {
  mode: 'production',

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'analyse/bundle_size.html',
    }),
  ],
});

export default prodConfig;
