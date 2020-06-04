// 装饰器模式
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// https://juejin.im/post/5c984610e51d45656702a785
// 在不改变对象自身的基础上，动态的给某个对象添加新的功能，同时又不改变其接口
{
    var Plane = /** @class */ (function () {
        function Plane() {
        }
        Plane.prototype.fire = function () {
            console.log('发射普通子弹');
        };
        return Plane;
    }());
    var Missile = /** @class */ (function () {
        function Missile(plane) {
            this.plane = plane;
        }
        Missile.prototype.fire = function () {
            this.plane.fire();
            console.log('发射导弹');
        };
        return Missile;
    }());
    var plane = new Plane();
    plane = new Missile(plane);
    console.log(plane.fire());
    // 利用AOP给函数动态添加功能，即Function的after或者before
}
{
    var func_1 = function () {
        console.log('2');
    };
    Function.prototype.before = function (fn) {
        var _this = this;
        return function () {
            fn.apply(this, arguments);
            return _this.apply(this, arguments);
        };
    };
    Function.prototype.after = function (fn) {
        var _this = this;
        return function () {
            var ret = _this.apply(this, arguments);
            fn.apply(this, arguments);
            return ret;
        };
    };
    func_1 = func_1.before(function () {
        console.log(1);
    }).after(function () {
        console.log(3);
    });
    func_1();
}
{
    console.log('------');
    function func1() {
        console.log(1);
    }
    function func2() {
        console.log(2);
    }
    var Func = /** @class */ (function () {
        function Func() {
        }
        Func.prototype.init = function () {
            console.log(3);
        };
        __decorate([
            func2,
            func1
        ], Func.prototype, "init");
        return Func;
    }());
    var func_2 = new Func();
    func_2.init();
}
console.log('------11-----');
// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E8%A3%85%E9%A5%B0%E8%80%85%E6%A8%A1%E5%BC%8F.html
// 装饰者(decorator)模式能够在不改变对象自身的基础上，在程序运行期间给对象动态的添加职责。
// ...
// PS：这样给对象动态的增加职责的方式就没有改变对象自身，一个对象放入另一个对象就形成了一条装饰链（一个聚合对象）， 而上面的shot和track也就是装饰者、装饰函数 ，当函数执行时，会把请求转给链中的下一个对象。
{
    var before = function (fn, before) {
        return function () {
            before.apply(this, arguments);
            return fn.apply(this, arguments);
        };
    };
    var after = function (fn, after) {
        return function () {
            var ret = fn.apply(this, arguments);
            after.apply(this, arguments);
            return ret;
        };
    };
    function func(x) {
        console.log(x);
    }
    function func1() {
        console.log(1);
    }
    function func2() {
        console.log(2);
    }
    before(func1, func2)();
    console.log('------');
    after(func1, func2)();
}
{
    console.log('------');
    var before = function (fn, before) {
        return function () {
            before.apply(this, arguments);
            return fn.apply(this, arguments);
        };
    };
    var after = function (fn, after) {
        return function () {
            var ret = fn.apply(this, arguments);
            after.apply(this, arguments);
            return ret;
        };
    };
    function handwashing() {
        console.log('洗手');
    }
    function drink() {
        console.log('喝水');
    }
    function eat() {
        console.log('吃饭');
    }
    before(eat, handwashing)();
    console.log('------');
    after(eat, drink)();
}
