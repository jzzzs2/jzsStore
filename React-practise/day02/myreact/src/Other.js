/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-16 13:43:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-16 14:36:09
 */
import { Component } from "react"
class Son extends Component {
  state = {
    test: 99
  }
  constructor() {
    super()
    console.log("son constructor");
  }
  render() {
    console.log("son render");
    return (
      <>
        <button onClick={() => {this.setState({test: this.state.test + 1})}}>click son</button>
        <p>i am son! {this.props.fValue} {this.state.test}</p>
      </>
    )
  }
  componentDidMount() {
    console.log("son mounted");
  }
  componentDidUpdate() {
    console.log("son update");
  }
  componentWillUnmount() {
    console.log("son unmount");
  }
  // 不常用生命周期
  static getDerivedStateFromProps(props,state) {
    console.log("son getDerivedStateFromProps",props,state);
    return null
  }
  shouldComponentUpdate(nextProps,nextState)  {
    console.log("son shouldComponentUpdate",nextProps,nextState,this.state.test);
    return true
  }
  getSnapshotBeforeUpdate (Oprops,Ostate) {
    console.log("son getSnapshotBeforeUpdate",Oprops,Ostate,this.state.test);
    return true
  }
}
// 
class Other extends Component {
  state = {
    fValue: 0
  }
  constructor() {
    super()
    console.log("father constructor");
  }
  clickHandler =  () => {
    this.setState({
      fValue: this.state.fValue + 1
    })
  }
  render() {
    console.log("father render");
    return (
      <>
        <p>i am father {this.state.fValue}</p>
        <button onClick={this.clickHandler}>change fValue</button>
        {this.state.fValue > 2 ?"none": <Son fValue={this.state.fValue}></Son>}
      </>
    )
  }
  componentDidMount() {
    console.log("father mounted");
  }
  componentDidUpdate() {
    console.log("father update");
  }
  componentWillUnmount() {
    console.log("father unmount");
  }
}
export default Other