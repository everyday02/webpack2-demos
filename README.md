记录了个人在学习webpack2中写的一些demos和过程遇到的坑点文章。

### 如何开始学习

1. 安装必须的2个包,webpack 和 webpack-dev-server到全局环境。
```shell
 npm i -g webpack webpack-dev-server
```

2. 接着，进入demo01, 阅读<code>README.md</code>开始学习。


### webpack2 - 基础教程

基础教程中，并未使用到React/Angualr/vue，减低学习成本，仅仅是最基础的javaScript代码。

主要针对已有一定前端基础的同学，看不懂的请先打好前端基础。

 * [demo01 Entry:入口文件](/demo01).

 * [demo02 Babel:支持es6语法](/demo02).

 * [demo03 HMR:模块热更新（替换)](/demo03).


### webpack2 - 高级教程

高级教程:为了减低demo之间的耦合，<code>package.json</code>文件分别放置在每个demo文件夹下，保证独立性。

结合大量生态插件，代码调优等，进行前端项目环境搭建。
