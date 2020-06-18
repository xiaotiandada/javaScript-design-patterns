// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E8%BF%AD%E4%BB%A3%E5%99%A8%E6%A8%A1%E5%BC%8F.html
// 定义：迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

// 内部迭代器

const each = (array, callback) => {
  for (let i = 0, len = array.length; i < len; i++) {
    if (callback.call(array[i], array[i], i) === false) {
      break
    }
  }
}

each([1,2,3,4,5], (val, i) => {
  console.log(val + ' - ' + i)
})
console.log('-----')
each([1,2,3,4,5], (val, i) => {
  if (i === 3) {
    return false
  }
  console.log(val + ' - ' + i)
})

// 外部迭代器

const Iterator = obj => {
  let current = 0;

  const next = () => {
    if (current > obj.length) {
      return false
    }
    current += 1;
  }

  const isDone = () => {
    return current >= obj.length
  }

  const getCurrentItem = () => {
    return obj[current]
  }

  return {
    next,
    isDone,
    getCurrentItem
  }
}

console.log('-----')

let iterator = Iterator([1,2,3,4,5])
console.log(iterator.getCurrentItem())
console.log(iterator.getCurrentItem())

iterator.next()

console.log(iterator.getCurrentItem())
console.log(iterator.isDone())

iterator.next()
console.log(iterator.getCurrentItem())
iterator.next()
console.log(iterator.getCurrentItem())
iterator.next()
console.log(iterator.getCurrentItem())
iterator.next()
console.log(iterator.getCurrentItem())
iterator.next()

console.log(iterator.isDone())



// 1 - 0
// 2 - 1
// 3 - 2
// 4 - 3
// 5 - 4
// -----
// 1 - 0
// 2 - 1
// 3 - 2
// -----
// 1
// 1
// 2
// false
// 3
// 4
// 5
// undefined
// true