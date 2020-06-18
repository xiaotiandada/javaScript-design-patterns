// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E5%A4%96%E8%A7%82%E6%A8%A1%E5%BC%8F.html
// https://natee.gitbooks.io/javascript-design-patterns/facade-pattern.html
// 定义：外观模式（Facade）为子系统中的一组接口提供了一个一致的界面，此模块定义了一个高层接口，这个接口使得这一子系统更加容易使用。


const addEvent = function(el, ev, fn) {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false)
  } else if (el.attachEvent) {
    el.attachEvent(`on${ev}`, fn)
  } else {
    el[`on${ev}`] = fn
  }
}

// 没测试
let N = window.N || {}
N.tools = {
  stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation()
    } else {
      e.cancelBubble = true
    }
  },
  preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault()
    } else {
      e.returnValue = false
    }
  },
  stopEvent(e) {
    this.stopPropagation(e)
    this.preventDefault(e)
  }
}


addEvent(document.getElementById('button'), 'click', function() {
  console.log('button')
})



function setStyles(elements, styles) {
  for (let i = 0, len = elements.length; i < len; i++) {
    let element = document.getElementById(elements[i])
    if (element) {
      for (let property in styles) {
        element.style[property] = styles[property]
      }
    }
  }
}

setStyles(['foo', 'foo1', 'foo2'], {
  backgroundColor: 'red',
  width: '150px',
  height: '200px'
});