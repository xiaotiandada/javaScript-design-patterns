// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E8%AE%BF%E9%97%AE%E8%80%85%E6%A8%A1%E5%BC%8F.html
// 没太理解...

function Visitor () {
  this.visit  = function(ConceteElement) {
    ConceteElement.doSomething()
  }
}

function ConceteElement() {
  this.doSomething = function() {
    console.log('this is a element')
  }

  this.accept = function(visitor) {
    visitor.visit(this)
  }
}


let visitor = new Visitor()
let conceteElement = new ConceteElement()

conceteElement.accept(visitor)
