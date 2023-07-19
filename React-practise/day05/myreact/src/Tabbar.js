/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-11 17:15:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-11 17:49:41
 */
import {Component} from "react"
import "./tabbar.css"
class Tabbar extends Component {
  state = {
    idx: 0,
    tits: [
      {
        key: 1,
        title: "game",
        content: "csgo 9k"
      },
      {
        key: 2,
        title: "politic",
        content: "america"
      },
      {
        key: 3,
        title: "women",
        content: "wuqingbingshao"
      }
    ]
  }
  clickHandler = (index,e) => {
    // e.preventDefault()
    console.log(index,"index",e);
    
    this.setState({
      idx: index
    })
  }
  render() {
    console.log("render Tabbar");
    return (
      <>
        <div className="tabbar">
          <div className="tab-title">
            {
              this.state.tits.map((item,idx) => {
                return <span key={item.key} className={`normal ${this.state.idx === idx ? 'active':''}`} onClick={this.clickHandler.bind(this,idx)}>{item.title}</span>
              })
            }
          </div>
          <div className="tab-content-wrap">
            <div className="tab-content">
              {this.state.tits[this.state.idx].content}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Tabbar