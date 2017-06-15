// addRecord.js

var API_URL = 'localhost:8080';

Page({

  data: {

  },

  onLoad: function () {

  },

  onShow: function () {
  },
  uploadData: function (e) {
    
    wx.request({
      url: 'https://localhost:9000/uplload',
      data: {
        fat : e.detail.value.BFat,
        sugar : e.detail.value.BSugar,
        high: e.detail.value.PreHigh,
        low : e.detail.value.PreLow
      },
      header: {
        'content-type': "application/json",
      },
      fail: function (res) {
        wx.showToast({
          title: 'Failed upload data',
        });
      }
    })
    wx.navigateBack({
      delta: 1,
      })
    },

})