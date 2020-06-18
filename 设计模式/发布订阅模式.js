// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F.html

// 对象间的一种一对多的关系，让多个观察者对象同时监听某一个主题对象，当一个对象发生改变时，所有依赖于它的对象都将得到通知。

const Event = (function() {
  // 缓存列表
  let list = {}

  // 监听函数
  const listen = function(key, fn) {
    if (!list[key]) {
      list[key] = []
    }
    list[key].push(fn)
  }

  // 触发监听
  const trigger = function() {
    let key = Array.prototype.shift.call(arguments)
    let fns = list[key]

    if (!fns || fns.length === 0) {
      return false
    }

    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  }
  // 移除监听函数
  const remove = function(key, fn) {
    let fns = list[key]

    if (!fns) {
      return false
    }

    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        let _fn = fns[i]
        if (_fn === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }

  return {
    listen,
    trigger,
    remove
  }
})()


function d1() {
  console.log('d11111')
}

function d2() {
  console.log('d22222')
}

function d3() {
  console.log('d33333')
}

Event.listen('color', d1)
Event.listen('color', d2)
Event.listen('color', d3)


Event.listen('size', d1)
Event.listen('size', d2)
Event.remove('size', d1)
Event.listen('size', d3)

Event.trigger('color')
console.log('----')
Event.trigger('size')
console.log('----')
Event.trigger('color')


// d11111
// d22222
// d33333
// ----
// d22222
// d33333
// ----
// d11111
// d22222
// d33333