(function (w) {
  const DEFAULT_FORMAT = "yyyy-mm-dd";
    class EasyDate {
      constructor(date, option) {
        let result = EasyDate.isStandardDate(date);
        if (result) {
          this.base = new Date(result);
        }
        if (date instanceof Date) {
          this.base = new Date(date);
        }
        this.format = option?.format || DEFAULT_FORMAT;

      }
      resetTime() {
        this.base.setHours(0);
        this.base.setMinutes(0);
        this.base.setSeconds(0);
        this.base.setMilliseconds(0);
      }
      static padLeft(num) {
        return String(num)[1] && String(num) || "0" + num;
      }
      /**
       * @description: 格式化Date对象为日期字符串
       * @param {Date} 
       * @param {String}
       * @return {String} 日期字符串
       * @Date: 2022-11-28 20:46:54
       */
      static format(date, format = DEFAULT_FORMAT) {
        let obj = {
          "y": date.getFullYear(),
          "m": EasyDate.padLeft(date.getMonth() + 1),
          "d": EasyDate.padLeft(date.getDate())
        }
        let result = Object.entries(obj).reduce(function (acc, [key, value]) {
          let regExp = new RegExp(`${key}+`, "i");
          return acc.replace(regExp, value);
        }, format);
        return result;
      }
      /**
       * @description: 获取日期月份第一天是星期几 
       * @return {String} 当前月份第一天是周几
       * @Date: 2022-11-28 20:35:48
       */
      getFirstDayOfThisMonth() {
        let date = this.clone();
        date.base.setDate(1);
        return date.base.getDay();
      }
      clone() {
        return new EasyDate(this.base, this.format);
      }
      //重置时间  填充十位  时间格式化  得到当前月的第一天  克隆EasyDate对象 设置当前时间 获取当前时间  年份字符串大小   判断当前日期是否是标准日期 闰年
      setDate(num) {
        this.base.setDate(num);
      }
      getDate() {
        return this.base.getDate()
      }
      toObject () {
        return {
          year: this.base.getFullYear(),
          month: this.base.getMonth() + 1,
          empty: this.getFirstDayOfThisMonth(),
          days: EasyDate.getDates(this.base,new Date(this.base))
        }
      }
      /**
       * @description: 比较两个日期时间的大小
       * @param {Date} 
       * @return {Boolean}
       * @Date: 2022-11-28 20:45:32
       */
      compareTimeStr(date) {
        if (!date) {
          return false;
        }
        date = date instanceof EasyDate ? date : new EasyDate(date);
        console.log(date);
        // console.log(this.toString());
        // console.log(date.toString());
        return this.toString() > date.toString()
      }
      toString() {
        return EasyDate.format(this.base, this.format);
      }
      /**
       * @description: 判断是否是日期格式 
       * @param {String} 日期字符串 
       * @return {Boolean}
       * @Date: 2022-11-28 21:07:20
       */
      static isStandardDate(dateStr, format = DEFAULT_FORMAT) {
        let arr = [/d+/gi, /y+/gi, /m+/gi];
        arr.forEach(function (curr) {
          format = format.replace(curr, function (right) {
            return `\\d{${right.length / 2},}`
          })
        })
        // format = format.replace(/-/gi,"[:\\\/\-]");
        format = format.replace(/-/gi, "[:\\\\\\/\\-]");
        let reg = new RegExp(`^${format}$`);
        let isStand = reg.test(dateStr);
        if (!isStand) {
          return false;
        }
        dateStr = dateStr.replace(/[:\\\/\-]/gi, "-");
        //对双位和一位进行补齐
        let args = dateStr.match(/(\d+)-(\d+)-(\d+)/);
        console.log(args);
        let newStr = "";
        for (let i = 1; i < 4; i++) {
          if (i === 1) {
            newStr += ("20" + args[i]).substr(-4) + "-"
          }
          if (i === 2) {
            newStr += EasyDate.padLeft(args[i]) + "-"
          }
          if (i === 3) {
            newStr += EasyDate.padLeft(args[i]) + "-"
          }
        }
        newStr = newStr.substr(0, 10);
        // return dateStr;
        return newStr;
      }
      /**
       * @description: 
       * @param {Date} date
       * @param {EasyDate} today
       * @param {Date} start
       * @param {Date} end
       * @return {*}
       * @Date: 2022-11-29 20:18:53
       */
      static getDates(date, today, start, end) {
        let newDate = new Date(date);
        console.log(date,today);
        console.log(date == today);
        let month = newDate.getMonth();
        newDate.setDate(1);
        let arr = [];
        start = start ? new EasyDate(start) : null;
        end = end ? new EasyDate(end) : null;
        today = today ? new EasyDate(today) : null;
        // 特性:date.setDate(值) 值超过该月天数时,月份会自加
        while (newDate.getMonth() === month) {
          let easyDate = new EasyDate(newDate);
          let obj = {
            disabled: (start ? easyDate.toString() > start?.toString() : true) && (end ? easyDate.toString() < end?.toString() : true) && (easyDate.toString() > today?.toString()),
            today: today?.toString() === easyDate.toString(),
            date: EasyDate.format(newDate)
          }
          arr.push(obj);
          newDate.setDate(newDate.getDate() + 1);
        }
        return arr;
      }
    }
  w.EasyDate = EasyDate
})(window)
