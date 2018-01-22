// pages/aboutme/mycart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartInfo :[],
    check_prj:[],
    chooseAll:false,
    chooseAllBox:false,
    allMoney:0
  },
  /*
  * 点击全选事件
  */
  checkboxChangeChooseAll:function(e){
    this.setData({
      chooseAll: !this.data.chooseAll
    });
    this.getMoneyNow();
  },
  /*
   * 点击复选框按钮触发事件
   * 
   */
  checkboxChange: function (e) {
    var _this = this;
    var chooseAllBox = false;
    var selectPrj = e.detail.value;
   
    if (Object.getOwnPropertyNames(_this.data.cartInfo).length == selectPrj.length){
      chooseAllBox = true;
    };
    this.setData({
      chooseAllBox: chooseAllBox,
      check_prj: selectPrj
    });

    // 触发计算金钱事件
    this.getMoneyNow();
  },
  // 删除购物车商品事件，删除后进行更新本地数据库
  deleteSelectPrj:function(){
    var cartInfo = this.data.cartInfo;
    var check_prj = this.data.check_prj;

    for (var i = 0; i < check_prj.length;i++){
      delete (cartInfo[check_prj[i]]);
      delete (check_prj[i])
    }
    this.setData({
      cartInfo: cartInfo,
      check_prj:check_prj
    })
    this.getMoneyNow();

  },
  // 提交订单，将订单信息存储在本地,包括总金额
  payOffMoney:function(){
    var select_pay = {};
    var cartInfo = this.data.cartInfo;
    var check_prj = this.data.check_prj;

    for (var i = 0; i < check_prj.length; i++) {
      select_pay[check_prj[i]] = cartInfo[check_prj[i]];
    }
    console.log(select_pay);
    wx.setStorage({
      key: 'onPayPrj',
      data: select_pay,
    });
    wx.navigateTo({
      url: 'onOrder',
    })
  },


  // 获取当前金额数量,根据是否进行选中计算金额
  getMoneyNow:function(){
    var allMoney = 0;
    var selectPrj =this.data.check_prj;

    for (var i = 0; i < selectPrj.length; i++) {
      allMoney += (this.data.cartInfo[selectPrj[i]].prj_num) * (this.data.cartInfo[selectPrj[i]].prj_price);
    }
    this.setData({
      allMoney: allMoney
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // 从本地数据库里面获取数据
    wx.getStorage({
      key: 'prjInfo',
      success: function(res) {
        _this.setData({
          cartInfo: res.data
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeNumber:function (e) {
    var _this = this;
    var prjId = e.currentTarget.dataset.prjid;
    console.log(this.data.cartInfo)
    if (e.currentTarget.dataset.changenumber == "dec" && this.data.cartInfo[prjId].prj_num>1){
      this.data.cartInfo[prjId].prj_num = this.data.cartInfo[prjId].prj_num-1 ;
    }else{
      this.data.cartInfo[prjId].prj_num = this.data.cartInfo[prjId].prj_num + 1;
    }
    // 将改变的值重新赋值,并且重新填充到本地数据库
    _this.setData({
      cartInfo: _this.data.cartInfo
    });
    console.log(this.data.cartInfo[prjId])
    wx.clearStorage();
    wx.setStorage({
      key: 'prjInfo',
      data: _this.data.cartInfo,
    })
    this.getMoneyNow();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    console.log(e);
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