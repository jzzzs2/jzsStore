function cru (a) {
  return function (b) {
    return a + b
  }
}

console.log(cru(1)(2))

class L {
  constructor(num) {
    this.num = num
  }
  pow (lg) {
    this.num = Math.pow(this.num, lg)
    return this
  }
  add (n) {
    this.num += n
    return this
  }
  done () {
    console.log(this.num)
  }
}

// l.add(3).pow(4).done()

let map = {
  add: 3,
  pow: 4,
  count: 10
}
let l = new L(10)
for (let key in map) {
  if (key in l) {
    l = l[key](map[key])
  }
}

l.done()

