### Always:常用Loaders

#### 常用Loaders:
  * 样式处理: style-loader, css-loader, less-loader, sass-loader
  * 图片处理: url-loader,  file-loader 两个基本都会用上
  * 支持es6 / 7: babel-loader，babel-preset-es2015，babel-preset-react


#### 样式处理：

```css
/* index.css */
body {
  background: #ccc;
}

```

在入口<code>index.js</code>中导入<code>css</code>文件
```javascript
// index.js
require('./index.css');

document.write('Hello Webapck');

```

配置css加载器, 加载器执行顺序，从右至左进行加载解析
对sass和less不太了解的同学, 可以看看[SASS用法指南](http://www.ruanyifeng.com/blog/2012/06/sass.html)

```javascript
// webpack.config.js
module.exports = {
  entry: './index.js',          // 入口文件；
  output: {
    filename: 'bundle.js'       // 经过webpack编译后,输出的文件；
  },
  module: {
    rules: [{
      // style-loader, css-loader, less-loader, sass-loader
      test: /\.css?$/,
      use: ['style-loader', 'css-loader', 'sass-loader', 'less-loader']
    }]
  }
}
```

执行<code>webpack-dev-server</code>，访问地址：http://localhost:8080/。



#### 图片处理：


在<code>index.css</code>中引入图片

```css
/* index.css */
body {
  background: #ccc;
}

.img {
  background: url('./img.png');
}
```

加入<code>url-loader</code>加载器, 并配置小于8K的图片直接以base64的形式内联在代码中(
[url-loader和file-loader加载器有什么区别](https://segmentfault.com/q/1010000006239813/a-1020000006241010) )
```javascript
// webpack.config.js
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
```

执行webpack-dev-server，访问地址：http://localhost:8080/。


#### 支持es6 / 7：

参考: [demo02](/demo02)


#### 其他加载器后续更新。

#### 参考文章
  * [Webpack优化01](https://github.com/lcxfs1991/blog/issues/2)
  * [如何 10 倍提高你的 Webpack 构建效率](https://segmentfault.com/a/1190000005770042)
