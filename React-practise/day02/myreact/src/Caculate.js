/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-14 15:40:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-14 16:57:13
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
  clickHandler = (e) => {
    this.props.changeHandler(this.props.type,AmountInput.inputHandler(e.target.value))
  }
  render () {
    return (
      <>
        {this.props.content} : <input type="text" value={this.props.value} onChange={this.clickHandler}></input>
      </>
    )
  }
}
class Caculate extends Component {
  state = {
    usa: "",
    cn: "",
    rate: 7.13
  }
  changeHandler = (type,price) => {

    if (type === "usa") {
      this.setState({
        usa: price,
        cn: price * this.state.rate
      })  
      return 
    }
    if (type === "rmb") {
      this.setState({
        cn: price,
        usa: price / this.state.rate
      }) 
      return 
    }
  }
  render () {
    return (
      <>
      <h1>汇率计算</h1>
      <AmountInput content={"美元"} value={this.state.usa} changeHandler={this.changeHandler} type={"usa"}></AmountInput>
      <AmountInput content={"人民币"} value={this.state.cn} changeHandler={this.changeHandler} type={"rmb"}></AmountInput>
      </>
    )
  }
}

export default Caculate