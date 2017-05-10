// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: '[name].[hash].js'
    filename: '[name].[chunkhash].js'
  },
  plugins: [new HtmlWebpackPlugin({title: 'Hello Webpack'})]    //自动将所有依赖js文件引入至index.html中。
};
