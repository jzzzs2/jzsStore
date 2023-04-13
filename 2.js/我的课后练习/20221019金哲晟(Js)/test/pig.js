/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-10-19 21:38:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-10-19 23:41:49
 */
(
  function (w) {
    function Pig(param = {}) {
      this.init(param);
    }
    Pig.drag = {
      mousedown: function (e, pig) {
        console.log(e,"e");
        pig.isDown = true;
        let x = e.clientX;
        let y = e.clientY;
        console.log(pig);
        let left = pig.ele.dom.offsetLeft;
        let top = pig.ele.dom.offsetTop;
        pig.ele.position.top = top;
        pig.ele.position.left = left;
        pig.ele.position.x = x;
        console.log(x,"donw");
        pig.ele.position.y = y;

      },
      mousemove: function (e, pig) {
        if (pig.isDown) {
          e.preventDefault();
          let x = e.clientX;
          let y = e.clientY;
          let _x = x - pig.ele.position.x;
          let _y = y - pig.ele.position.y;
          console.log(pig.ele.position.x,"x");
          pig.ele.dom.style.left = _x + pig.ele.position.left + "px";
          pig.ele.dom.style.top = _y + pig.ele.position.top + "px";
        }
      },
      mouseup: function (e, pig) {
        pig.isDown = false;
      }
    }
    Pig.prototype.siblings = [];
    Pig.prototype.init = function ({
      container,
      url,
      name = "none",
      age = 1,
      weight = 20,
      width = 100,
      isDown = false
    }) {
      this.isDown = isDown;
      this.name = name;
      this.age = age;
      this.weight = weight;
      this.container = document.querySelector(container);
      this.url = url;
      this.width = width;
      this.draw(this);
      this.drawInit();
      this.siblings.push(this);
    }
    Pig.prototype.draw = function (obj) {
      let ele = document.createElement("img");
      ele.setAttribute("src", obj.url);
      ele.style.width = this.width + "px";
      obj.ele = {
        dom: ele,
        position: {
          top: 0,
          left: 0,
          x: 0,
          y: 0
        }
      };
      obj.container.appendChild(ele);
    }
    Pig.prototype.drawInit = function () {
      let pig = this;
      let ele = this.ele.dom;
      console.log(this,"hh");
      let drag = function (e) {
        if (Pig.drag[e.type]) {
          Pig.drag[e.type](e, pig);
        }
      }
      ele.addEventListener("mousedown", drag);
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", drag);
    }
    let p1 = new Pig({
      container: ".wrap",
      url: "./1.jpg",
      width: 80,
      weight: 30,
      age: 22,
      name: "erciyuan"
    });
    console.log(Pig.prototype);
    console.log(Pig.drag);
  }

)(window);