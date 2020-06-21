// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E5%A4%87%E5%BF%98%E5%BD%95%E6%A8%A1%E5%BC%8F.html
// 定义：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样就可以将该对象恢复到原先保存的状态

const render = data => {
  console.log(data)
}

const page = function () {
  let cache = {}

  return (page) => {
    console.log('page', page)
    console.log('cache', JSON.stringify(cache))

    if (cache[page]) {
      render(cache[page])
    } else {
      let data = [
        {
          title: "hi"
        }
      ]

      cache[page] = data
      render(data)
    }
  }
}()



page(1)
page(1)
page(1)
page(1)

page(1)
page(2)
page(3)
page(4)

page(2)

