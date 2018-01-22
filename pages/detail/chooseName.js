// pages/detail/chooseName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "detailname": "",
    "productJsonArray":[
      {id:"0001",
      prj_name:"产品1",
      prj_price:"130",
      prj_descript:"这是商品一"
      },

      {
        id: "0002",
        prj_name: "产品2",
        prj_price: "110",
        prj_descript: "这是商品二"
      },
      {
        id: "0003",
        prj_name: "产品3",
        prj_price: "140",
        prj_descript: "这是商品三"
      },
      {
        id: "0004",
        prj_name: "产品4",
        prj_price: "130",
        prj_descript: "这是商品四"
      },
      {
        id: "0005",
        prj_name: "产品5",
        prj_price: "130",
        prj_descript: "这是商品五"
      },
      {
        id: "0006",
        prj_name: "产品6",
        prj_price: "130",
        prj_descript: "这是商品六"
      }
    ],
    images :{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this;
    wx.getStorage({
      key: 'detailname',
      success: function(res) {
        //  _this.setData({
        //    "detailname": res.data
        // })
        wx.setNavigationBarTitle({ title:res.data})
      },
    });

    wx.request({
      url: "https://www.zgzhy.cc/productsList?productsId=" + options.id,
      success:function(res){
        _this.setData({
          "productJsonArray":res.data
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
  imageLoad: function (e) {
   
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例

    var viewWidth = e.target.dataset.width,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = e.target.dataset.width / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
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