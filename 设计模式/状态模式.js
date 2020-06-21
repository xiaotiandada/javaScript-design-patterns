// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E7%8A%B6%E6%80%81%E6%A8%A1%E5%BC%8F.html
// 定义：状态模式（State）定义一个对象，这个对象可以通过管理其状态从而使得应用程序作出相应的变化。

var trafficLight = (function () {
	var currentLight = null;
	return {
		change: function (light) {
			currentLight = light;
			currentLight.go();
		}
	}
})();


// 红灯
function RedLight() { }
RedLight.prototype.go = function () {
	console.log("this is red light");
}
// 绿灯
function GreenLight() { }
GreenLight.prototype.go = function () {
	console.log("this is green light");
}
// 黄灯
function YellowLight() { }
YellowLight.prototype.go = function () {
	console.log("this is yellow light");
}

trafficLight.change(new RedLight()); // this is red light
trafficLight.change(new YellowLight()); // this is yellow light


function Menu() { }
Menu.prototype.toggle = function (state) {
	state();
}

var menuStates = {
	"show": function () {
		console.log("the menu is showing");
	},
	"hide": function () {
		console.log("the menu is hiding");
	}
};

var menu = new Menu();
menu.toggle(menuStates.show);
menu.toggle(menuStates.hide);
