/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-15 15:20:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-15 15:41:59
 */
(
  
  () => {
    //1.接口 限制规范 对象
    // interface IPerson {
    //   readonly name :string
    //   age ?:number
    //   addr :string
    // }
    // let obj :IPerson  = {
    //   name: "jzs",
    //   // age: 22,
    //   addr: "jinHua",
    //   // level: 2
    // }
    // // obj.name = "zjc"
    // obj.age = 22
    // console.log(obj);
    //2. 接口 限制规范 函数
    // interface Func {
    //   (first:number,last:number):boolean
    // }
    // let fnc :Func = function (first:number,last:number) :boolean {
    //   // return 22
    //   return first >= last
    // }
    // console.log(fnc(10,4));
    //3. 接口 限制规范 类
    interface IAnimal {
      eat() :void
      sleep() :void
    }
    interface ILive {
      breath() :void
      shit() :void
    }
    interface All extends ILive,IAnimal {
      play() :void
    }
    class Animal implements All {
      play() {
        console.log("出去玩了捏");
      }
      eat() {
        console.log("eat");
      }
      sleep() {
        console.log("sleep");
      }
      breath() {
        console.log("breath");
      }
      shit() {
        console.log("shit");
      }
    }
    // class Animal implements IAnimal,ILive {
    //   breath () {
    //     console.log("活的都会呼吸");
    //   }
    //   shit () {
    //     console.log("活的都会shit");
        
    //   }
    //   eat () {
    //     console.log("动物什么都爱吃");
    //   }
    //   sleep () {
    //     console.log("动物晚上睡觉");
        
    //   }
    // }
    let animal = new Animal()
    animal.eat()
    animal.sleep()
    animal.breath()
    animal.shit()
    animal.play()
  }
)()