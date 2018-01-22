var app = getApp(); 
// pages/detail/Default.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    isChooseClass:false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    "listTab":[],
    classfiylist:[
      { name: "分类1",key: "myShow" },
      { name: "分类2", key: "myhair" },
      { name: "分类3", key: "mymouse" },
      { name: "分类4", key: "mynose" },
      { name: "分类1", key: "myShow" },
      { name: "分类2", key: "myhair" },
      { name: "分类3", key: "mymouse" },
      { name: "分类4", key: "mynose" },
    ],
    curIndex: 0,
    curText: null,
    scrollLength: 0

  },
  showClassifyWarp(){
    this.setData({
      isChooseClass: !this.data.isChooseClass
    })
  },
  showseachinput(e){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.zgzhy.cc/', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "listTab": res.data
        });
        that.initData(0)
      }
    })

  },
  //初始化数据
  initData: function (index) {
    this.setData({
      curIndex: index,
      curText: this.data.listTab[index].title,
    });
   
  },
  //tab点击事件，刷新数据
  reflashData: function (event) {
    var that = this;

    var index = event.currentTarget.dataset.index;
    // //移动view位置，改变选中颜色
    this.initData(index)


  },
  lookDetail(event){
    try {
      wx.setStorageSync(
         "detailname",
         event.currentTarget.dataset.index.toString()
      );
    } catch (e) {
      console.log(1)
    }
   

    // wx.navigateTo({
    //   // url: '../logs/logs'
    //   url: './chooseName'
    // })
  },

  lookmore(){

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