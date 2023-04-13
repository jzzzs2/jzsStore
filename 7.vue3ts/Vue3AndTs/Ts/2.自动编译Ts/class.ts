(
  () => {
    interface Iperson {
      name:string
      age:number
    }
    class Person {
      name:string
      age:number
      addr:string
      constructor (name:string,age:number,addr:string) {
        this.name = name
        this.age = age
        this.addr = addr
      }
    }
    function generate (person: Iperson) {
      console.log(person.name + "_" + person.age);
    }
    // let person = new Person("jzs",22,"keainie")
    // let person = new Person("jzs",22)
    let person = new Person("jzs",22,"addr")
    console.log(person);
    generate(person)
  }
)()