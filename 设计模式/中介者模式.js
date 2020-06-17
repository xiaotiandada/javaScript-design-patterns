// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F.html

// 定义：中介者模式的作用就是解除对象与对象之间的紧耦合关系。增加一个中介者对象后，

// MVC 模式
let M = {}
let V = {}
let C = {}

M.data = 'Hello World'
V.render = (M) => {
    // alert(M.data)
    document.body.append(document.createElement('p').innerHTML = M.data)
}
C.handleOnload = () => {
    V.render(M)
}


window.onload = C.handleOnload



// 
let goods = {
    "red|32G": 3,
	"red|16G": 0,
	"blue|32G": 1,
	"blue|16G": 6
}

// 获得所有节点的引用，以便对其进行操作（中介者必许获得对其他对象的引用）
let colorSelect = document.getElementById( 'colorSelect' )
let memorySelect = document.getElementById( 'memorySelect' )
let numberInput = document.getElementById( 'numberInput' )

let colorInfo = document.getElementById( 'colorInfo' )
let memoryInfo = document.getElementById( 'memoryInfo' )
let numberInfo = document.getElementById( 'numberInfo' )
let nextBtn = document.getElementById( 'nextBtn' )

let mediator = (function() {
    return {
        changed(obj) {
            var color = colorSelect.value // 颜色
            let memory = memorySelect.value// 内存
            let number = numberInput.value // 数量

            if (obj === colorSelect) {
                colorInfo.innerHTML = color
            } else if (obj === memorySelect) {
                memoryInfo.innerHTML = memory
            } else if (obj === numberInput) {
                numberInfo.innerHTML = number
            } else {
                console.log(obj)
            }

            if (!color) {
                nextBtn.disabled = true
                nextBtn.innerHTML = '请选择手机颜色'
                return
            }

            if (!memory) {
                nextBtn.disabled = true
                nextBtn.innerHTML = '请选择内存大小'
                return
            }

            if (((number - 0) | 0 ) !== number - 0) {
                nextBtn.disabled = true
                nextBtn.innerHTML = '请输入正确的购买数量'
                return
            }

            nextBtn.disabled = false;
			nextBtn.innerHTML = '放入购物车';

        }
    }
})()



// 与中介者联系起来，事件函数
colorSelect.onchange = function(){
	mediator.changed( this );
};
memorySelect.onchange = function(){
	mediator.changed( this );
};
numberInput.onchange = function(){
	mediator.changed( this );
};