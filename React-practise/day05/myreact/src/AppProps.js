import {Component} from "react"
import Son from "./Test2"
class Test extends Component {
  name = "jzs233"
  state = {
    address: "浙江金华",
    isAlive: false
  }
  clkHandler = () => {
    console.log("box render");
    this.setState({
      isAlive: "hahah"
    })
  }
  clickHandler = (data) => {
    console.log("testData",data);
    this.setState({
      isAlive: !this.state.isAlive
    })
  }
  render() {
    console.log("father render");
    return (
      <>
      {/* <div onClick={this.clkHandler}> */}
       {/* <Son address={this.state.address}></Son> */}
       <Son address={(<p>我是父元素传递过来的内容</p>)} fnc={this.clickHandler} live={this.state.isAlive}></Son>
       {/* <Son test><h1>2333</h1></Son> */}
      {/* </div> */}
       {/* <Son address={this.clickHandler}></Son> */}
      </>
    )
  }
}
export default Test