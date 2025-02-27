
Page({
  data: {
    navBarHeight: 60, // 默认高度
    list_show: false,
    select_value: null,
    pageType: 0,
    list: [
      { id: 1, text: "柯山消防大队" },
      { id: 2, text: "龙游消防大队" },
      { id: 3, text: "衢江消防大队" },
      { id: 4, text: "柯城消防大队" },
    ]
  },
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
    this.setlist_show()
  },
  resetRandom() {
    console.log("重新随机生成")
  },
  goPage({ target: { dataset: { page } } }) {
    dd.navigateTo({
      url: `/pages/${page}/${page}`  // url详解请见【路由使用须知】
    })
  },
  onLoad(query) {
    dd.getSystemInfo({
      success: (res) => {
        const navBarHeight = res.statusBarHeight + 44;
        this.setData({ navBarHeight });
        console.log(navBarHeight)
      },
    });

  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
