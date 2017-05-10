### Entry:入口文件

查看demo01源码

```javaScript
// index.js
document.write('Hello Webpack');

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


通过指定entry入口文件，去构建生成bundle.js
```javaScript
// webpack.config.js
module.exports = {
  entry: './index.js',      //入口文件；
  output: {
    filename: 'bundle.js'   //经过webpack编译后,输出的文件；
  }
}
```

尝试删除bundle.js文件，然后执行<code>webpack</code>去构建<code>bundle.js</code>。


执行<code>webpack-dev-server</code>，访问地址：http://localhost:8080/。


entry可有多个，[查看相关文档](http://www.css88.com/doc/webpack2/concepts/entry-points/)
