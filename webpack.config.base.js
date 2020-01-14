/** @format */
const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BUILD_DIR = resolve(__dirname, 'build');
const PUBLIC_DIR = resolve(__dirname, 'public');
const SOURCE_DIR = resolve(__dirname, 'src');
const MODULES_DIR = resolve(__dirname, 'node_modules');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode,

  entry: `${SOURCE_DIR}/index.tsx`,

  output: {
    path: BUILD_DIR,
    filename: 'js/bundle.[name].js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: [SOURCE_DIR, MODULES_DIR],
    mainFiles: ['index'],
  },

  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          'cache-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'images/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
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
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename:
        process.env.NODE_ENV === 'development' ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
  ],
};
