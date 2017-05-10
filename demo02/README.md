### Babel:支持es6语法

通过babel-loader实现对es6语法的支持，并通过webpack进行预处理，转化es6语法为es5。

简单的说：由于es6语法在现有浏览器还未普及支持，通过babel我们可以实现使用es6语法进行代码编写，最终由它（babel）进行预处理，生成的最终<code>bundle.js(源码)</code>会被编译为es5语法。


使用babel需要安装先3个包

```bash
npm install babel-loader babel-core babel-preset-es2015 webpack --save-dev
```


使用es6语法进行代码编写

```javaScript
// index.js
const name = 'Webpack';

const Hello => () {
  document.write(`Hello ${name}`);
}

Hello();

```

index.html

```html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
  </body>
  <script src="./bundle.js" charset="utf-8"></script>
</html>

```

.babelrc文件, babel解析规则配置文件

```json

{
  "presets": [
    ["es2015", {"modules": false}]
  ]
}
```



```javaScript
// webpack.config.js
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

```

执行<code>webpack-dev-server</code>，访问地址：http://localhost:8080/。
