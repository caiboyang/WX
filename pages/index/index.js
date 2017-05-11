//index.js
//获取应用实例
var app = getApp()

// var helloData = {
//   name: 'World'
// }
Page(
{
  data: {
    userGender: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../example/example'
    })
  },
  changeName: function(){
    wx.navigateTo({
      url: '../Add/index',
    })
  },
  // changeName: function (e) {
  //   // sent data change to view
  //   // if (helloData.name == 'World'){
  //   //   this.setData({ 
  //   //     name : 'WeChat'
  //   //     })
  //   //   helloData.name = 'Wechat'
  //   // }
  //   // else{
  //   //   this.setData({
  //   //     name: 'World'
  //   //   })
  //   //   helloData.name = 'World'
  //   // }
  //   this.name = this.name == 'Wechat' ? 'World' : 'Wechat'
  //   this.setData({
  //     name: this.name})
  // },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      if (userInfo.gender == 1){
        that.setData({
          userGender: 'Male'
        })
      }
      else if (userInfo.gender == 2)
      {
        that.setData({
          userGender: 'Female'
        })
      }
      else{
        that.setData({
          userGender: ''
        })
      }
    })
  }
})

