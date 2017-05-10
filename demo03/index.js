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
