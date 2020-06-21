// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E8%81%8C%E8%B4%A3%E9%93%BE%E6%A8%A1%E5%BC%8F.html

// 定义：职责链模式（Chain of responsibility）是使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。将这个对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理他为止。职责链模式的名字非常形象，一系列可能会处理请求的对象被该连接成一条链，请求在这些对象之间依次传递，直到遇到一个可以处理它的对象，我们把这些对象成为链中的节点。

// 500 元客户订单
var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay) {
    console.log('500 rmb deposit, get 100 coupon ')
  } else {
    return 'nextSuccessor' // unknow the next node but always pass to next.
  }
};
// 200 元客户订单
var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay) {
    console.log('200 rmb deposit , get 50 coupon')
  } else {
    return 'nextSuccessor';
  }
};
// 无预约客户订单
var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('normal buy no coupon')
  } else {
    console.log('the stock lack')
  }
};

let Chain = function (fn) {
  this.fn = fn
  this.successor = null
}

Chain.prototype.setNextSuccessor = function (successor) {
  return this.successor = successor
}

Chain.prototype.passRequest = function () {
  let ret = this.fn.apply(this, arguments)
  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }
  return ret
}



// 现在我们把3个订单函数分别包装成职责链的节点
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

// 这里我们把上面封装的节点连成一条线，依次判断执行
chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)
// 测试代码
chainOrder500.passRequest(1,true,6); // 500 rmb deposit, get 100 coupon
chainOrder500.passRequest(2,true,4); // 200 rmb deposit , get 50 coupon

chainOrderNormal.passRequest(2,true,0); // 200 rmb deposit , get 50 coupon
