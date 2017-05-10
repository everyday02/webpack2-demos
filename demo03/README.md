### HMR:模块热更新（替换）
Hot Module Replacement（HMR）webpack中很实用一个插件，它的作用是在应用运行时，对代码进行改动，无需刷新页面，便能替换、增加、删除必要的模块。

之前一直有使用到<code>webapck-dev-server</code>,这是一个本地服务器，基于node.js构建。

在<code>webpack.config.js</code>配置中,devServer为其(webpack-dev-server)配置项

请在<code>demo03</code>目录执行<code>npm install</code> 进行依赖安装。

使用全局webpack-dev-server，对热更新路径解析有所不同，在运行<code>demo03</code>前，请先在当前目录执行<code>npm install</code>。

（实际开发中，由于项目部署环境经常变化，建议不要使用全局webpack-dev-server，教程使用仅是为了更便捷。）

```javascript
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
    host: 'localhost',                          // 默认为localhost, 如果你希望服务器外部可访问,可以更改为：0.0.0.0
    hot: true                                   // 开启服务器的模块热替换（HMR）
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),   // 开启全局的模块热替换（HMR）
    new webpack.NamedModulesPlugin()            // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
  ]
}

```

不仅需要配置<code>webpack.config.js</code>，实现热更新，需要我们在代码中编写替换逻辑


1. 创建<code>Hello.js</code>

```javascript
// ./components/Hello.js
export default function() {
  let div = document.createElement('div');
  div.innerHTML = 'Hello Webpack';
  return div;
}

```

2. 导入<code>Hello.js</code> ，并实现监听

```javascript
// index.js
import Hello from './components/Hello';

let hello = Hello();

document.body.appendChild(hello);

 // 关键点，module对象是webpack暴露出来的配置对象
if(module.hot) {  //判断是否进行热替换
  module.hot.accept('./components/Hello', function() {
    console.info('HMR update...');
    let temp = Hello();
    document.body.replaceChild(temp, hello);
    hello = temp;
  });
}
```

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


执行<code>webpack-dev-server</code>，访问地址：http://localhost:8080/。

最基本的热更新配置完成,通过更改<code>/components/Hello.js</code>内容，可以看到，浏览器无刷新便实现内容更新。

有兴趣的同学，可以通过浏览器开发工具 -> 网络(network)，看看更改代码后，网络请求有何变化，有助于理解webpack是如何实现热更新。


### 注意点
  热更新结合Babel使用时，请务必在babel规则配置<code>.babelrc</code>中加上<code>{"modules": false}</code>来禁用Babel模块插件，否则热更新会失败。

  ```json
  {
    "presets": [
      ["es2015", {"modules": false}]
    ]
  }

  ```

  注意，不仅仅只有模块热替换的场景需要禁用Babel模块插件。如果你不将
  插件禁用，你可能会遇到许多其他的问题(查看 从[webpack v1 迁移到 v2](http://www.css88.com/doc/webpack2/guides/migrating/#mixing-es2015-with-amd-and-commonjs) 和 [webpack-tree-shaking](http://2ality.com/2015/12/webpack-tree-shaking.html))。
