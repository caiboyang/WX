// pages/login/login.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  submit: function (e) {
    wx.request({
      url: 'https://localhost:9000/appLogin',
      data: {
        userName: e.detail.value.username,
        password: e.detail.value.password
      },
      header: {
        'content-type': "application/json",
      },
      success: function (res) {
        this.setData({
          tip: ''
        })
        wx.redirectTo({
          url: '../index/index',
        })
      },
      fail: function (res) {
        this.setData({
          tip: '*Invalid username & password combination. Try again',
          userName: '',
          psw: ''
        })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据

    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getStorage({
    /* dummy code, change to request once get business account */
      key: 'unionid',
      success: function (res) {
        wx.redirectTo({
          url: '../index/index'
        })
      },
      fail: function (res) {
        console.log('User not recognized')
      }
    })
  }

  /**
   * 生命周期函数--监听页面初次渲染完成

  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示

  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏

  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载

  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   
  onPullDownRefresh: function () {
  }
  */
})