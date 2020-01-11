/** @format */

import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { baseConfig } from './webpack.config.base.babel';

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
