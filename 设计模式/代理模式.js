// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E4%BB%A3%E7%90%86%E6%A8%A1%E5%BC%8F.html
// 为一个对象提供一个代用品或占位符，以便控制对它的访问。

// 缓存代理
const mult = function() {
  let a = 1

  for (let i = 0; i < arguments.length; i++) {
    a *= arguments[i]
  }

  return a
}


const plus = function() {
  let a = 0

  for (let i = 0; i < arguments.length; i++) {
    a += arguments[i]
  }

  return a
}


const createProxyFactory = function(fn) {
  let cache = {} // 保存计算结果
  return function() {
    let args = Array.from(arguments).join(',')
    if (args in cache) {
      return cache[args]
    } else {
      return cache[args] = fn.apply(this, arguments)
    }
  }
}


let proxyMult = createProxyFactory(mult)
let proxyPlus = createProxyFactory(plus)

console.log(proxyMult(1,2,3,4))
console.log(proxyPlus(1,2,3,4))

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

const imgFunc = (function() {
  let imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  return {
    setSrc(src) {
      imgNode.src = src
    }
  }
})()


const proxyImage = (function() {
  const img = new Image()
  img.onload = function() {
    imgFunc.setSrc(this.src)
  }

  return {
    setSrc(src) {
      imgFunc.setSrc('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=766379944,3048822499&fm=26&gp=0.jpg')
      // 模拟加载时间
      setTimeout(() => {
        img.src = src
      }, 2000)
    }
  }
})()

proxyImage.setSrc('http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&f=JPEG?w=1280&h=853')