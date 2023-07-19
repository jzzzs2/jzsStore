/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-14 15:40:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-15 19:26:45
 */
import {Component} from "react"
class Duration extends Component {
  state = {
    age: 22
  }
  constructor(props) {
    super(props)
    console.log(this.props,"constructor");
  }
  componentDidMount () {
    console.log("mounted",document.querySelector("h1"));
  }
  componentDidUpdate (oldProp,oldState) {
    console.log(oldProp,oldState,this.props,"update");
  }
  componentWillUnmount() {
    
  }
  handler = () => {
    this.setState({
      age: this.state.age + 1
    })
  }
  render () {
    console.log("render",document.querySelector("h1"));
    return (
      <>
       <h1>i am title</h1>
       <button onClick={this.handler}>son click</button>
      </>
    )
  }
}

export default Duration