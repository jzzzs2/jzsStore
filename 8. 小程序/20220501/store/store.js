import {observable, action} from "mobx-miniprogram"
export const store = observable({
  name: 'jzs',
  age: 22,
  addr: "jinHua",
  count1: 0,
  count2: 0,
  active: 0,
  get info () {
    return `${this.name}今年${this.age}岁了`
  },
  get allCount() {
    return this.count1 + this.count2
  },
  updateOne: action(function (step) {
    // console.log(this,"this");
    this.count1 += step
  }),
  updateTwo: action(function (step) {
    // console.log(this,"this");
    this.count2 += step
  }),
  changeActive: action(function (idx) {
    this.active = idx
  })
})