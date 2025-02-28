const app = getApp();
Page({
  data: {
    monthRange: [1, 12],
    list_show: null,
    now_year_month: [2025, 2],
    dateList: [],
    selectDate: null,
    list: [
      { id: 1, text: "柯山消防大队" },
      { id: 2, text: "龙游消防大队" },
      { id: 3, text: "衢江消防大队" },
      { id: 4, text: "柯城消防大队" },
    ]
  },
  onLoad() {
    this.setData({ dateList: this.generateCalendarData(2025, 2) });
  },
  setlist_show({ target: { dataset: { type } } }) { // 显示隐藏下拉框
    console.log(type)
    if (this.data.list_show === 0 || this.data.list_show === 1) return this.setData({ list_show: null })
    this.setData({ list_show: type })
  },
  generateCalendarData(year, month) {
    // 获取本月基础信息
    const daysInMonth = new Date(year, month, 0).getDate();    // 本月总天数
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 首日星期（0=周日）
    const prevMonthDays = new Date(year, month - 1, 0).getDate();  // 上月总天数
    const calendarData = [];
    const prependDays = firstDayOfMonth;
    if (prependDays > 0) {
      const prevMonthYear = month === 1 ? year - 1 : year;
      const prevMonth = month === 1 ? 12 : month - 1;
      const startDay = prevMonthDays - prependDays + 1;

      // 按顺序添加上月最后几天（如28,29,30）
      for (let day = startDay; day <= prevMonthDays; day++) {
        calendarData.push({
          year: prevMonthYear,
          month: prevMonth,
          day: day,
          isCurrentMonth: false
        });
      }
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarData.push({
        year: year,
        month: month,
        day: day,
        isCurrentMonth: true
      });
    }

    const totalWeeks = 6;  // 保证6周完整显示
    const neededDays = totalWeeks * 7 - calendarData.length;

    if (neededDays > 0) {
      let currentDate = new Date(year, month, 1);  // 下个月第一天

      for (let i = 0; i < neededDays; i++) {
        calendarData.push({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,  // 转换为1-based月份
          day: currentDate.getDate(),
          isCurrentMonth: false
        });
        currentDate.setDate(currentDate.getDate() + 1);  // 自动处理跨月
      }
    }

    return calendarData.slice(0, 42);  // 确保返回42天
  },
  selectDay({ target: { dataset: { i } } }) { // 选择日期
    const data = this.data.dateList.find((item, index) => index === i)
    console.log(data)
    this.setData({ selectDate: data })
  },
  setMonth({ target: { dataset: { type } } }) { // 设置月份
    let year = this.data.now_year_month[0];
    let month = this.data.now_year_month[1];
    if (type === "+") {
      if (month + 1 > 12) {
        year += 1;
        month = 1
      } else {
        month += 1
      }
    } else if (type === "-") {
      if (month - 1 < 1) {
        year -= 1;
        month = 12
      } else {
        month -= 1
      }
    }
    console.log([year, month])
    this.setData({ now_year_month: [year, month] })
    this.setData({ dateList: this.generateCalendarData(this.data.now_year_month[0], this.data.now_year_month[1]) })
  }
});
