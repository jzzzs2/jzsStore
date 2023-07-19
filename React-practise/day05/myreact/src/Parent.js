/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-11 20:07:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-11 20:39:29
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-11 16:21:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-11 20:39:11
 */
import React,{Component} from "react"
import Son from "./Son"
class Parent extends Component {
  state = {

  }
  render () {
    // let {Comp} = this.props
    // console.log(Comp,"Comp");
    // console.log(this.props,"Parent props");
    // console.log(React.Children.only(this.props.children));
    return (
      <>
       <p>i am parent</p>
       <hr></hr>
       <Son msg={this.props.test}></Son>
       {/* {this.props.render("parent msg")} */}
       {/* {Comp} */}
       {/* <Comp></Comp> */}
       {/* {this.props.children} */}
       {/* {this.props.children.map((item,idx) => {
        return <div>{idx}</div>
       })} */}
       {/* {React.Children.map(this.props.children,(item,idx) => {
        return idx
       })} */}
      </>
    )
  }
}
export default Parent