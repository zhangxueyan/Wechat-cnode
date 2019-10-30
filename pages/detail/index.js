var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({
  data: { 
    detail:{},
    collectText: "收藏",
    replies: [], 
    modalHidden: true
  },
  onLoad: function (options) {
    this.fetchData(options.id);
  },
  fetchData:function(id){
    var that = this;
    var ApiUrl = Api.topic + '/' + id + '?mdrender=false';
    Api.fetchGet(ApiUrl, function (err, res) {
      res.create_at = util.getDateDiff(new Date(res.create_at));
      that.setData({
        detail: res,
        replies: that.data.replies.concat(res.data.replies.map(function (item) {
          item.create_at = util.getDateDiff(new Date(item.create_at))
          return item;
        }))
      });
      // console.log(res)
    })
  },

  // 收藏+回复接口不可用
  collect: function (e) {
    var that = this;
    var accesstoken = wx.getStorageSync('CuserInfo').accesstoken;
    var id = e.currentTarget.id;
    if (!id) return;
    if (!accesstoken) {
      that.setData({ 
        modalHidden: false 
      });
      return;
    }
    var ApiUrl = Api.collect + '?accesstoken=' + accesstoken +'&topic_id='+id;
    wx.request({
      url: ApiUrl,
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })

    var ApiUrl = Api.de_collect + '?accesstoken=' + accesstoken + '&topic_id=' + id;
    wx.request({
      url: ApiUrl,
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })




  },
  // 关闭--模态弹窗
  cancelChange: function () {
    this.setData({ modalHidden: true });
  },
  // 确认--模态弹窗
  confirmChange: function () {
    this.setData({ modalHidden: false });
    wx.navigateTo({
      url: '/pages/login/index'
    });
  }
})
