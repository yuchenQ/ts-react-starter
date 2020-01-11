/** @format */

import { resolve } from 'path';
import { warmup as threadLoaderWarmup } from 'thread-loader';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

threadLoaderWarmup(
  {
    // pool options, like passed to loader options
    // must match loader options to boot the correct pool
  },
  [
    // modules to load
    'babel-loader',
    'css-loader',
  ],
);

const BUILD_DIR = resolve(__dirname, 'build');
const PUBLIC_DIR = resolve(__dirname, 'public');
const SOURCE_DIR = resolve(__dirname, 'src');
const MODULES_DIR = resolve(__dirname, 'node_modules');

const baseConfig = {
  entry: `${SOURCE_DIR}/index.tsx`,

  output: {
    path: BUILD_DIR,
    filename: 'js/bundle.[name].js',
    sourceMapFilename: 'map/[name].js.map',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    modules: [SOURCE_DIR, MODULES_DIR],
    mainFiles: ['index'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        // loader run from bottom to top
        use: ['cache-loader', 'thread-loader', 'babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, // commonJS -> Native JS (same as style-loader)
          // cache-loader and mini-css-extract don't work as desired when together
          'thread-loader',
          'css-loader', // css -> commonJS
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              optipng: { enabled: true },
              gifsicle: { interlaced: false },
              webp: { quality: 75 },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: resolve(PUBLIC_DIR, 'index.html'),
      inject: true,
      // compress HTML config
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new OptimizeCSSAssetsPlugin(),
  ],
};

export { baseConfig as default, baseConfig };
