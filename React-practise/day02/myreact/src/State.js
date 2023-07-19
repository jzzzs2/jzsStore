import {Component} from "react"
import _ from "lodash"
class Test extends Component {
  name = "test"
  state = {
    name: "jzs",
    count: 0,
    obj: {
      name: "zzjc",
      age: 22,
      child: ["boy","girl"]
    },
    list: ["fish ","noodle ","singer "],
    isExist: false
  }
  clickHandler = () => {
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count,"current count1");
    this.setState((state,props) => {
      console.log(props,"props");
      console.log(state.count,"setState函数方式 state.count",this.state.count);
      return {
        count: state.count + 1
      }
    },() => {
      this.setState({
        count: this.state.count + 1
      })
    })
    console.log(this.state.count,"current count2");
  }
  changeColor = () => {
    this.setState({isExist: !this.state.isExist})
  }
  addArr = () => {
    this.setState({
      list: this.state.list.concat(["2333 ","keainie "])
    })
  }
  addObj = () => {
    let newObj = _.cloneDeep(this.state.obj)
    newObj.child.push("xxdd")
    this.setState({
      obj: newObj 
    })
  }
  render () {
    console.log("rendering xxx");
    return (
      <>
        <button onClick={this.clickHandler}>add ++ </button>
        <div>count: {this.state.count}</div>
        <button onClick={this.changeColor}>reverse bgc</button>
        <p style={{backgroundColor: this.state.isExist ? "red" : "blue"}}>i am a p段落</p>
        <button onClick={this.addArr}>add list</button>
        <button onClick={this.addObj}>add obj</button>
        <p>{this.state.list}</p>
        <p>{JSON.stringify(this.state.obj)}</p>
      </>
    )
  }
}
export default Test