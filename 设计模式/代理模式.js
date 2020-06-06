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