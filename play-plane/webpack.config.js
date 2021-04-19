const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './main.js'),
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './dist'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images/',
              publicPath: '', 
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    })
  ]
}