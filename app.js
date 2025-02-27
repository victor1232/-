App({
  globalData: {
    unionid: null
  },
  eventBus: { // eventBus
    events: {},
    on(eventName, callback) {
      if (!this.events[eventName]) this.events[eventName] = [];
      this.events[eventName].push(callback);
    },
    off(eventName) {
      if (this.events[eventName]) {
        this.events[eventName] = null;
      }
    },
    emit(eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(cb => cb(data));
      }
    }
  },
  async onLaunch(options) {
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
      }
    });
    // 存储应用凭证
    const access_token = dd.getStorageSync({ key: 'access_token' }).data;
    let authCode = null
    await dd.getAuthCode({ // 获取免登录授权
      success: function (res) {
        authCode = res.authCode
      },
    });
    await dd.httpRequest({ // 获取用户信息
      data: {
        access_token,
        code: authCode
      },
      method: 'POST',
      url: 'https://oapi.dingtalk.com/topapi/v2/user/getuserinfo',
      success: (res) => {
        const { headers, data, status } = res;
        this.globalData.unionid = data.result.unionid
        this.eventBus.emit('getUnionid', { data: data.result.unionid });
      }
    })
  }
});
