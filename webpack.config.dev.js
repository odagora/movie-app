const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  mode: 'development',
  resolve: {
    extensions: [".js"],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'src/js/utils'),
      '@ui': path.resolve(__dirname, 'src/js/ui'),
      '@services': path.resolve(__dirname, 'src/js/services'),
      '@routes': path.resolve(__dirname, 'src/js/routes'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|styl)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin(),
    new Dotenv()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true
    },
    watchFiles: path.join(__dirname, "./**"),
    compress: true,
    historyApiFallback: true,
    port: 3006,
    open: true,
  },
};

module.exports = config;