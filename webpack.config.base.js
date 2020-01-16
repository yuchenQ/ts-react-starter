/** @format */

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const SOURCE_DIR = path.resolve(__dirname, 'src');
const MODULES_DIR = path.resolve(__dirname, 'node_modules');

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
        include: path.resolve(__dirname, 'src/style'),
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: mode === 'development',
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
        include: path.resolve(__dirname, 'src/assets'),
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
      template: path.resolve(PUBLIC_DIR, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: mode === 'development' ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: mode === 'development' ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    new HardSourceWebpackPlugin(),
  ],
};
