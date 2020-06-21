// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E4%BA%AB%E5%85%83%E6%A8%A1%E5%BC%8F.html

// 定义：享元模式是一种用于性能优化的模式，如果系统中因为创建了大量类似的对象而导致内存不足或占用过高这种模式就非常有用了。

// 定义塑料模特的构造函数
var Model = function (sex) {
	this.sex = sex;
}
// 为模特拍照
Model.prototype.takePhoto = function () {
	console.log('sex=' + this.sex + 'underwear=' + this.underwear )
}
// 实例化一个男模特 和 一个女模特
var maleModel = new Model('male');
let female    = new Model('female');    
for (var i = 1; i <=50; i++){
	// 分别为模特换上 50 件内衣 以及 照相
	maleModel.underwear = 'underwear' + i;
	maleModel.takePhoto();
}
for (var i = 1; i <=50; i++){
	// 分别为模特换上 50 件内衣 以及 照相
	female.underwear = 'underwear' + i;
	female.takePhoto();
}




let toolTipFactory = (function() {
  let tooplTipPool = []
  return {
    create: function() {
      if (tooplTipPool.length === 0) {
        console.log(1)
        let div = document.createElement('div')
        document.body.appendChild(div)
        return div
      } else {
        console.log(2)
        return tooplTipPool.shift()
      }
    },
    recover: function(tooltipDOm) {
      tooplTipPool.push(tooltipDOm)
    }
  }
})()

// 2
let arr = []
for (let i = 0, str; str = ['a', 'b'][i++];) {
  let toolTip = toolTipFactory.create()
  toolTip.innerHTML = str
  arr.push(toolTip)
}


for (let i = 0, toolTip; toolTip = arr[i++];) {
  toolTipFactory.recover(toolTip)
}

// 11
// 22
// 1111
for (let i = 0, str; str = ['a', 'b', 'c', 'd', 'e', 'f'][i++];) {
  let toolTip = toolTipFactory.create()
  toolTip.innerHTML = str
}