/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-13 20:31:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-13 21:11:23
 */
import {Component} from "react"
import "./case1.css"
class Tag extends Component {
  clickHandler = (id) => {
    this.props.selectHandler(id)
  }
  render () {
    console.log(this.props.selected,"props");
    return (
      <>
       <div onClick={this.clickHandler.bind(this,this.props.id)} className={this.props.selected?'tag active':'tag'}>
         {this.props.content}
         {this.props.children}
       </div>
      </>
    )
  }
}
class Case extends Component {
  state = {
    tags: [
      {
        content: "html",
        selected: false,
        id: 1
      },
      {
        content: "css",
        selected: false,
        id: 2
      },
      {
        content: "js",
        selected: false,
        id: 3
      },
      {
        content: "nodeJs",
        selected: false,
        id: 4
      },
      {
        content: "webpack",
        selected: false,
        id: 5
      },
    ]
  }
  selectHandler = (id) => {
    this.setState({
      tags: this.state.tags.map((item) => {
        if (item.id === id) {
          item.selected = !item.selected
        }
        return item
      })
    })
  }
  deleteTag = (id,e) => {
    e.stopPropagation()
    this.setState({
      tags: this.state.tags.map((item) => {
        if (item.id === id) {
          item.selected = false
        }
        return item
      })
    })
  }
  render() {
    return (
      <>
       <div className="case">
        <div className="title">
          {this.state.tags.map((item) => {
            return (
               <Tag {...item} key={item.id} selectHandler={this.selectHandler}></Tag>
            )
          })}
        </div>
        <div className="select">
          {
            this.state.tags.filter(item => item.selected).map(item => {
              return <Tag id={item.id} content={item.content} key={item.id}><span onClick={this.deleteTag.bind(this,item.id)} className="sp">X</span></Tag>
            })
          }
        </div>
       </div>
      </>
    )
  }
}
export default Case