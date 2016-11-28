/**
 * Created by huangrong on 2016/9/23.
 */
var token
$(function(){
	//初始化SDK
	RongIMClient.init("z3v5yqkbvzuv0");
	
	//获取token
	var webSuccess = function(datas){
		var result = datas.data.result;
		var obj = eval('('+result+')');//将JSON字符串转换为JSON对象
		token = obj.token;
		console.log(token);
	}
	
	var userId = "1";//Utils.getLoginUser.userID;
	var userName = "Emma Wallace";//Utils.getLoginUser.username;
	var im_type = 0;
	var service_type = 1;
	var data = {"userId":userId,"userName":userName,"im_type":im_type,"service_type":service_type};
	doPost("/huoban-sales/http/sales/userlogin/userImWeb.do",data,webSuccess);

	
	// 设置连接监听状态 （ status 标识当前连接状态）
	// 连接状态监听器
	 RongIMClient.setConnectionStatusListener({
		    onChanged: function (status) {
		        switch (status) {
		            //链接成功
		            case RongIMLib.ConnectionStatus.CONNECTED:
		                console.log('链接成功');
		                break;
		            //正在链接
		            case RongIMLib.ConnectionStatus.CONNECTING:
		                console.log('正在链接');
		                break;
		            //重新链接
		            case RongIMLib.ConnectionStatus.DISCONNECTED:
		                console.log('断开连接');
		                break;
		            //其他设备登录
		            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
		                console.log('其他设备登录');
		                break;
		              //网络不可用
		            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
		              console.log('网络不可用');
		              break;
		            }
		   }});
	 //消息监听器
	 RongIMClient.setOnReceiveMessageListener({
		    // 接收到的消息
		    onReceived: function (message) {
		        // 判断消息类型
		        switch(message.messageType){
		            case RongIMClient.MessageType.TextMessage:
		                   // 发送的消息内容将会被打印
		                console.log(message.content.content);
		                break;
		            case RongIMClient.MessageType.VoiceMessage:
		                // 对声音进行预加载                
		                // message.content.content 格式为 AMR 格式的 base64 码
		                RongIMLib.RongIMVoice.preLoaded(message.content.content);
		                break;
		            case RongIMClient.MessageType.ImageMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.DiscussionNotificationMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.LocationMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.RichContentMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.DiscussionNotificationMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.InformationNotificationMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.ContactNotificationMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.ProfileNotificationMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.CommandNotificationMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.CommandMessage:
		                // do something...
		                break;
		            case RongIMClient.MessageType.UnknownMessage:
		                // do something...
		                break;
		            default:
		                // 自定义消息
		                // do something...
		        }
		    }
		});
	 
	// 连接融云服务器。
     RongIMClient.connect(token, {
       onSuccess: function(userId) {
         console.log("Login successfully." + userId);
       },
       onTokenIncorrect: function() {
         console.log('token无效');
       },
       onError:function(errorCode){
             var info = '';
             switch (errorCode) {
               case RongIMLib.ErrorCode.TIMEOUT:
                 info = '超时';
                 break;
               case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                 info = '未知错误';
                 break;
               case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                 info = '不可接受的协议版本';
                 break;
               case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                 info = 'appkey不正确';
                 break;
               case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                 info = '服务器不可用';
                 break;
             }
             console.log(errorCode);
           }
     });

     var expression = function(){
    	 //使用默认 Emoji 和图片
    	 RongIMLib.RongIMEmoji.init();
    	 //使用自定义 Emoji 和图片
    	 var emojiFactory = {dataSource:{
             "u1F600":{"en":"grinning","zh":"\u72DE\u7B11","tag":"\uD83D\uDE00","bp":"0px 0px"},
             "u1F601":{"en":"grin","zh":"\u9732\u9F7F\u800C\u7B11","tag":"\uD83D\uDE01","bp":"-22px 0px"},
             "u1F602":{"en":"joy","zh":"\u6B22\u4E50","tag":"\uD83D\uDE02","bp":"-44px 0px"}},
         url:"url路径"};
         RongIMLib.RongIMEmoji.init(emojiFactory);

    	 //获取全部表情
    	 var emojis = RongIMLib.RongIMEmoji.emojis;
    	 //名称转 Emoji
    	 //发送消息使用
    	 var str = RongIMLib.RongIMEmoji.symbolToEmoji("[狞笑][露齿而笑]测试Emoji");
    	 //Emoji 转名称
    	 //会话列表显示最后一条消息使用
    	 var str1 = RongIMLib.RongIMEmoji.emojiToSymbol("😀😁测试 Emoji");
    	 //Emoji 转字 HTML
    	 //接收消息使用
    	 var str2 = RongIMLib.RongIMEmoji.emojiToHTML("😂测试 Emoji");
    	 //名称转字 HTML
    	 var str3 = RongIMLib.RongIMEmoji.symbolToHTML("[露齿而笑]测试 Emoji");
    	 //表情模块兼容 ADM、CMD 等 CommonJS 规范
    	 //表情模块已经兼容 AMD、CMD,使用 requireJs 进行模块加载
    	 require.config({
    		  paths: {
    		    RongIMEmoji : 'http://cdn.ronghub.com/RongEmoji-2.2.3.min'
    		  }
    		});

    		require(['RongIMEmoji'], function() {
    		 //dosomething...
    		});
    		//使用 seaJs 进行模块加载
    		seajs.config({
    			 alias: {
    			   "RongIMEmoji":'http://cdn.ronghub.com/RongEmoji-2.2.3.min.js'
    			  }
    			});

    			seajs.use("RongIMEmoji",function(){
    			  //dosomething...
    			});



     }
})
