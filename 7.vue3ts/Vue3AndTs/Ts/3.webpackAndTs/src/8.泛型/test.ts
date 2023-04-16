/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-15 15:20:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-16 17:35:31
 */
(

  () => {
    //泛型 在声明时 不确定传入参数的数据类型时使用  在使用时传入数据类型
    // function createArr (val:string,count:number=3) :string[] {
    //   let arr:string[] = []
    //   for (let i = 0; i < count; i++) {
    //     arr.push(val)
    //   }
    //   return arr
    // }
    // console.log(createArr("keainie",3));
    // function createArr (val:any,count:number=3) :any[] {
    //   let arr:any[] = []
    //   for (let i = 0; i < count; i++) {
    //     arr.push(val)
    //   }
    //   return arr
    // }
    // console.log(createArr(22,3));
    // console.log(createArr("str",3));
    // let t1 = createArr(22,3)[0].toFixed(1)
    // let t2 = createArr("str",3)[0].split("")
    // console.log(t1,t2);
    // function createArr<T> (val:T,count:number=3) :T[] {
    //   let arr:T[] = []
    //   for (let i = 0; i < count; i++) {
    //     arr.push(val)
    //   }
    //   return arr
    // }
    // let arr1 =  createArr<number>(22,2)
    // let arr2 = createArr<string>("str",2)
    // let r1 = arr1[0].toFixed(1)
    // let r2 = arr2[0].split("")
    // console.log(r1);
    // console.log(r2);
    // 多泛型参数 函数
    function getArr<K,V,T>(first:K,second:V,third:T) :[K,V,T] {
      return [first,second,third]
    }
    let result = getArr<string,number,string>("22",11,"33")
    console.log(result);
  }
)()