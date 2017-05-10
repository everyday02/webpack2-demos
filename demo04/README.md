### Caching:缓存

浏览器具有缓存机制，当客户端第一次访问服务器后，会将资源缓存至本地，以便提高二次访问的速度。

然后这样做有一个缺陷：如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。

这显然不是我们愿意看到的。

告诉浏览器下载较新版本的一种简单方法就是更改资源的文件名。在webpack之前的时代，我们一般会添加一个内部版本号作为参数，然后逐次递增：

```code
application.js?build=1
application.css?build=1
```

使用webpack就更简单了。通过包含输出占位符，每次webpack构建时都会生成一个唯一的哈希值用来构成文件名。

以下这个配置示例会生成一个在文件名中带有哈希值的文件：

```javaScript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: {
    main: './index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
  }
};
```

使用这个配置文件运行webpack会生成下面的结果：

```bash
Hash: 6c7df62fd64ae5e3c891
Version: webpack 2.5.1
Time: 60ms
                       Asset     Size  Chunks             Chunk Names
main.6c7df62fd64ae5e3c891.js  2.67 kB       0  [emitted]  main
   [0] ./index.js 33 bytes {0} [built]
```

但是这里的问题是，在任何文件更新之后构建就会更新所有文件名，然后客户端就不得不重新下载所有代码。 那么我们如何保证客户端始终获得最新版本的资源，而又不需要重新下载所有的资源呢？


#### 为每个文件生成唯一的哈希值
  * 如果文件内容在两次构建之间没有变化，就生成相同的文件名。

webpack允许你根据文件内容生成哈希值，只要用[chunkhash]替换[hash]就可以了。以下是新的配置：

```javaScript
module.exports = {
  /*...*/
  output: {
    /*...*/
 // filename: '[name].[hash].js'
    filename: '[name].[chunkhash].js'
  }
};
```
这种情况下，每个文件会获得自己唯一的哈希值。

在开发模式下，你只要在HTML中直接引用JavaScript文件：
```HTML
  <script src="./bundle.js"></script>
```

而每次在生产环境中构建，我们都会得到不同的文件名。类似这样：
```HTML
  <script src="bundle.50cfb8f89ce2262e5325.js"></script>
```

为了在HTML中引用正确的文件，我们可以使用这个插件[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)：
```javaScript
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
  plugins: [new HtmlWebpackPlugin({title: 'Hello Webpack'})]  //自动将所有依赖js文件引入至index.html中。
};

```

在最后的<code>dist/index.html</code>中，可以看到，已自动引入需要的入口文件：
```html
  <script type="text/javascript" src="main.2cd5b2a8079542ef99ce.js"></script></body>
```


[原文链接](http://www.css88.com/doc/webpack2/guides/caching/)
