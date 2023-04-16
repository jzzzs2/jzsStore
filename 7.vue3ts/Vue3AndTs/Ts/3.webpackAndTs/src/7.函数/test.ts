/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-15 15:20:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-16 17:17:16
 */
(

  () => {
    //1.函数
    // function eat(name :string = "zjc", food :string = "shit") :void{
    //   console.log(name + "吃" + food);
    // }
    // let eat = function (name :string="zjc", food :string="shit") {
    //   console.log(name + "吃" + food);
    // }
    // eat("jzs","rice")
    //完整函数写法
    // let eat :(name?:string,food?:string) => void = function (name :string="zjc",food :string="shit") {
    //   console.log(name + "吃" + food);
    // }
    // eat()
    //可选参数 默认值参数
    // function buildName (lastName ?:string,firstName ?:string) :string {
    //   if (firstName) {
    //     return firstName + "_" + lastName
    //   } else if(lastName) {
    //     return lastName
    //   } else {
    //     return "默认名字"
    //   }
    // }
    // console.log(buildName("寇明","诸葛"));
    // console.log(buildName("寇明"));
    // console.log(buildName());
    //剩余参数
    // function test (first :string, ...rest :string[]) :void {
    //   console.log(first);
    //   console.log(rest);
    // }
    // test("a", "hh", "keainie")
    //函数重载
    function add (first:string,last:string) :string
    function add (first:number,last:number) :number
    function add (first:string | number,last :string | number) :string | number{
      if (typeof first === "string" && typeof last === "string") {
        return first + last
      } else if (typeof first === "number" && typeof last === "number") {
        return first + last
      }
    }
    console.log(add("22","23"));
    console.log(add(22,23));
    // console.log(add("22",22));
    // console.log(add(22,"23"));
    
    
  }
)()