import {Component} from "react"
import Valid from "./Valid"
import Test from "./Test"
class PropValid extends Component {
  state = {
    
  }
  render() {
    return (
      <>
        {/* <h1>{this.props.price.toFiexed(2)}</h1> */}
        {/* <Valid price={"999.22979722"}></Valid> */}
        <Valid price={22.22} ele={Test}></Valid>
        {/* <Valid price={999.22979722}></Valid> */}
      </>
    )
  }
}
export default PropValid