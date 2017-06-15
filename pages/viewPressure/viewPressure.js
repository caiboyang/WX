var wxCharts = require('../../dist/wxcharts-min.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
    });
  },
  getPreHigh: function () {
    var categories = [];
    var data = [];
    wx.request({
      url: 'https://localhost:9000/BloodPressureHigh',
      data: {
        id: app.globalData.unionId,
      },
      header: {
        'content-type': "application/json",
      },
      success: function (res) {
        var data = JSON.parse(res.data.trim());
        catagories = data.catagories;
        data = data.data;
      }
    })
    return {
      categories: categories,
      data: data
    }
  },
  getPreLow: function () {
    var categories = [];
    var data = [];
    wx.request({
      url: 'https://localhost:9000/BloodPressureLow',
      data: {
        id: app.globalData.unionId,
      },
      header: {
        'content-type': "application/json",
      },
      success: function (res) {
        var data = JSON.parse(res.data.trim());
        catagories = data.catagories;
        data = data.data;
      }
    })
    return {
      categories: categories,
      data: data
    }
  },
  navigateFat: function (e) {
    wx.redirectTo({
      url: '../viewFat/viewFat'
    })
  },
  navigateSugar: function (e) {
    wx.redirectTo({
      url: '../viewSugar/viewSugar'
    })
  },
  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var highData = this.getPreHigh();
    var lowData = this.getPreLow();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: highData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'High',
        data: highData.data,
        format: function (val, name) {
          return val.toFixed(0);
        }
      }, {
        name: 'Low',
        data: lowData.data,
        format: function (val, name) {
          return val.toFixed(0);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'Test Result',
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0
      },
      width: windowWidth,
      height: 400,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  }
});