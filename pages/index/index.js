//index.js
//获取应用实例
const app = getApp();
Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bgHeight:0
  },
  
  onLoad:function(e){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
         that.setData({
           bgHeight:(windowHeight / windowWidth) * 750
         })

      }
    })  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,

        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {

        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  shapOther:function(){
    console.log(1);
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})