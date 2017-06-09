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
    /* dummy code, change to request once get business account */
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (15 - 5) + 5);
    }
    return {
      categories: categories,
      data: data
    }
  },
  navigateFat: function(e) {
    wx.redirectTo({
      url: '../viewFat/viewFat'
    })
  },
  navigatePressure: function (e) {
    wx.redirectTo({
      url: '../viewPressure/viewPressure'
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
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'Result 1',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }
      ],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'Test Result',
        format: function (val) {
          return val.toFixed(2);
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