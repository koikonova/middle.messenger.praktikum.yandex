const path = require('path');

module.exports = {
  mode: 'development',
  entry: './static/index.html',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'project-name.bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
      contentBase: 'dist',
      compress: true,
      port: 3000,
    },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules | dist/,
      },
      {
          test: /\.html$/i,
          loader: "html-loader",
      },
      {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
      },
      {
         test: /\.s[ac]ss$/i,
         loader: "sass-loader",
      },
      {
         test: /\.css$/i,
         loader: "css-loader",
      },
    ]
  }
};