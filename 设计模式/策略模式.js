// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F.html
// 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

const strategy = {
  a(salary) {
     return salary * 4
  },
  b(salary) {
    return salary * 3
  },
  c(salary) {
    return salary * 2
  }
}


Object.freeze(strategy)


const returnMoney = (type, salary) => {
  return strategy[type](salary)
}

console.log(returnMoney('a', 1000))
console.log(returnMoney('b', 3000))
console.log(returnMoney('c', 4000))


// 这里我们实现一组策略类封装具体的验证规则
const strategyForm = {
	// 是否为空
	isNotEmpty (value, errorMsg){
		if (value === '') {
			return errorMsg;
		}
	},
	// 最小长度
	minLength (value, errorMsg, length){
		if (value.length < length) {
			return errorMsg;
		}
	},
	// 手机号码格式
	mobileFormat (value,errorMsg){
		if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
			return errorMsg;
		}
	}
};
Object.freeze(strategyForm);


const Validator = function() {
  this.cache = []
}

Validator.prototype.add = function(dom, rules) {
  let slef = this
}