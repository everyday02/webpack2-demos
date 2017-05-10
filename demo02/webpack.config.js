module.exports = {
  entry: './index.js',          //入口文件；
  output: {
    filename: 'bundle.js'       //经过webpack编译后,输出的文件；
  },
  module: {
    loaders: [
      {
        test: /\.js$/,          //也可以多文件后缀：/\.(js|jsx)$/
        loader: 'babel-loader'
      }
    ]
  }
}
