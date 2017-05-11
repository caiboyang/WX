//index.js
//获取应用实例
var app = getApp()

var helloData = {
  name: 'World'
}
Page(
{
  data: helloData,
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../example/example'
    })
  },
  changeName: function (e) {
    // sent data change to view
    // if (helloData.name == 'World'){
    //   this.setData({ 
    //     name : 'WeChat'
    //     })
    //   helloData.name = 'Wechat'
    // }
    // else{
    //   this.setData({
    //     name: 'World'
    //   })
    //   helloData.name = 'World'
    // }
    this.name = this.name == 'Wechat' ? 'World' : 'Wechat'
    this.setData({
      name: this.name})
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})

