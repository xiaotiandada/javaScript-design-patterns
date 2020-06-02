// 适配器模式

// 用来解决两个接口不兼容的问题 用一个对象包裹不兼容的对象 比如参数转换 允许直接访问
// https://juejin.im/post/5c984610e51d45656702a785



class Adapter {
  specificRequest() {
    return '德国标准插头'
  }
}

class Target {
  constructor() {
    this.adapter = new Adapter()
  }
  request() {
    const info = this.adapter.specificRequest()
    console.log(`${info} - 转换器 - 中国标准插头`)
  }
}

const target = new Target()
target.request() // 德国标准插头 - 转换器 - 中国标准插头

// 适配器模式（Adapter）是将一个类（对象）的接口（方法或属性）转化成客户希望的另外一个接口（方法或属性），
// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E9%80%82%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F.html

// 适配器模式使得原本由于接口不兼容而不能一起工作的那些类（对象）可以一些工作。速成包装器（wrapper）。
// 使用场景：比如，当系统中某个接口的结构已经无法满足我们现在的业务需求，但又不能改动这个接口，
// 因为可能原来的系统很多功能都依赖于这个接口，改动接口会牵扯到太多文件。
// 因此应对这种场景，我们可以很快地想到可以用适配器模式来解决这个问题。

// Prototype库的$函数

// {
//   function $(){
//     var elments = new Array();
//     for(var i=0; i<arguments.length; i++){
//       var element = arguments[i];
//       if(typeof element == 'string'){
//         element = document.getElementById(element);
//       }
//       if(arguments.length == 1){
//         return element;
//       }
//       elments.push(element);
//     }
//     return elements;
//   }
// }


function $(...args) {
  let elements = []

  for (let i = 0; i < args.length; i++) {
    let element = args[i]

    if (typeof element === 'string') {
      element = document.getElementById(element)
    }

    if (args.length === 1) {
      return element
    }

    elements.push(element)
  }
  return elements
}

function adapter$(...args) {
  return $.apply(window, args)
}

console.log($('btn', 'login'))
console.log(adapter$('btn', 'login'))

// 注意：适配器模式尽量少使用，就类似于在衣服上打补丁。特别是在接口还没有确定的时候使用，因为这样后期不利于维护，相反，这个时候我们应该重新思考我们的接口设计是否合理。