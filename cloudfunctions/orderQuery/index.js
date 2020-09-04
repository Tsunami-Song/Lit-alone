    // 云函数入口文件
    const cloud = require('wx-server-sdk')
    wx.cloud.init({
      env: 'xiaogu-ybf3v'

      //配额方案
  })
    const db = cloud.database()
    // 云函数入口函数
    //查询"附近拼单"
    exports.main = async (event, context) => {
      try {
        //order
          return await db.collection('APIKEY').where({
          //下面这3行，为筛选条件
          _id:"1"
        }).get({
          success: function (res) {
            console.log(res)
            return res
          }
        });
      } catch (e) {
        console.error(e);
      }
    }