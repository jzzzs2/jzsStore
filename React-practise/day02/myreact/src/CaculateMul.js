/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-14 15:40:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-14 17:25:22
 */
import {Component} from "react"
class AmountInput extends Component {
  static inputHandler (value) {
    //非数字验证
    value = value.replace(/[^\d\.]+/g, '');
    //强制保留两位小数
    var doubleReg = /^(\d+)\.(\d\d).*$/;
    value = value.replace(doubleReg, '$1.$2');
    //开始非零验证
    value = value.replace(/^(0)(\d)$/, '$2');
    //小数点验
    value = value.replace(/^(\.+)$/, '0.');
    value = value.replace(/^(\d*)(\.+)$/, '$1.');
    //巨大数值
    value = value.replace(/^(\S{8})(\S+)$/, '$1');
    //只保留一个 .
    value = value.replace(/(\d+\.)(\d)(\.+)/, '$1$2');
    return value;
  }
  clickHandler = (type,e) => {
    this.props.changeHandler(type,e.target.value)
  }
  render () {
    return (
      <>
        {this.props.type} : <input type="text" value={this.props.value} onChange={this.clickHandler.bind(this,this.props.type)} onFocus={this.props.focusHandler.bind(this,this.props.type)}></input>
      </>
    )
  }
}
class CaculateMul extends Component {
  state = {
    countrys: [
      {
        type: "usa",
        value: ""
      },
      {
        type: "cn",
        value: ""
      },
      {
        type: "jap",
        value: ""
      }
    ]
  }
  ratioMap = {
    jap: 138.2,
    cn: 7.1,
    usa: 1
  }
  transform = (input,output,value) => {
    return value / this.ratioMap[input] * this.ratioMap[output]
  }
  changeHandler = (type,value) => {
    this.setState({
      countrys: this.state.countrys.map(item => {
        item.value = this.transform(type,item.type,value).toFixed(2)
        return item
      })
    })
  }
  focusHandler = (type) => {
    this.changeHandler(type,0)
  }
  render () {
    return (
      <>
      <h1>汇率计算</h1>
      {
        this.state.countrys.map(item =>  {
          return (
           <AmountInput type={item.type} value={item.value} changeHandler={this.changeHandler} focusHandler={this.focusHandler}></AmountInput>
          )
        })
      }
      </>
    )
  }
}

export default CaculateMul