//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              that.login({
                code: res.code,
                iv: res.iv,
                encryptedData: encodeURIComponent(res.encryptedData),
              })
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
          
        }
      })
    }
  },
  login: function (param) {
    var that = this;
    wx.request({
      url: 'localhost:3000/Index/weixin_login',
      data: param,
      header: {
        'content-type': "application/json",
      },
      success: function (res) {
        var data = JSON.parse(res.data.trim());
        that.unionId = data.unionId;
        wx.setStorageSync('sessionid', data.sessionid);
      }
    })
  },
  globalData:{
    userInfo:null,
    unionId:null,
    BloodFat: null
  }
})