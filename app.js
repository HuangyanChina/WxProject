//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // wx.startRecord();
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.record'])
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {

              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        if (res.code) {
          //发起网络请求
          wx.getUserInfo({
            success:res2 =>{
              // console.log(res.iv);
              wx.request({
                url: 'https://www.zgzhy.cc/signIn',
                method:"post",
                data: {
                  code: res.code,
                  iv: res2.iv,
                  encryptedData: res2.encryptedData
                },
                success:function(res){              
                },
                error:function(){
                  console.log("error")
                }
              })
            }
          })  

          
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });

  },
  //第一种状态的底部  
  editTabBar: function () {
   
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种状态的底部  
  editTabBar2: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  globalData: {
    userInfo: null,
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/img/home.png",
          "selectedIconPath": "/img/home.png",
          "clas": "menu-item",
          "selectedColor": "#4EDF80",
          active: true
        },
        {
          "pagePath": "/pages/logs/logs",
          "text": "日志",
          "iconPath": "/img/note.png",
          "selectedIconPath": "/img/note.png",
          "selectedColor": "#4EDF80",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/pages/test/test",
          "text": "指南",
          "iconPath": "/img/safari.png",
          "selectedColor": "#4EDF80",
          "clas": "menu-item",
          active: false
        }
      ],
      "position": "bottom"
    }

  }
})