import React,{Component} from "react"
class Dag extends Component {
  state = {
    count: 1
  }
  cb = React.createRef()
  clickHandler = () => {
    // console.log(this.cb.current,"cb");
    console.log(this.element,"element");
    // this.cb.current.checked = !this.cb.current.checked
    this.element.checked = !this.element.checked
  }
  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <>
       <p>i am Daguther {this.state.count}</p>
       {/* <input ref={this.cb} type="checkbox" /> */}
       <input ref={(ele) => this.element = ele} type="checkbox" />
       <input type="radio" />
       <button type="button" onClick={this.clickHandler}>click get ref</button>
      </>
    )
  }
}
export default Dag