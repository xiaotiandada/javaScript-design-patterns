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
	minLength (value, length, errorMsg){
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
	// 添加错误信息提示
	const addErrorMsg = (msg, dom, errorMsg) => {
		// 如果有错误信息
		if (msg) {
			// 如果已经有了错误提示
			let errorMsgDom = dom.parentNode.querySelector('.error-msg')
			if (errorMsgDom) {
				errorMsgDom.innerHTML = errorMsg
			} else {
				// 没有提示创建
				let errorHtml = document.createElement('span')
				errorHtml.className = 'error-msg'
				errorHtml.innerHTML = errorMsg
				dom.parentNode.appendChild(errorHtml)
			}
		} else {
			// 没有错误提示
			// 如果有错误提示但是tag还存在则清除
			let errorMsgDom = dom.parentNode.querySelector('.error-msg')
			if (errorMsgDom) {
				errorMsgDom.remove()
			}
		}
	}
	for(let i = 0, rule; rule = rules[i++]; ) {
		(function(rule) {
			let strategyArr = rule.strategy.split(':')
			let errorMsg = rule.errorMsg

			slef.cache.push(function() {
				let strategy = strategyArr.shift() // 取第一个 策略名
				strategyArr.unshift(dom.value)
				strategyArr.push(errorMsg)
				let msg = strategyForm[strategy].apply(dom, strategyArr)
				addErrorMsg(msg, dom, errorMsg)
				return msg
			})

		})(rule)
	}
}

Validator.prototype.start = function() {
	for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
		let msg = validatorFunc()
		if (msg) return msg
	}
}

let registerForm = document.getElementById('registerForm')

let validateFunc = function() {
	let validator = new Validator()
	validator.add(registerForm.username, [
		{ strategy: 'isNotEmpty', errorMsg: '用户名不能为空' },
		{ strategy: 'minLength:6', errorMsg: '用户名长度不能小于6位' }
	])
	validator.add(registerForm.password,[
		{strategy: 'minLength:6',errorMsg:'密码长度不能小于6位'},
	]);
	validator.add(registerForm.phoneNumber,[
		{strategy: 'mobileFormat',errorMsg:'手机号格式不正确'},
	]);
	let errorMsg = validator.start()
	return errorMsg
}

registerForm.onsubmit = function() {
	let errorMsg = validateFunc()
	if (errorMsg) {
		console.log(errorMsg)
	} else {
		console.log('done')
	}
	return false
}