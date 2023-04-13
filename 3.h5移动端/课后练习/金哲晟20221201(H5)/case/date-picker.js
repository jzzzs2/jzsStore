(function (win) {
  class DatePicker {
    constructor(target, wrap, options = {}, callback) {
      if (!target) {
        return this.showError();
      }
      this.wrap = $(wrap) || $('.date-picker-wrap');
      this.options = options;
      this.target = $(target);
      this.isInit = false; //是否已初始化
      this.callback = callback || function (date) {
        this.target.val(date);
      }
      this.tempPicker = 'picker';
      this.tempCalendar = 'calendar';
      this.selectEle = null;
      this.init();
    }


    eventAgent () {
      this.target.on('focus', (e) => {
        //验证防止重复初始化
        if (this.isInit) {
          this.showPicker();
          return false;
        }
        this.initPickerView();
      })
      this.wrap.on('click', '.dp-container li', (e) => {
        let li = e.target;
        if ($(li).hasClass('disabled') || $(li).hasClass('empty')) {
          return false;
        }
        this.selectEle = $(li);
        this.confirm();
      })
    }


    init () {
      this.fixWrap();
      this.eventAgent();
    }

    resetConfirm () {
      $('.selected').removeClass('selected');
    }


    // 点击日期 
    confirm () {
      this.resetConfirm();
      this.selectEle.addClass('selected');
      let date = this.selectEle[0].dataset['date'];
      this.callback(date);
      this.hidePicker();
    }

    //渲染上一个
    addLastMonth () {
      this.current.transDate('-1m');
      this.prependToContainer(this.createMonthElement());
    }


    initPickerView () {
      this.isInit = true; //已初始化
      let options = this.options;
      this.today = new EasyDate(); //2020/10/9 .transDate('-2d') 2020/11/9
      this.start = options.start ? new EasyDate(options.start) : this.today;
      this.end = options.end ? new EasyDate(options.end) : null;
      this.current = this.today.clone();
      this.current.setDate(1); //设置为当月1号

      this.createPickerPage(); //渲染整体picker
      this.appendToContainer(this.createMonthElement()); //渲染月数据
      this.current.transDate('+1m');
      this.appendToContainer(this.createMonthElement());
      this.current.transDate('-1m');
      this.showPicker();
    }



    /*
     *@method: createPickerPage 渲染picker插件页面
    */
    createPickerPage () {
      let $pickerHTML = $(this.getTemplate(this.tempPicker, {}));
      this.$container = $pickerHTML.find('.dp-container');
      this.wrap.append($pickerHTML);
    }


    /*
      *@method: 添加月blockHTML到container最后
    */
    appendToContainer (calendarHTML) {
      this.$container.append(calendarHTML);
    }

    /*
     *@method: 添加月blockHTML到container最前
   */
    prependToContainer (calendarHTML) {
      this.$container.prepend(calendarHTML);
    }



    /*
      *@method: picker插件页面滑入 
    */
    showPicker () {
      this.wrap.addClass('show');
      let that = this;

      this.pullDown = new PullDown({
        contentEle: this.$container,
        callback (cb) {
          console.log('加载中');
          that.addLastMonth();
          cb();
        }
      });
    }

    /*
      *@method: picker插件页面滑出 
    */
    hidePicker () {
      this.wrap.removeClass('show');
    }

    /*
    *@method: createMonthObject 获取当前月的数据对象
   */
    createMonthObject (current, today, start, end) {
      return current.toObject(today, start, end);
    }


    /*
      *@method: createMonthElement 创建月view组件
    */
    createMonthElement () {
      //获取当前月的渲染数据
      let month = this.createMonthObject(this.current, this.today, this.start, this.end);
      //获取当前月渲染内容
      let calendarHTML = this.getTemplate(this.tempCalendar, month);
      //调用append 添加渲染内容到页面的 dp-container 内
      return calendarHTML;
    }



    /*
      *@method: getTemplate 根据模板和数据渲染对应的HTML内容
      *@params {String} tempId  模板ID
      *@params {Object} data  渲染需要的数据
      *@return {String : HTML} 模板渲染输出HTML内容
    */
    getTemplate (tempId, data) {
      return template(tempId, data);
    }


    showError () {
      return "请传参设置目标日期input"
    }

    fixWrap () {
      let $wrap = $(this.wrap);
      let isWrap = $wrap.hasClass('date-picker-wrap');
      isWrap || $wrap.addClass('date-picker-wrap');
    }
  }
  win.DatePicker = DatePicker
})(window);