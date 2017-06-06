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
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (120 - 80) + 80);
    }
    return {
      categories: categories,
      data: data
    }
  },
  changeChart: function () {
    wx.navigateTo({
      url: '../view/view'
    })
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

    var simulationData = this.createSimulationData();
    var lowData = [];
    for (var i = 0; i < 10; i++) {
      lowData.push(simulationData.data[i]-(Math.random() * 30)-20);
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'High',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(0);
        }
      }, {
        name: 'Low',
        data: lowData,
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