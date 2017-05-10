const webpack = require('webpack');   // 引入webpack，使用webpack内置插件

module.exports = {
  entry: './index.js',          // 入口文件；
  output: {
    filename: 'bundle.js'       // 经过webpack编译后,输出的文件；
  },
  module: {
    loaders: [
      {
        test: /\.js$/,          // 也可以多文件后缀：/\.(js|jsx)$/
        loader: 'babel-loader'  // 使用Babel解析器
      }
    ]
  },
  devServer: {
    // host: 'localhost',                           // 默认为localhost, 如果你希望服务器外部可访问,可以更改为：0.0.0.0
    hot: true                                   // 开启服务器的模块热替换（HMR）
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),   // 开启全局的模块热替换（HMR）
    new webpack.NamedModulesPlugin()            // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
  ]
}
