/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-12 17:08:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-12 18:39:12
 */
import React, { Component } from "react"
// import Dag from "./Dag.js"
// const FuncComp = (props,ref) => {
//   let element = null
//   let clickHandler = () => {
//     console.log(element,"element");
//   }
//   return (
//     <>
//      <p ref={(ele) => element = ele}>我是一个函数组件</p>
//      <p ref={ref}>我是函数组件内部的一个元素</p>
//      <button type="button" onClick={clickHandler}>Son</button>
//     </>
//   )
// }
// const Wrap = React.forwardRef(FuncComp)
// class RefTest extends Component {
//   state = {
//   }
//   clickHandler = () => {
//     console.log(this.element2,"2");
//     // console.log(this.element);
//     this.element.add()
//   }
//   render() {
//     return (
//       <>
//        <Dag ref={(ele) => this.element = ele}></Dag>
//        <button type="button" onClick={this.clickHandler}>click</button>
//        <span>gap</span>
//        <Wrap ref={(ele) => this.element2 = ele}></Wrap>
//       </>
//     )
//   }
// }
// export default RefTest
class TextInput extends Component {
  state = {
    value: "jzs"
  }
  changeHandler = (e) => {
    console.log(e,"e");
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <>
        {/* <input type="text" value={this.state.value} onChange={this.changeHandler} /> */}
        <input type="text" value={this.props.content} onChange={this.props.changeHandler} />
      </>
    )
  }
}
class CheckInput extends Component {
  state = {
    value: true
  }
  changeHandler = () => {
    this.setState({
      value: !this.state.value
    })
  }
  render() {
    return (
      <>
        <input type="checkbox" checked={this.state.value} onChange={this.changeHandler} />
      </>
    )
  }
}
class SelectInput extends Component {
  state = {
    selectNum: 1
  }
  changeHandler = (e) => {
    console.log(e.target.value,"e");
    // this.setState({
    //   selectNum: e.target.value
    // })
  }
  render() {
    return (
      <>
       {/* <select value={this.state.selectNum} onChange={this.changeHandler}> */}
       <select value={this.props.value} onChange={this.props.handler}>
        {
          this.props.options.map((item,idx) => {
            return (
              <>
               <option key={item.value} value={item.value}>{item.name}</option>
              </>
            )
          })
        }
       </select>
      </>
    )
  }
}
class TextArea extends Component {
  state = {
    content: "ssfsxxxfsxxx"
  }
  changeHandler = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  render() {
    return (
      <>
       {/* <textarea value={this.state.content} onChange={this.changeHandler}>
       </textarea> */}
       <textarea value={this.props.content} onChange={this.props.changeHandler}>
       </textarea>
      </>
    )
  }
}
class FileComp extends Component {
  ele = React.createRef()
  handler = (e) => {
    console.log(e,"eeee",this.ele,"ele");
  }
  render () {
    return (
      <>
       <input ref={this.ele} type="file" onChange={this.handler}></input>
      </>
    )
  }
}
class ControlComp extends Component {
  state = {
    options: [
      {
        value: "1",
        name: "北京"
      },
      {
        value: "2",
        name: "杭州"
      },
      {
        value: "3",
        name: "上海"
      }
    ],
    value: "2",
    // 
    content: "tset"
  }
  
  clickHandler = (e) => {
    console.log(e.target.value,"father e");
    this.setState({
      value: e.target.value
    })
  }
  changeHandler = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  render() {
    return (
      <>
        <TextInput content={this.state.content} changeHandler= {this.changeHandler}></TextInput>
        <CheckInput></CheckInput>
        <SelectInput options={this.state.options} handler={this.clickHandler} value={this.state.value}></SelectInput>
        <TextArea content={this.state.content} changeHandler= {this.changeHandler}></TextArea>
        <FileComp></FileComp>
      </>
    )
  }
}
export default ControlComp