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
      { text: '扫一扫', icon: 'ScanningOutline', showBadge: true, id: 'scan', },
      { text: '付钱/收钱', icon: 'ReceivePaymentOutline', showBadge: false, id: 'pay', },
      { text: '乘车码', icon: 'TransportQRcodeOutline', showBadge: false, id: 'code', },
      { text: '图片', iconImage: 'https://gw.alipayobjects.com/mdn/rms_ce4c6f/afts/img/A*XMCgSYx3f50AAAAAAAAAAABkARQnAQ', showBadge: false, id: 'image', },
    ],
    swipeIndex: -1,
    slotWeakVisible: false,
    visible: false, 
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
  aaa() {
    console.log(1)
    this.setData({ slotWeakVisible: true })
  },
  handleVisibleChange(visible, e) {
    console.log(visible, e);
    this.setData({ visible: true });
  },
  handleTapItem(e, item) {
    console.log(e, item);
    this.setData({ visible: false });
   },
  onLoad() { },
});
