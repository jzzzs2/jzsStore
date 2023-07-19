/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-14 15:40:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-16 11:24:40
 */
import {Component} from "react"
import Duration from "./Duration";
class Test9 extends Component {
  state = {
    test: 123,
    abc: 333
  }
  // componentDidMount () {
  //   console.log("father mounted");
  // }
  // componentDidUpdate (oldV,newV) {
  //   console.log(oldV,newV,"father update");
  // }
  render () {
    // console.log("father render");
    return (
      <>
       {/* <Duration test={this.state.test}></Duration> */}
       {/* <Duration test={this.state.test} test2={this.state.test2}></Duration> */}
       <Duration></Duration>
       {/* <button>change</button> */}
       <button onClick={() => this.setState({test2: 222})}>click</button>
       <button onClick={() => this.setState({abc: 222})}>click 2</button>
      </>
    )
  }
}

export default Test9