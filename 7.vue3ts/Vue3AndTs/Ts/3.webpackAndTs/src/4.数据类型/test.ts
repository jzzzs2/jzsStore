(
  () => {
    // function test(): void {
    //   console.log("jzs带苏key");
    // }
    // test()
    //基础数据类型
    // 1. boolean
    let isExist: boolean = false
    // let isEat :boolean = "22"
    // isExist = 222
    // console.log(isExist);
    // 2. number
    let price2: number = 0b1101
    let price3: number = 0o11
    let price: number = 17
    let price1: number = 0x11
    // console.log(price,price1,price2,price3);
    //3. string
    let str: string = "abcdef"
    let str2: string = "pop"
    str = "jzs"
    // console.log(str,str2,"");
    //4. undefined null
    let test1: undefined = undefined
    let test2: null = null
    str = undefined
    price2 = null
    console.log(test1, test2);
    console.log(str, price2);
    //5. 数组
    // let arr :number[] = [2,3,4,5]
    // console.log(arr);
    // let arr2 :Array<string> = ["22", "str222", "keainie333"]
    // console.log(arr2,"Arr2");
    //6. 元组 确定数量和对应类型的数组
    // let metaArr :[string,number,boolean] = ["22", 22, false]
    // console.log(metaArr,"metaArr",metaArr[0].split(""));
    //7. 枚举
    // enum week {
    //   Monday = 1,
    //   Wed,
    //   Tus,
    //   Th,
    //   Fri,
    //   Sat,
    //   Sun
    // }
    // enum week {
    //   Monday = 1,
    //   Wed,
    //   Tus,
    //   Th,
    //   Fri = 11,
    //   Sat = 22,
    //   Sun = 99
    // }
    // enum goods {
    //   travel = "first",
    //   eat = "second",
    //   play = "third"
    // }
    // // let today :week = week.Tus
    // // console.log(today,"today",week["3"]);
    // let raze :goods = goods.travel
    // console.log(raze,goods["first"]);
    // console.log(week["22"]);
    // 8. any
    // let randomType :any = "jzs"
    // console.log(randomType);
    // randomType = 123
    // console.log(randomType);
    // randomType = {name: "jzs", age: 22}
    // console.log(randomType);
    // let arr :any = [11,"22",true,{name: "jzs",age: 11}]
    // console.log(arr);
    //9. void 当函数不返回值时
    // function testFnc() :void {
    //   console.log("hhhh test void");
    //   // return undefined
    //   return null
    // }
    // console.log(testFnc());
    //10. object
    let obj: object = {
      name: "jzs",
      age: 22
    }
    console.log(obj);
    function testObj(obj: object): object {
      console.log(obj, "obj");
      return {}
    }
    // testObj({name: "jzs",age: 22})
    // testObj(new String("22"))
    // testObj(String)
    //11. 联合类型 配合 类型断言 解决编译报错
    function testRelate(params: number | string | boolean): number {
      // return params.toString().length
      // if (<number>params || <boolean>params) {
      //   return (<number>params).toString().length
      // } else {
      //   return (<string>params).length
      // }
      if (params as number || params as boolean) {
        return (params as number).toString().length || (params as boolean).toString().length
      } else {
        return (params as string).length
      }
    }
    console.log(testRelate(22));
    console.log(testRelate("testStr"));
    console.log(testRelate(true));
    // 类型推断 声明不赋值 则默认类型为any
    let testV = "99"
    // testV = 22
    // testV = 22
    // console.log(testV);
    // testV = "str"
    // console.log(testV);
    
    
  }
)()