/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-11 16:21:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-11 20:39:49
 */
import React,{Component} from "react"
class Son extends Component {
  state = {

  }
  render () {
    // console.log(React.Children.toArray(this.props.arr),"son render");
    return (
      <>
       <p>i am Son</p>
       <p>{this.props.msg}</p>
       {/* <p>{this.props.msg}</p> */}
       {/* <p>{this.props.pmsg}</p> */}
      </>
    )
  }
}
export default Son