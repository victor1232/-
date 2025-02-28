const app = getApp();
Page({
  data: {
    leftBtns: [
      {
        text: '删除',
        bgColor: '#FF2B00',
        color: '#fff',
      },
    ],
    list: [
      { text: '全部', value: 1, },
      { text: '随机', value: 0, },
    ],
    swipeIndex: -1,
    slotWeakVisible: false,
    visible: false,
    addObj: {
      context: "",
      type: null,
      data: []
    },
    viewList: [],
    add_update: true
  },
  onLoad() {
    this.getRecordList()
  },

  onSwipeStart() {
    this.setData({ swipeIndex: '' });
  },
  onSwipeEnd(args1, args2) {
    let e, data;
    e = args1;
    data = args1.detail;
    const { index } = e.target.dataset.item;
    data.swiped && this.setData({ swipeIndex: index });
  },
  onButtonTap(data, e) {
    console.log(data, e);
  },
  addContent({ target: { dataset: { item } } }) {
    if (item) {
      this.setData({
        add_update: false,
        addObj: {
          id: item.id,
          context: item.content,
          type: item.type == 0 ? { text: '随机', value: 0, } : { text: '全部', value: 1, },
          data: item.data
        }
      })
    }
    this.setData({ slotWeakVisible: true, })

  },
  popupClose() {
    this.setData({
      slotWeakVisible: false,
      add_update: true,
      addObj: {
        context: "",
        type: null,
        data: []
      }
    })
  },
  handleVisibleChange(visible, e) {
    this.setData({ visible: !this.data.visible });
  },
  handleTapItem(e, item) { // 更新新增巡检内容的type
    this.setData({
      addObj: {
        ...this.data.addObj,
        type: e
      }
    })
    this.setData({ visible: false });
  },
  changeAddValue(e) { // 更新巡检内容context
    this.setData({
      addObj: {
        ...this.data.addObj,
        context: e,
      }
    })
  },
  addData() { // 新增数据
    const arr = this.data.addObj.data;
    arr.push("")
    this.setData({
      addObj: {
        ...this.data.addObj,
        data: arr
      }
    })
    console.log(this.data.addObj)
  },
  updateValue(val, { target: { dataset: { index } } }) { // 更新数据
    const arr = this.data.addObj.data;
    arr[index] = val;
    this.setData({
      addObj: {
        ...this.data.addObj,
        data: arr
      }
    })
    console.log(this.data.addObj)
  },
  addsubmit() { // 新增提交
    const { context, type, data, id } = this.data.addObj;
    console.log(context, type, data, id)
    if (this.data.add_update) {
      dd.httpRequest({
        url: "http://123.157.97.116:8093/ks-inspection/sys/ksInspectionBackend/content/add",
        method: "POST",
        headers: {
          unionid: app.globalData.unionid,
          'Content-Type': 'application/json', // 设置请求头为 JSON 格式
        },
        data: JSON.stringify({
          "content": context, //巡查内容
          "type": type.value, //随机类型 0-随机  1-全部
          "data": [...data], //数据
          "sort": 1, //排序
          "rule": 1, //随机规则
          unit: app.globalData.unit.unit
        }),
        success: (res) => {
          console.log(res)
          this.getRecordList()
          this.popupClose()
        }
      })
    } else {
      console.log(app.globalData)
      dd.httpRequest({
        url: "http://123.157.97.116:8093/ks-inspection/sys/ksInspectionBackend/content/update",
        method: "POST",
        headers: {
          unionid: app.globalData.unionid,
          'Content-Type': 'application/json', // 设置请求头为 JSON 格式
        },
        data: JSON.stringify({
          "id": id,
          "content": context, //巡查内容
          "type": type.value, //随机类型 0-随机  1-全部
          "data": [...data], //数据
          "sort": 1, //排序
          "rule": 1, //随机规则
          unit: app.globalData.unit.unit
        }),
        success: (res) => {
          console.log(res)
          this.getRecordList()
          this.popupClose()
        }
      })
    }
  },
  getRecordList() {
    dd.httpRequest({
      url: 'http://123.157.97.116:8093/ks-inspection/sys/ksInspectionBackend/content/query',
      method: 'POST',
      headers: {
        unionid: app.globalData.unionid,
        'Content-Type': 'application/json', // 设置请求头为 JSON 格式
      },
      data: JSON.stringify({
        content: "",
        unit: app.globalData.unit.unit
      }),
      success: (res) => {
        const { data, status, headers } = res;
        console.log(data)
        this.setData({ viewList: data.data })
      },
    })
  }
});
// 柯山消防大队