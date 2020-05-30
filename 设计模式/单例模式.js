// 保证一个类仅有一个实例，并提供一个访问它的全局访问点
// https://juejin.im/post/5c984610e51d45656702a785

class SignleObject {
  login() {
    console.log('login')
  }
}

SignleObject.getInstance = (function() {
  let instance = null
  return function() {
    if (!instance) {
      instance = new SignleObject()
    }
    return instance
  }
})()

const obj1 = SignleObject.getInstance()
const obj2 = SignleObject.getInstance()

console.log(obj1 === obj2)

// 单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html


class CreateDiv {
  constructor(html) {
    this.html = html
    this.init()
  }
}

CreateDiv.prototype.init = function() {
  let div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}


let proxySignleCreateDiv = (function() {
  let instance
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html)
    }
    return instance
  }
})()

let ca = new proxySignleCreateDiv('screen1')
let cb = new proxySignleCreateDiv('screen2')

console.log(ca === cb)

// 通用的单例模式
let getSignle = function(fn) {
  let result
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}


let createloginLoyer = function () {
  const div = document.createElement('div')
  div.innerHTML = '登录框'
  document.body.appendChild(div)
  return div
}

let createLoginLoyerSignle = getSignle(createloginLoyer)
let a = createLoginLoyerSignle()
let b = createLoginLoyerSignle()

console.log(a === b)

// 惰性单例
const createLoginLoyerOne = (function() {
  let div
  return function() {

    if (!div) {
      div = document.createElement('div')
      div.innerHTML = '登录框 惰性'
      document.body.appendChild(div)
    }
    return div
  }
})()


document.querySelector('#login').onclick = function() {
  let divLoyer = createLoginLoyerOne()
  divLoyer.style.display = 'block'
}


// 登录框
const loginBox = (function(){
  let div
  return function() {
    if (!div) {
      div = document.createElement('div')
      div.onclick = function() {
        div.style.display = 'none'
      }
      div.innerHTML = '登录 hhhh (单击我隐藏)'
      document.body.appendChild(div)
    }
    return div
  }
})()

document.querySelector('#btn').onclick = function() {
  let loginbox = loginBox()
  loginbox.style.display = 'block'
}