import {Component} from "react"
class Son extends Component {
  name = "jzs233"
  state = {
    // isChecked: true
    isChecked: this.props.live
  }
  clickHandle = () => {
    console.log("clicking");
    this.setState({
      isChecked: !this.state.isChecked
    })
  }
  changeFather = (e) => {
    e.preventDefault()
    this.props.fnc("testData")
  }
  render () {
    console.log(this.state.isChecked,"xxxx");
    // console.log("Son render",this.props.test,typeof this.props.test,"xxxxxx",this.props.children);
    let {address} = this.props
    return (
      <>
       {/* <input type="checkbox" checked={this.state.isChecked} onChange={this.clickHandle}></input> */}
       {/* <input type="checkbox" checked={this.props.live} onChange={this.clickHandle}></input> */}
       {/* <input type="checkbox" checked={this.props.live} onChange={(e)=>{e.preventDefault()}}></input> */}
       <input type="checkbox" checked={this.state.isChecked} onChange={(e)=>{e.preventDefault()}}></input>
       
       address: {address}
       <button onClick={this.changeFather}>click modify father</button>
       {this.props.children}
      </>
    )
  }
}
// {/* <input type="checkbox" checked={this.props.live} onChange={this.clickHandle}></input> */}
export default Son