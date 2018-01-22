// pages/detail/prjDetail.js
// var mykeyval = require("../component/mykey.js");
// import mykeyval from './../component/mykey'
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */

  data: {
    item: {
    }, 
    curInedx:"0",
    productprop:{
      propname:"尺码",
      propvalue:["s","m","l"]
    },
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    product_id: "prj006",
    prjDetailInfo:{
         name:"这是0001",
         prj_id:"prj002",
         prj_image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
         prj_price:120,
         prj_orlPrice:180,
         prj_descript:"这是0001商品描述",
         prj_offCard:[
           {
             offCard_id:"offCard_id_001",
             offCard_num:50,
             offCard_descript:"该商品满399-50卷",
             offCard_isHad:true
           },
           {
             offCard_id: "offCard_id_002",
             offCard_num: 50,
             offCard_descript: "该商品满399-50卷",
             offCard_isHad: false
           },
           {
             offCard_id: "offCard_id_003",
             offCard_num: 50,
             offCard_descript: "该商品满399-50卷",
             offCard_isHad: true
           },
           {
             offCard_id: "offCard_id_003",
             offCard_num: 50,
             offCard_descript: "该商品满399-50卷",
             offCard_isHad: true
           }
         ],
         prj_prop:[
           {
             prj_prop_name:"size",
             prj_prop_size_price:{
               "250ML":120,
               "450ML":200,
               "1000ML":368
             }
           }
         ]
     },
    animationData:{},
    cardUpSignal:1,
    "cardHeight":0
  },

  changeHtml: function (e) {
    console.log(e.currentTarget.dataset.nurl);
    wx.navigateTo({
      // url: '../logs/logs'
      url: '../' + e.currentTarget.dataset.nurl
    })
  },
  chooseprop:function(e){
    this.setData({
      "curInedx": e.currentTarget.dataset.index
    });
  },
  //添加购物车
  add_shop:function(){
    var _this = this;
    wx.getStorage({
      key: 'prjInfo',
      success: function (res) {
        // 进行判断，如果购物车已经存在，就进行数值变化，如果没有的话，那么添加到本地数据
        if (res.data.hasOwnProperty(_this.data.product_id)){
          res.data[_this.data.product_id].prj_num++;
          var setStorageData = res.data;
          _this.addPrjToStorage('prjInfo', setStorageData);
        }else{
          _this.data.prjDetailInfo['prj_num'] = 1;
          res.data[_this.data.product_id] = _this.data.prjDetailInfo
          var setStorageData = res.data;
          _this.addPrjToStorage('prjInfo', setStorageData);
        }

      },
      fail: function (res) { 
        _this.data.prjDetailInfo['prj_num'] = 1;
        var setStorageData = {};
        setStorageData[_this.data.product_id] = _this.data.prjDetailInfo;

        // 当本地数据为空时候，进行数据的首次添加
        _this.addPrjToStorage('prjInfo', setStorageData);
       },
      complete: function (res) {}
    })
  },
  clickAddCard:function(){

    var _this = this;
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#off_card_warp').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      _this.setData({
        "cardHeight": _this.data.cardUpSignal * res[0].height
      });
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })

      _this.animation = animation

      animation.translateY(_this.data.cardHeight).step()

     _this.setData({
        animationData: animation.export()
      });
    });
    this.setData({
      "cardUpSignal": this.data.cardUpSignal * (-1)
    });
    
  },
  addPrjToStorage:function(key,data){
    wx.setStorage({
      key: 'prjInfo',
      data: data,
      success: function (setStorageRes) {
        if (setStorageRes.errMsg == "setStorage:ok") {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    });
  },
  showMap:function(){
    // 展示地图位置
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
      success: function (res) {
        // var latitude = res.latitude
        // var longitude = res.longitude
        wx.openLocation({
          latitude: 30.189947,
          longitude: 120.187349,
          name: "华业大厦",
          scale: 14
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowWidth:res.windowWidth,
          windowHeight:res.windowHeight
        })
      }
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