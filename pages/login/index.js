//index.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    loading: false,
    accesstoken: "",
    error: "",
    id:'',
    loginname: '',
    avatar_url: ''

  },
  //事件处理函数
  bindKeyInput: function (e) {
    this.setData({
      accesstoken: e.detail.value
    })
    console.log(e)
  },
  isLogin: function () {
    var that = this;
    var accesstoken = that.data.accesstoken;
    var ApiUrl = Api.accesstoken;

    if (accesstoken === "") return;

    that.setData({ loading: true });


    wx.request({
      method: 'POST',
      url: Api.accesstoken+'?accesstoken='+accesstoken,
      success(res) {
        console.log(res)
        var CuserInfo = {
          accesstoken: accesstoken,
          id: res.data.id,
          loginname: res.data.loginname,
          avatar_url: res.data.avatar_url
        };
        wx.setStorageSync('CuserInfo', CuserInfo);
        wx.switchTab({
          url: '/pages/mine/index',
        })
      }
    })
  }



})
