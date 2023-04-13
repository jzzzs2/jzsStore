const obj = {
  a: 1,
  b: 2
}

function hasProp ({ obj = {}, prop = 'a' }) {
  return !!obj?.[prop]
}

console.log(hasProp({ obj, prop: 'b' }))