/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-01 20:22:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-02 21:18:44
 */
(function (win) {
  class DatePicker {
    constructor (target,dateBlock,base) {
      this.target = target,
      this.dateBlock = dateBlock,
      this.base = base;
      this.current = null;
      this.cloneCurrent();
      this.applyHTML(this.getHTML(this.getDate()));
      this.showNextMonth();
      this.eventInit();
    }
    eventInit () {
      this.target.on("focus",(e) => {
        e.preventDefault();
        console.log("focus");
        this.dateBlock.css({
          transform: "translateX(0) translateZ(0)"
        })
        this.target.css("display","none");
        }  
      )
      //选择日期
      this.dateBlock.on("click","li:not(.empty)", (e) => {
        console.log(e.target);
        console.log("product date");
        $("li").removeClass("selected");
        $(e.target).addClass("selected");
        let result = e.target.dataset.date;
        console.log(result);
        this.target.val(result);
        this.dateBlock.css({
          transform: "translateX(100vw) translateZ(0)"
        })
        this.target.css("display","block");
      })
      
    }
    cloneCurrent () {
      this.current = new Date(this.base);
    }
    getDate (today) {
      console.log(this.current);
      console.log((new EasyDate(this.current)).toObject(today));
      return (new EasyDate(this.current)).toObject(today)
    }
    getPreDate () {
      return (new EasyDate(this.current)).toPreObject()
    }
    getHTML (data) {
      return template("temp", data);
    }
    applyHTML (html) {
      this.dateBlock.append(html);
    }
    prependHTML (html) {
      this.dateBlock.prepend(html);
    }
    showNextMonth () {
      this.current.setMonth(this.current.getMonth() + 1);
      this.applyHTML(this.getHTML(this.getDate(true)));
      this.current.setMonth(this.current.getMonth() - 1);
      console.log(this.current);
    }
    flashPreMonth () {
      console.log(1);
      console.log(this.current.getMonth());
      
      this.current.setMonth(this.current.getMonth() - 1);
      console.log(this.getPreDate());
      this.prependHTML(this.getHTML(this.getPreDate()));
    }
  }
  win.DatePicker = DatePicker;
})(window);