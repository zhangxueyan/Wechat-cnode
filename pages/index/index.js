var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    navList:[
      { id: "all", title: "全部" },
      { id: "good", title: "精华" },
      { id: "share", title: "分享" },
      { id: "ask", title: "问答" },
      { id: "job", title: "招聘" }
    ],
    activeIndex: 0,
    list: [],
    tab:"all",//默认all 
    page: 1,
    limit: 20,
    show:false
    
  },
  //事件处理函数
  onTapTag:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;//点击navItem获取当前索引值
    var tab = e.currentTarget.id; //点击navItem获取当前标签all share...
    that.setData({
      activeIndex:index,
      tab:tab,
      page:1
    })
    that.getData()
  },
  onLoad: function () {
    this.getData();//获取1页前20条数据
  },
  getData:function(){
    var that = this;
    var tab = that.data.tab;
    var page = that.data.page;
    var limit = that.data.limit;
    var ApiUrl = Api.topics+'?tab='+tab+'&page='+page+'&limit='+limit;
    if(page==1){
      that.setData({
        list:[]
      })
    }
    Api.fetchGet(ApiUrl, function (err,res){
      that.setData({
        list: that.data.list.concat(res.data.map(function (item) {
          item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
          return item;
        }))
      })
    })
  },
  //拖拽顶部刷新
  onPullDownRefresh: function () {
    console.log('拖拽顶部刷新', new Date());
    this.getData();//获取1页前20条数据
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },200)
  },
  //滑动到底部
  onReachBottom: function () {
    console.log('滑动底部更多', new Date());
    this.loadMore()
  },
  // 滑动到底部加载更多
  loadMore: function (){
    var that =this;
    that.setData({
      page: that.data.page + 1
    });
    // 显示提示框
    wx.showLoading({ 
      title: '加载中',
      icon: 'loading',
    });
    setTimeout(function () {
      wx.hideLoading()
      that.getData();
    }, 500)
   // 显示提示框ending
  },
  onPageScroll: function (param) {
  //  console.log(param)
  },
  onShareAppMessage: function (){
    return {
      title: '自定义转发标题',
      path: '/page/index/index'
    }
  }
})
