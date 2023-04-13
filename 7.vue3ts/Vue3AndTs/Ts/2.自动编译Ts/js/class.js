(() => {
    class Person {
        constructor(name, age, addr) {
            this.name = name;
            this.age = age;
            this.addr = addr;
        }
    }
    function generate(person) {
        console.log(person.name + "_" + person.age);
    }
    // let person = new Person("jzs",22,"keainie")
    // let person = new Person("jzs",22)
    let person = new Person("jzs", 22, "addr");
    console.log(person);
    generate(person);
})();
