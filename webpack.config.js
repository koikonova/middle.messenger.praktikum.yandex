const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './static/index.html',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
//     contentBase: 'dist',
//     compress: true,
    port: 3000
  },
  module: {
    rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          }
        },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
//         {
//           test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
//           type: 'asset/resource',
//         },
    ]
  },
   plugins: [
       new CopyWebpackPlugin({
         patterns: [
           {
             from: '**/*',
             context: path.resolve(__dirname, 'src', 'assets'),
             to: './assets',
           },
         ],
       }),
      new HtmlWebpackPlugin({
        template: './static/index.html',
        filename: 'index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'style-[hash].css',
      }),
    ],
};