/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-19 18:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-20 20:45:19
 */
// 引入样式
import './style/index.less'
// import Food from "../src/modules/Food"
class Food {
  wrap: HTMLElement = document.querySelector("#food") as HTMLElement
  size: number
  constructor(size = 30) {
    this.size = size
    this.changePosition()
  }
  changePosition() {
    let top = Math.floor(Math.random() * this.size) * 10
    let left = Math.floor(Math.random() * this.size) * 10
    console.log(this.wrap)
    this.wrap.style.top = top + "px"
    this.wrap.style.left = left + "px"
  }
}
class ScorePanel {
  wrap: HTMLElement = document.querySelector("#score-panel") as HTMLElement
  score: number = 0
  level: number = 1
  size : number = 10
  constructor(size = 10) {
    this.size = size
  }
  update() {
    this.wrap.querySelector("#score")!.innerHTML = this.score + ""
    this.wrap.querySelector("#level")!.innerHTML = this.level + ""
  }
  upScore() {
    this.score++
    if(this.score % this.size===0) {
      this.upLevel()
    }
    this.update()
  }
  upLevel() {
    if (this.level < 10) {
      this.level++
    }

  }
}
class Snake {
  wrap :HTMLElement = document.querySelector("#snake") as HTMLElement
  head :HTMLElement = document.querySelector("#snake div") as HTMLElement
  body :HTMLCollection = document.querySelector("#snake")?.getElementsByTagName("div")!
  speed :number = 200
  constructor() {

  }
  get X () :any {
    return this.head.offsetLeft
  }
  get Y () :any {
    return this.head.offsetTop
  }
  set X (left) {
    if(this.body[1]) {
      if (left === (this.body[1] as HTMLElement).offsetLeft && this.head.offsetLeft > left) {
        console.log("向左掉头");
        left += 20
      }
      if (left === (this.body[1] as HTMLElement).offsetLeft && this.head.offsetLeft < left) {
        console.log("向右掉头");
        left -= 20
      }
      this.bodyFollow()
      // console.log("进入左右掉头",left,(this.body[1] as HTMLElement).offsetLeft)
      // console.log(left,(this.body[1] as HTMLElement).offsetLeft,this.head.offsetLeft)
      // if (left > (this.body[1] as HTMLElement).offsetLeft && (this.body[1] as HTMLElement).offsetLeft === this.head.offsetLeft) {
      //   console.log(left,(this.body[1] as HTMLElement).offsetLeft,this.head.offsetLeft)
      //   console.log("正在向右掉头");
        
      //   this.head.style.left = (left - 20) + "px"
      //   return
      // }
      // if (left < (this.body[1] as HTMLElement).offsetLeft && (this.body[1] as HTMLElement).offsetLeft === this.head.offsetLeft) {
      //   console.log("正在向左掉头");
      //   this.head.style.left = (left + 20) + "px"
      //   return
      // }
    }
    this.head.style.left = left + "px"
  }
  set Y (top) {
    if(this.body[1]) {
      if (top === (this.body[1] as HTMLElement).offsetTop && this.head.offsetTop > top) {
        console.log("向下掉头");
        top += 20
      }
      if (top === (this.body[1] as HTMLElement).offsetTop && this.head.offsetTop < top) {
        console.log("向上掉头");
        top -= 20
      }
      this.bodyFollow()
    }
    // if(this.body[1]) {
    //   if (top > (this.body[1] as HTMLElement).offsetTop) {
    //     console.log("正在向下掉头");
        
    //     this.head.style.top = (top - 20) + "px"
    //     return
    //   }
    //   if (top < (this.body[1] as HTMLElement).offsetTop) {
    //     console.log("正在向上掉头");
    //     this.head.style.top = (top + 20) + "px"
    //     return
    //   }
    // }
    this.head.style.top = top + "px"
  }
  addBody() {
    this.wrap.insertAdjacentHTML("beforeend","<div></div>")
  }
  bodyFollow() {
    for(let i = this.body.length - 1; i > 0; i--) {
      (this.body[i] as HTMLElement).style.top  = (this.body[i-1] as HTMLElement).offsetTop + "px";
      (this.body[i] as HTMLElement).style.left  = (this.body[i-1] as HTMLElement).offsetLeft + "px";
    }
  }
  isTouchMySelf() {
    for(let i = 1; i < this.body.length; i++) {
      if((this.body[i] as HTMLElement).offsetLeft === this.head.offsetLeft && (this.body[i] as HTMLElement).offsetTop === this.head.offsetTop)  {
        throw new Error("我吃我自己")
        // return true

      }
    }
    return false
  }
}
class GameControl {
  snake :Snake
  food: Food
  panel: ScorePanel
  direction :string = ""
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.panel = new ScorePanel()
    this.init()
  }
  init() {
    window.addEventListener("keydown",this.keyBoardHandler.bind(this))
    this.move()
  }
  move() {
    let top = this.snake.Y
    let left = this.snake.X
    // console.log(top,left,this.food.wrap.offsetTop,this.food.wrap.offsetLeft)
    if (top === this.food.wrap.offsetTop && left === this.food.wrap.offsetLeft) {
      this.food.changePosition()
      this.panel.upScore()
      this.snake.addBody()
    }
    if(top < 0 || top > 290 || left < 0 || left > 290) {
      throw new Error("撞墙了捏")
    }
    // this.snake.bodyFollow()
    if (this.direction === "n") {
      this.snake.Y = top - 10
    } else if (this.direction === "s") {
      this.snake.Y = top + 10
    } else if (this.direction === "e") {
      this.snake.X = left + 10
    } else if (this.direction === "w") {
      this.snake.X = left - 10
    } else {
      
    }
    this.snake.isTouchMySelf()
    // if (top === this.food.wrap.offsetTop && left === this.food.wrap.offsetLeft) {
    //   this.food.changePosition()
    //   this.panel.upScore()
    //   this.snake.addBody()
    // }
    // this.snake.bodyFollow()
    setTimeout(() => {
      try {
        this.move()
      } catch (error:any) {
        // console.log(error.message,"message")
        alert(error.message)
      }
    }, this.snake.speed - 30* (this.panel.level - 1));
  }
  
  keyBoardHandler(e:any) {
    let direction = e.key
    switch (direction) {
      case "ArrowUp":
        this.direction = "n"
        break;
      case "ArrowDown":
        this.direction = "s"
        break;
      case "ArrowRight":
        this.direction = "e"
        break;
      case "ArrowLeft":
        this.direction = "w"
        break;
      default:
        this.direction = ""
        break;
    }
    // this.move()
  }
}
let gameControl = new GameControl()
console.log(gameControl,"gameControl");

// let snake = new Snake()
// snake.X = 100
// snake.Y = 200
// console.log(snake.X,snake.Y,"xx")
// let scorePanel = new ScorePanel(30)
// for(let i = 0; i < 200; i++) {
//   scorePanel.upScore()
// }
// const food = new Food()
// import Food from './modules/Food';
// const food =  new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);


// setInterval(()=>{
//     console.log(gameControl.direction);
// }, 1000);
