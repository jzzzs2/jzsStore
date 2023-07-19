import { Component } from "react"
// function App() {
//   return (
//     <h1>我是标题react</h1>
//   );
// }
class App extends Component {
  name = "jzs"
  static name = "keainie"
  eat (msg,e) {
    console.log("我喜欢吃" + this.name,msg,e);
  }
  eat2 = () => {
    console.log("i like " + this.name);
  }
  eat3 () {
    console.log("this",this);
  }
  render() {
    console.log(this.name,"this");
    return (
      <>
        <h1>我是标题</h1>
        <h2>我是标题2</h2>
        <button onClick={(e) => {console.log(this.name,e);console.log(App.name);}}>click1</button>
        <button onClick={function () {console.log(this,"xx")}}>click2</button>
        <button onClick={this.eat.bind(this)}>click3</button>
        <button onClick={this.eat2}>click4</button>
        <button onClick={this.eat.bind(this,"hehe")}>click5</button>
        <a href="#2222" onClick={(e) => {return false}}>to baidu 1</a>
        <a href="#2222" onClick={(e) => {e.preventDefault()}}>to baidu 2</a>
        <p>test</p>
        <button onClick={this.eat2}>2</button>
        <button onClick={this.eat3}>3</button>
        <button onClick={this.eat3.bind(this)}>4</button>
      </>

    )
  }
}
// let test = (msg,e) => {
//   console.log(msg,e)
// }
// let Test = () => {
//   return (
//     <>
//     <h1>我是标题one</h1>
//     <h2>我是标题two</h2>
//     <h3>我是标题three</h3>
//     {/* <button onClick={(e)=> {console.log("点击了",e)}}>点我触发</button> */}
//     <button onClick={(e)=> {test("haoye",e)}}>点我触发</button>
//     </>
//   )
// }
export default App;
// export default Test;
