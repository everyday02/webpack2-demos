module.exports = {
  entry: './index.js',          // 入口文件；
  output: {
    filename: 'bundle.js'       // 经过webpack编译后,输出的文件；
  },
  module: {
    rules: [{
      // style-loader, css-loader, less-loader, sass-loader
      test: /\.css?$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },{
      test: /\.(png|jpg)$/,
      // 'file-loader' , 'url-loader'
      use: ['url-loader?limit=8192']
    }]
  }
}
