import {Component} from "react"
import Parent from "./Parent"
// import Son from "./Son"
class Test extends Component {
  state = {
    message: {
      name: "root msg",
      age: 22,
      address: "address xxxx",
      msg: "root msg"
    },
    obj: {
      name: "jzs",
      age: 22,
      address: "jinHua"
    },
    msg: "rootMsg",
    testArr: [
      ["name", "age"],
      ["root","hehehe"]
    ],
    test: "hhh"
  }
  render() {
    return (
      <>
       {/* <Parent {...{msg:this.state.msg,...this.state.obj,Comp: <Son></Son>}}> */}
        {/* <Son></Son> */}
        {/* <Son arr={this.state.testArr}></Son> */}
       {/* </Parent> */}
       {/* <Parent render={(pmsg) => {
        return (
          <>
           <Son {...{...this.state.message,pmsg}}></Son>
          </>
        )
       }}></Parent> */}
       <Parent test={this.state.test}>
       </Parent>
      </>
    )
  }
}
export default Test