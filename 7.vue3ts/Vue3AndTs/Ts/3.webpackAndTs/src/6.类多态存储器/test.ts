/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-15 15:20:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-15 17:20:00
 */
(

  () => {
    //1.类
    // class Animal {
    //   level :number
    //   age :number
    //   name :string
    //   constructor (name:string="tiger",age:number=10,level:number=0) {
    //     this.name = name
    //     this.age = age
    //     this.level = level
    //   }
    //   eat (food:string) :void {
    //     console.log(`${this.name}喜歡吃` + food);
    //   }
    // }
    // class Person {
    //   play() {
    //     console.log("我喜欢玩");
    //   }
    // }
    // let animal = new Animal("elephont",22)
    // console.log(animal);
    //2.类的继承
    // class Dog extends Animal{
    //   constructor (name:string="dog",age:number=120,level:number=2) {
    //     super(name,age,level)
    //   }
    //   eat (food:string) :void {
    //     console.log("eating");
    //     super.eat(food)
    //   }
    // }
    // class Cat extends Animal {
    //   constructor(name:string="cat",age:number=999,level:number=4) {
    //     super(name,age,level)
    //   }
    //   eat (food:string) :void {
    //     console.log("eated");
    //     super.eat(food)
    //   }
    // }
    // let dog = new Dog()
    // console.log(dog);
    // dog.eat("bone")
    // let cat = new Cat()
    // console.log(cat);
    // cat.eat("鱼")
    // //3. 多态 父类型引用 指向 子类对象
    // let animal :Animal = new Cat()
    // let animal1 :Animal = new Dog()
    // console.log(animal,"| |",animal1);
    // animal.eat("fish")
    // animal1.eat("bone")
    //4. 修饰符修饰成员 public private protected
    // class Animal {
    //   protected level: number
    //   // private level :number
    //   // private age :number
    //   private age: number
    //   name: string
    //   constructor(name: string = "tiger", age: number = 10, level: number = 0) {
    //     this.name = name
    //     this.age = age
    //     this.level = level
    //   }
    //   eat(food: string): void {
    //     console.log(`${this.name} ${this.age}喜歡吃` + food);
    //   }
    // }
    // class Dog extends Animal {
    //   // constructor(name: string = "dog", age: number = 20, level: number = 30) {
    //   //   super(name, age, level)
    //   //   // super.level
    //   // }
    //   test() {
    //     // console.log(this.level,this.age);
    //     console.log(this.level);
    //   }
    // }
    // let dog = new Dog()
    // console.log(dog);
    // dog.test()
    // console.log(dog.level);
    // let animal = new Animal()
    // console.log(animal.level,animal.age);
    // console.log(animal.age);
    // animal.age = 999
    // console.log(animal,"animal");
    // animal.eat("everything")
    //5. readonly 修饰符
    // class Animal {
    //   // readonly level: number
    //   // level: number
    //   // private level :number
    //   // private age :number
    //   // age: number
    //   // name: string
    //   constructor(public name: string = "tiger",private age: number = 10,readonly level: number = 0) {
    //     // this.name = name
    //     // this.age = age
    //     // this.level = level
    //   }
    //   eat(food: string): void {
    //     // this.level = "999"
    //     console.log(`${this.name} ${this.age}喜歡吃` + food);
    //   }
    // }
    // class Dog extends Animal {
    //   test() {
    //     console.log(this.level);
    //   }
    // }
    // let animal = new Animal()
    // animal.level = 22
    // console.log(animal.level,"level",animal.age);
    // animal.level = 99
    //6. 存取器
    class Person {
      constructor (public firstName :string="金",public lastName :string="哲晟") {

      }
      get FullName () {
        return this.firstName + "_" + this.lastName
      }
      set FullName (name) {
        let arr =  name.split("_")
        this.firstName = arr[0]
        this.lastName = arr[1]
      }
    }
    let p = new Person()
    console.log(p.FullName);
    p.FullName = "jz_s"
    console.log(p.FullName);
    
    
  }
)()