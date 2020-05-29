console.log('hello world')


// 继承
// -------------- 1 -------------

// 父类 People
class People {
    constructor (name, age) {
        this.name = name
        this.age = age
    }

    eat() {
        console.log(`${this.name} eat something!!!`);
    }

    speak() {
        console.log(`${this.name} speak, ${this.name} is ${this.age} years old.`);
    }

}


let people = new People('xiaotian', 20)
people.eat()
people.speak()

class Student extends People {
    constructor(name, age, number) {
        super(name, age)
        this.number = number
    }

    study() {
        console.log(`${this.name}'s ${this.number}, study`);
    }
}

// 继承父类 People
let xiaoming = new Student('xiaoming', 22, 123)
let xiaohong = new Student('xiaohong', 18, 456)

console.log('--------------');
xiaoming.eat()
xiaoming.speak()
xiaoming.study()

console.log('--------------');
xiaohong.eat()
xiaohong.speak()
xiaohong.study()