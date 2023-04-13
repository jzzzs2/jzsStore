(
  () => {
    interface Iperson {
      name:string
      age:string
    }
    function testInter(person:Iperson) {
      console.log(person.name + "_" + person.age);
    }
    let obj = {
      name: "jzs",
      age: "22",
      addr: "jinHua"
    }
    testInter(obj)
  }
)()