(function (win) {

  /* 
    EasyDate类 作为 原生 Date类的加强封装版本
    需求 能够向下兼容Date类 Date类的实例对象可以直接使用EasyDate进行包装
  */

  //常量 默认格式化字符串
  const DEFAULT_FORMAT = "yyyy-mm-dd";

  const UNIT_TYPE = {
    'm': 'Month',
    'd': 'Date',
    'y': 'FullYear'
  }

  /*
   *@class:  EasyDate
   *@classdes: EasyDate 时间日历主对象
   *@params: {number} offset 初始日期偏移量/日期
   *@params: {Object} options 扩展的定制化功能
   *@desc: 通过EasyDate 模拟接口 实现月份调取/日期格式化等增值API
  */

  class EasyDate {
    constructor(offset, options) {
      /*
        1. offset是日期形式字符串 "2020/02/09" => isDate =>"2020-02-09"  => this.base = new Date("2020-02-09")
 
        2. offset 是一个Date对象 this.base = new Date(offset) 包装一层防止引用污染
 
        3. offset 没传 或者参数能够转换为 false  0 '' 

        
        isDate处理 字符串日期 其他false情况 
          如果是false情况 => 返回当天的Date对象
          如果是 字符串日期 返回格式化后的字符串日期
      
      */
      let date = EasyDate.isDate(offset);

      //date 
      if (date) {
        this.base = new Date(date);
      }

      //直接用offset 判断是不是Date对象 如果是 直接拷贝
      if (offset instanceof Date) {
        this.base = new Date(offset);
        return;
      }


      // if(date instanceof Date){
      //   this.base = new Date(date);

      // }
      this.format = options?.format || DEFAULT_FORMAT

    }

    /*
     *@method: resetTime 重置日期时间
     *@for: 重置日期对象的时间为 0时0分0秒0毫秒
     *@desc: 防止后续日期对象比较运算 或者 +- 运算出现bug
    */
    resetTime () {
      this.base.setHours(0);
      this.base.setMinutes(0);
      this.base.setSeconds(0);
      this.base.setMilliseconds(0);
    }

    /*
     *@method: setDate 设置当前日期为传入日期
     *@params {Object} date 日期对象
    */
    setDate (date) {
      this.base.setDate(date)
    }

    /*
    *@method: getDate 返回当前日期对象
    *@return {Object} date 当前日期对象
   */
    getDate (date) {
      return this.base;
    }


    /*
      *@method: transDate 
      *@params {String} offset 偏移量 例如: "+1m" 表示下一个月
    */
    transDate (offset) {
      //参数转义
      offset = EasyDate.parse(offset);
      if (!offset) {
        return false;
      }
      for (let key in offset) {
        if (offset.hasOwnProperty(key)) {
          let type = UNIT_TYPE[key];
          this.base[`set${type}`](this.base[`get${type}`]() + offset[key])
        }
      }

    }


    /*
     *@static: parse 日期偏移整理
     *@params {String} offset 偏移量 例如: "+1m" 表示下一个月
     
     "+1M" "+1D" "+8d" "-10m" "1m"
   */
    static parse (offset) {
      if (!offset) {
        return false;
      }
      //转换为小写统一格式
      offset = offset.toLowerCase();

      let result = {};

      offset.replace(/([+-]?\d+)([ymd])/g, (m, number, unit) => {
        result[unit] = Number(number);
      })
      return result;
    }


    /*
    *@static: isLeapYear 判断闰年
    *@params {Number} year 年
    *@return {Boolean} %4=== 能被100整除不能被4整除 能被400整除
   */
    static isLeapYear (year) {
      //计算机系统起始年份是1900 if优化方式 并行化if 不要嵌套if
      if (!year || year <= 1900) {
        return false;
      }
      if (year % 100 === 0) {
        return year % 400 === 0;
      }
      return year % 4 === 0;
    }


    /*
    *@method: getFirstDayOfThisMonth 获取月份第一天
    *@return {Number} firstDay 用于empty
    */
    getFirstDayOfThisMonth () {
      //用当前日期EasyDate对象克隆副本 调整到1号 获取1号的星期几
      let date = this.clone();
      date.setDate(1);
      return date.getDay();
    }

    /*
     *@method: getDay 获取 日
     *@params {Number} 星期 getDay 
    */
    getDay () {
      return this.base.getDay();
    }


    /*
      *@method: 克隆当前日期EasyDate对象
      *@return {Object EasyDate} new EasyDate
    */
    clone () {
      return new EasyDate(this.base, {
        format: this.format
      });
    }

    /*
     *@method: isGreateOrEqual 判断参数日期是否>= 对象日期this.base
     *@for: 对标业务(选择|输入日期 不能大于 当前日期(今天))
     *@params {Object} date 日期对象
     *@return {Boolean} >= 
    */
    isGreateOrEqual (date) {
      if (!date) {
        return false;
      }
      date = date instanceof EasyDate ? date : new EasyDate(date, { format: DEFAULT_FORMAT });
      return this.toString() >= date.toString();
    }

    /*
     *@method: 日历数据对象生成器 
     *@params {Date} today 元数据的那一天
     *@params {Date} start 起始日期
     *@params {Date} end 结束日期
     *@return {Object:json} MonthData{year|month|empty|days}
    */
    toObject (today, start, end) {
      //this.base  是元数据日期对象
      const month = this.base.getMonth();

      return {
        year: String(this.base.getFullYear()),
        month: EasyDate.toDouble(month + 1),
        empty: this.getFirstDayOfThisMonth(),
        days: EasyDate.getDates(this.base, today, start, end, this.format)
      }
    }


    /*
     *@method: toString 格式化当前日期为文本
     *@return {String} 当前日期对象字符串
    */
    toString () {
      return EasyDate.format(this.base, this.format)
    }


    /*
     *@static: toDouble 十位补0 日期格式化工具方法
     *@params: {Number} num 需要补0的数字
     *@return: {String} 返回补0后的字符串
    */
    static toDouble (num) {
      return String(num)[1] && String(num) || '0' + num;
    }


    /*
     *@static: format 日期对象+模板字符串 日期格式化字符串
     *@desc: (date , 'yyyy-MM-dd') => "2020-08-10"
     *@params: {Object Date} date 日期对象
     *@params: {String} formate 模板字符串
     *@RegExp: [/y+/gi,/m+/gi,/d+/gi]
     *@return: {String} 格式化后的日期字符串
    */
    static format (date = new Date(), format = DEFAULT_FORMAT) {

      let regMap = {
        'y': date.getFullYear(),
        'm': EasyDate.toDouble(date.getMonth() + 1),
        'd': EasyDate.toDouble(date.getDate())
      }

      //逻辑(正则替换 对应位置替换对应值) 数据(日期验证字符 对应值) 分离
      return Object.entries(regMap).reduce((acc, [reg, value]) => {
        return acc.replace(new RegExp(`${reg}+`, 'gi'), value);
      }, format);
    }


    /*
      *@static: getDates  传入的日期对象对应月的每一天数据对象
      *params {Object Date | Stirng} date 日期对象
      *params {Object EasyDate} today 今天日期对象
      *params {Object EasyDate} start 日期不可选范围起始 
      *params {Object EasyDate} end 日期不可选范围结束
      *params {String} format 日期对象
      *desc: 关于disibiled 根据 参数 start , end 结果不同
        如果 start end都传参 不可选范围为 start > date <= end
        如果 只传start 不可选范围为 start > date
        如果 start end都不传 范围为 "今日" > date
      *@return: {Array} 传入的日期对象对应月的每一天数据对象
    */
    static getDates (date, today = this, start = today, end = null, format = DEFAULT_FORMAT) {

      today = (!(today instanceof EasyDate)) && new EasyDate(today);
      start = start && new EasyDate(start);
      end = end && new EasyDate(end);
      let month = date.getMonth(); //获取月份  7月16号 month = 7
      date = new Date(date); //做一次日期对象拷贝
      date.setDate(1); //设置日期为当月第一天 date设置为7月1号新Date
      let dates = []; //存放每一天

      /*
        核心问题 如何算这个月有多少天

        解决核心 date对象 setDate的值 如果超过了当月最后一天n天 date日期会直接变为下个月的第n天
        例如 date 10.1
              date.setDate(34) => date: 11.3
        
        date设置为当月1号
        循环条件 (date.getMonth === month)

        循环中设置 
      
        date.setDate(date.getDate() + 1); 
      */
      //如果date日期月份没有变化
      while (date.getMonth() === month) {
        let label = EasyDate.format(date, format);
        dates.push({
          date: label.substr(0, 10), //2020-10-10 截取有效日期字符
          today: today && today.toString() === label, //对比格式化后字符串
          //如果end传参就加入条件 start<label>end 如果end没传 只判断 start < label 结果为true 不可选中
          disabled: (start && label > start.toString()) && (end ? (label <= end.toString()) : true)
        });
        //while循环动力 每次循环重新设置日期为下一天
        date.setDate(date.getDate() + 1);
      }
      return dates;
    }

    /*
    *@static: 判断是否是日期以及是否是标准格式
    *@params: {String} dateStr 字符串日期 "2020/03/04"
    *@params: {String} formate 标准模板字符串
    *@RegExp: [/y+/gi,/m+/gi,/d+/gi] , /(\d{4})[-|//\/\:](\d{2})[-|//\/\:](\d{2})/
    *@return: {String} 标准模板转换后的日期字符串
   */
    static isDate (dateStr, format = DEFAULT_FORMAT) {

      if (!dateStr) {
        return EasyDate.format(new Date(), format);
      }
      //如果dateStr 是EasyDate对象 或者 Date对象 直接返回 不需要验证
      if (dateStr instanceof EasyDate || dateStr instanceof Date) {
        return dateStr;
      }

      let pos = [];
      let regExps = [/d+/gi, /y+/gi, /m+/gi];

      regExps.forEach(regexp => {
        format = format.replace(regexp, match => {
          pos.push(match.substr(0, 1));
          return `(\\d{${match.length}})`
        })
      });
      //dateStr格式 必须是 4位数字+分隔符+2位数字+分隔符+2位数字 这种格式
      format = format.replace(/-/gi, "\[-|//\/\:\]")
      let regExp = new RegExp(`^${format}$`)
      //dateStr不管是什么格式分隔符 分隔符统一替换成 -

      return dateStr.replace(/[-|//\/\:]/gi, '-').replace(/(\d+)-(\d+)-(\d+)/g, function (item, $1, $2, $3) {
        return `${$1.length === 4 && $1 || ('20' + $1).substr(-4)}-${EasyDate.toDouble($2)}-${EasyDate.toDouble($3)}`
      })
    }
  }

  win.EasyDate = EasyDate;
})(window);