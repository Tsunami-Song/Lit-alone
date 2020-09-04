//logs.js
      //云初始化
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          traceUser: true,
          env:'xiaogu-ybf3v'
        })
      }
var app = getApp(); 
var util = require('../../utils/util.js')
//var random = Math.ceil((Math.random()*10)/4)

        //查询APIKEY

let _this = this;


Page({
  //定义初始化数据  每当数据发生变化时，会自动触发页面循环
  data: {
    text:"",
    inputValue: '',
    returnValue: '',
    allContentList: [],
    searchinput:'',
    sendInfo: '', 
    userMessage: '' ,
    //key:'',
    key1: "d156535449c341bbbbbafce8138ad4c1", //图灵机器人秘钥1
    key2: "fea14518878948f1b6cb26537f05baa5", //图灵机器人秘钥2
    //key: "d13b441029804ee99fc4e3b617a5f557", //图灵机器人秘钥3
    key4: "1b73bb19d2d249a5932e833547f2c742", //图灵机器人秘钥4
    num:0
  },

  //绑定键盘按下事件，讲输入的值赋给data
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
 
  },
  bindMessage: function(e) { 
    _this.setData({ 
      userMessage: e.detail.value 
    })
 },
 cleanInput: function() { 
    var setMessage = { sendInfo: this.data.userMessage }       
    this.setData(setMessage) 
},
  getInputVal: function(e) {
    _this.setData({
      inputVal: e.detail.value
    })
  },
  //点击发送按钮时触发事件，发送数据给图灵机器人
  pageScrollToBottom: function (e) {
    wx.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
  },
    //失去聚焦(软键盘消失)
    blur: function(e) {
      _this.setData({
        scrollHeight: '100vh',
        inputBottom: 0
      })
      _this.setData({
        toView: 'msg-' + (msgList.length - 1)
      })
  
    },
  focus: function(e) {
    keyHeight = e.detail.height;
    _this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    _this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },
/*
  submitTo:function(e){
    let that = this;
      wx.cloud.callFunction({
        name: 'ContentCheck',
        data: {
          msg: that.data.inputValue
        },
        success(res) {
          console.log(res.result)
          if (res.result.errCode == 87014) {
            wx.showToast({
              title: '文字违规',
            })
          }else{
  
         
 
    //将输入数据追加到列表里面
    //that.pageScrollToBottom(); // 执行第一次滑动 定位到底部
    that.data.allContentList.push({"value": that.data.inputValue});
    //图灵接口
    let _url = `https://www.tuling123.com/openapi/api`;
    //系统封装的请求方法 ，注意这里没有ajajx的说法
    if(that.data.inputValue !==''){
      console.log("Send",that.data.inputValue)
      //console.log('that.data.key'+(random))
      //wx.string_to_name('that.data.key'+(random))
    wx.request({
        url: _url, 
        data:{
            key: that.data.key,
            info: that.data.inputValue 
        },
        //封装返回数据格式
        header: {
            'Content-Type': 'application/json'
        },
        
        //请求成功的回调
        success: function(res) {
          //console.log(data.key)
          let data = res.data;
          if(data.code === 100000){   //100000 表示返回成功
              console.log("Receive:",res.data)
            //将返回值追加到列表
            that.data.allContentList.push({"value": data.text});
            //调用set方法，告诉系统数据已经改变   启动循环，循环聊天信息
            that.setData({
                   returnValue: data.text,
                   //returnValue: '',
                   allContentList: that.data.allContentList,
                   data : ''
               })
               wx.pageScrollTo({
                scrollTop: 2000
              })
              
               //let data = '';
          }
        }
               
          
          
        
      });
    }
    that.setData({
      'inputValue': ''
    })
    //////
                }
            
  
        }
    })
    
    },*/


    submitTo:function(e){
      let that = this;
           

      
      const db = wx.cloud.database()
      db.collection('APIKEY').where({
        _id: '1' // 填入当前用户 openid
      }).get({
        success: function(res) {
          console.log("API：",res.data[0].key)
        this.setdata({
            'key' : res.data[0].key
        })
        }
      })
   
      //将输入数据追加到列表里面
      //that.pageScrollToBottom(); // 执行第一次滑动 定位到底部
      that.data.allContentList.push({"value": that.data.inputValue});
      //图灵接口
      let _url = `https://www.tuling123.com/openapi/api`;
      //系统封装的请求方法 ，注意这里没有ajajx的说法
      if(that.data.inputValue !==''){
        console.log("Send",that.data.inputValue)
        //console.log('that.data.key'+(random))
        //wx.string_to_name('that.data.key'+(random))

      wx.request({
          url: _url, 
          data:{
              key: that.data.key,
              info: that.data.inputValue 
          },
          //封装返回数据格式
          header: {
              'Content-Type': 'application/json'
          },
          
          //请求成功的回调
          success: function(res) {
            //console.log(data.key)
            let data = res.data;
            if(data.code === 100000){   //100000 表示返回成功
                console.log("Receive:",res.data)
              //将返回值追加到列表
              that.data.allContentList.push({"value": data.text});
              //调用set方法，告诉系统数据已经改变   启动循环，循环聊天信息
              that.setData({
                     returnValue: data.text,
                     //returnValue: '',
                     allContentList: that.data.allContentList,
                     data : ''
                 })
                 wx.pageScrollTo({
                  scrollTop: 2000
                })
                
                 //let data = '';
            }
          }
                 
            
            
          
        });
      }
      that.setData({
        'inputValue': ''
      })
      //////
      },
  onLoad: function(){
    //y页面初始化时加载的原始数据
     // 设置标题
     wx.setNavigationBarTitle({
            title: '我在时间尽头等你',
            success:function(){
               // console.log("success")
            },
            fail: function(){
               // console.log("error")
            }
        })
  }

})
