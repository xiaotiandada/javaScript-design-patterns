console.log('hello world')


// 继承
// -------------- 1 -------------

// 父类 People
class People {
    name
    age
    protected widget // 对子类开发
    constructor (name, age) {
        this.name = name
        this.age = age
        this.widget = 120
    }

    eat() {
        console.log(`${this.name} eat something!!!`);
    }

    speak() {
        console.log(`${this.name} speak, ${this.name} is ${this.age} years old.`);
    }

    getWidget() {
        console.log(`wedget ${this.widget}`)
    }

}


let people = new People('xiaotian', 20)
people.eat()
people.speak()
people.getWidget()

class Student extends People {
    number
    private girlfriend // 对自己开放
    constructor(name, age, number) {
        super(name, age)
        this.number = number
        this.girlfriend = 'xiaoxiao'
    }

    study() {
        console.log(`${this.name}'s ${this.number}, study`);
    }

    getWidget() {
        console.log(`${this.name}'s wedget ${this.widget}`)
    }

    getGirlFriend() {
        console.log(`my girl friend ${this.girlfriend}`)
    }
}

// 继承父类 People
let xiaoming = new Student('xiaoming', 22, 123)
let xiaohong = new Student('xiaohong', 18, 456)

console.log('--------------');
xiaoming.eat()
xiaoming.speak()
xiaoming.study()
xiaoming.getWidget()
// xiaoming.girlfriend // fail

console.log('--------------');
xiaohong.eat()
xiaohong.speak()
xiaohong.study()