//app.js
      //云初始化
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          traceUser: true,
          env:'xiaogu-ybf3v'
        })
      }

App({
  onLaunch: function () {
    var that = this;
    const db = wx.cloud.database()
    db.collection('APIKEY').where({
      _id: '1' // 填入当前用户 openid
    }).get({
      success: function(res) {
        console.log(res.data[0].key)
        let _key = res.data[0].key;
        let that = this;
        ID = res.data[0].key;
        that.globalData.APIK = ID;
        that.setData({
          _key:res.data[0].key
        })
    
    
        
      }
    })
    


    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  
  globalData:{
    userInfo:null,
   // APIa:_key

  }
})