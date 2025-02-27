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
  setlist_show({ target: { dataset: { type } } }) {
    console.log(type)
    if (this.data.list_show === 0 || this.data.list_show === 1) return this.setData({ list_show: null })
    this.setData({ list_show: type })
  },
  generateCalendarData(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate(); // 本月天数
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 本月第一天是星期几
    const prevMonthDays = new Date(year, month - 2, 0).getDate(); // 上个月天数
    let nextMonthDays = 0; // 下个月天数，初始化为0，后面根据需要计算
    let calendarData = []; // 初始化结果数组

    // 填充上个月的日期
    for (let i = firstDayOfMonth - 1; i >= 0 && calendarData.length < 35; i--) {
      calendarData.unshift({
        year: year,
        month: month - 1,
        day: prevMonthDays - i,
        isCurrentMonth: false
      });
    }

    // 填充本月的日期
    for (let i = 1; i <= daysInMonth && calendarData.length < 35; i++) {
      calendarData.push({
        year: year,
        month: month,
        day: i,
        isCurrentMonth: true
      });
    }

    // 如果还没凑满35条，继续填充下个月的日期
    if (calendarData.length < 35) {
      const nextMonth = new Date(year, month, 1);
      nextMonth.setMonth(nextMonth.getMonth() + 1); // 切换到下个月
      while (calendarData.length < 35) {
        nextMonthDays++;
        calendarData.push({
          year: nextMonth.getFullYear(),
          month: nextMonth.getMonth() + 1, // 月份从0开始，所以要加1
          day: nextMonthDays,
          isCurrentMonth: false
        });
        nextMonth.setDate(nextMonth.getDate() + 1); // 日期递增
      }
      // 注意：这里我们可能多计算了一些下个月的日期，但因为只需要35条，所以超出部分会被忽略
    }

    // 截断数组以确保只有35条数据（虽然上面的逻辑已经保证了这一点，但这是一个额外的安全措施）
    calendarData = calendarData.slice(0, 35);

    return calendarData;
  },
  selectDay({ target: { dataset: { i } } }) {
    const data = this.data.dateList.find((item, index) => index === i)
    console.log(data)
    this.setData({ selectDate: data })
  },
  setMonth({ target: { dataset: { type } } }) {
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
  },
  onLoad() {
    this.setData({ dateList: this.generateCalendarData(2025, 2) })
  },
});
