App({
  globalData: {
    unionid: null
  },
  async onLaunch(options) {
    console.log('App onLaunch');
    console.log(this);
    // 进入生命周期
    await dd.httpRequest({ // 获取应用凭证 access_token 
      data: {
        appkey: "dingxfk2battcebh67jg",
        appsecret: "ssSWx2T2ROQ_291eaulpuKMzg3whvikTWFqLAv4WWrSgkt7OzTodxVyW4c_KSU0R"
      },
      method: 'GET',
      url: 'https://oapi.dingtalk.com/gettoken',
      success: (res) => {
        const { headers, data, status } = res;
        dd.setStorage({
          key: 'access_token',
          data: data.access_token,
        });
        console.log(data.access_token, this, "from httpRequest")
      }
    });
    // 存储应用凭证
    const access_token = dd.getStorageSync({ key: 'access_token' }).data;
    console.log(access_token, "from getStorageSync 获取应用凭证")
    let authCode = null
    // 获取免登录授权
    await dd.getAuthCode({
      success: function (res) {
        authCode = res.authCode
      },
    });
    console.log(authCode, "from getAuthCode 获取免登录授权码")
    // 获取用户信息
    await dd.httpRequest({
      data: {
        access_token,
        code: authCode
      },
      method: 'POST',
      url: 'https://oapi.dingtalk.com/topapi/v2/user/getuserinfo',
      success: (res) => {
        const { headers, data, status } = res;
        console.log(res, this.globalData.unionid, "from httpRequest 获取用户信息")
        this.globalData.unionid = data.result.unionid
      }
    })
    // 初始化首页 请求今日巡查
    console.log("请求今日巡查", this.globalData)
    await dd.httpRequest({
      headers: {
        unionid: this.globalData.unionid
      },
      url: 'http://123.157.97.116:8093/ks-inspection/sys/ksInspectionTag/getTodayContent',
      method: 'GET',
      success: (res) => {
        const { data, status, headers } = res;
        console.log(res)
      },
    })
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    console.log("show");
  },
});
