// pages/aboutme/onOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: "https://www.zgzhy.cc/addressList",
      success:function(res){

        _this.setData({
          myAdrress:res.data
        });
      }
    });
    wx.getStorage({
      key: 'onPayPrj',
      success: function(res) {
        var allMoney = 0;
        console.log(res[i])
        for(var i in res.data){
         
          allMoney+= res.data[i].prj_num * res.data[i].prj_price;
        }
        _this.setData({
          allMoney:allMoney,
          onPayPrj:res.data
        })
      },
    })
  },
  placeOrder:function(){
    wx.getStorage({
      key: 'onPayPrj',
      success: function(res) {
        // 设置已支付订单的本地库
        var hasPayOrder = {};
        hasPayOrder[new Date().getTime()] = res.data
        wx.getStorage({
          key: 'hasPay',
          success: function(success) {
            success.data[new Date().getTime()] = res.data;
            wx.setStorage({
              key: 'hasPay',
              data: success.data,
            });             
          },
          fail:function(fail){

            wx.setStorage({
              key: 'hasPay',
              data: hasPayOrder,
            });            
          }
        })


        wx.getStorage({
          key: 'prjInfo',
          success: function(prjInfo) {
           
            for(var i in prjInfo.data){
              
              for(var j in res.data){
                if(i == j){
                  delete (prjInfo.data[i]);
                }
              }
            }
            // 重新设置购物车
            wx.setStorage({
              key: 'prjInfo',
              data: prjInfo.data,
            }) ;
            // 重新设置购物车
            wx.setStorage({
              key: 'onPayPrj',
              data: prjInfo.data,
            })            
          },
        });        
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})