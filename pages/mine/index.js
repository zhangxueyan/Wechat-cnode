//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello ! WelCome to WxApp',
    islogin:false,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    var CuserInfo = wx.getStorageSync('CuserInfo');
    if (CuserInfo.accesstoken) {
      that.setData({
         islogin: true 
      });
    }
    that.setData({
      userInfo: CuserInfo
    })
  },
  signIn:function(){
    var that = this;
    var CuserInfo = wx.getStorageSync('CuserInfo');
    if (CuserInfo.accesstoken) {
      that.setData({
        islogin: true
      });
      console.log(CuserInfo)
      that.setData({
        userInfo: CuserInfo
      })
    }else{
      wx.redirectTo({
        url: '../login/index'
      })
    }
  },
  signOut:function(){
    wx.removeStorage({
      key: 'CuserInfo',
      success(res) {
        console.log(res)
      }
    })
    var that = this;
    that.setData({
      userInfo:{},
      islogin: false
    })
  }
})
