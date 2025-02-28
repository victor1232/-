
const app = getApp();
Page({
  data: {
    navBarHeight: 60, // 默认高度
    list_show: false,
    select_value: null,
    pageType: 0,
    list: [],
    cardList: []
  },
  // 生命周期
  onLoad(query) {
    // 获取navbar高度
    dd.getSystemInfo({
      success: (res) => {
        const navBarHeight = res.statusBarHeight + 44;
        this.setData({ navBarHeight });
        console.log(navBarHeight)
      },
    });
  },
  onReady() {
    // 初始化首页 请求今日巡查
    app.eventBus.on('getUnionid', this.getUnionid());
    app.eventBus.on('getUnionid', this.getUnitList());
  },
  onUnload() {
    // 页面被关闭
    app.eventBus.off('getUnionid');
  },
  onShow() {
    this.getUnitList()
  },
  // 方法
  setlist_show() { // 开启/关闭单位选择列表
    console.log(this.data.list_show)
    this.setData({ list_show: !this.data.list_show })
  },
  setPageType({ target: { dataset: { type } } }) { // 设置首页组件展示
    this.setData({ pageType: type })
  },
  setSelectValue(e) { // 选择单位
    console.log(e.target.dataset.data)
    const data = e.target.dataset.data
    this.setData({ select_value: data })
    app.globalData.unit = data
    this.setlist_show()
    console.log(app)

  },
  goPage({ target: { dataset: { page } } }) {
    if (!app.globalData.unit) return dd.alert({ title: '请选择单位', buttonText: '确认' })
    dd.navigateTo({
      url: `/pages/${page}/${page}`  // url详解请见【路由使用须知】
    })
  },
  getUnionid() { // 获取首页巡检内容
    return ({ data }) => {
      dd.httpRequest({
        headers: {
          unionid: data
        },
        url: 'http://123.157.97.116:8093/ks-inspection/sys/ksInspectionTag/getTodayContent',
        method: 'GET',
        success: (res) => {
          const { data, status, headers } = res;
          this.setData({ cardList: data.data })
        },
      })
    }
  },
  resetRandom() { // 重新生成今日巡查内容
    console.log("重新随机生成")
    if (!app.globalData.unit) return dd.alert({ title: '请选择单位', buttonText: '确认' })
    dd.httpRequest({
      url: 'http://123.157.97.116:8093/ks-inspection/sys/ksInspectionTag/reGetTodayContent',
      method: 'GET',
      data: {
        unit: app.globalData.unit.unit
      },
      success: (res) => {
        const { data, status, headers } = res;
        this.setData({ cardList: data.data })
      },
    })
  },
  getUnitList() {
    return ({ data }) => {
      dd.httpRequest({
        url: "http://123.157.97.116:8093/ks-inspection/sys/ksInspectionTag/getUnit",
        headers: { unionid: data },
        success: (res) => {
          console.log(res, this)
          this.setData({ list: res.data.data })
        }
      })
    }
  }
});
