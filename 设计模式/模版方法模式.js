// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E6%A8%A1%E7%89%88%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F.html
// 定义：模板方法模式由二部分组成，第一部分是抽象父类，第二部分是具体实现的子类，一般的情况下是抽象父类封装了子类的算法框架，包括实现一些公共方法及封装子类中所有方法的执行顺序，子类可以继承这个父类，并且可以在子类中重写父类的方法，从而实现自己的业务逻辑。

const ITInterview = function() {}

ITInterview.prototype.writeTest = function() {
  console.log('this is a write test')
}

ITInterview.prototype.technicalInterView = function() {
  console.log('this is a technical interview')
}

ITInterview.prototype.leader = function() {
  console.log('this is a leader interview')
}

ITInterview.prototype.waitNotice = function() {
  console.log('wait notice')
}

ITInterview.prototype.init = function() {
  this.writeTest()
  this.technicalInterView()
  this.leader()
  this.waitNotice()
}

const itInterview = new ITInterview()
itInterview.init()


// baidu
const BaiDuITInterview = function() {}
BaiDuITInterview.prototype = new ITInterview()

BaiDuITInterview.prototype.writeTest = function() {
  console.log('this is a baidu write test')
}

BaiDuITInterview.prototype.technicalInterView = function() {
  console.log('this is a baidu technical interview')
}


const baiduItInterview = new BaiDuITInterview()
baiduItInterview.init()
