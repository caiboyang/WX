var wxCharts = require('../../dist/wxcharts-min.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
    chartTitle : 'Blood Sugar Record',
    curChart : 0
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec'
    });
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
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
  /*updateData: function () {
    var simulationData = this.createSimulationData();
    var series = [{
      name: 'Result 1',
      data: simulationData.data,
      format: function (val, name) {
        return val.toFixed(2);
      }
    }];
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    });
  },*/
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
      }, {
        name: 'Result 2',
        data: [11, 24, 29, 15, null, 21, 32, 23, 45, 21],
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
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