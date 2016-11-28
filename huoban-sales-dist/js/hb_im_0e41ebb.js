/**
 * Created by lwb on 2016/9/19.
 */
var token;
var sellId;     //卖家id，相当于userId
var author;     //卖家名称，相当于userName
var friendList; //好友列表
var groupList;  //群组列表
var toUserId;   //发送目标，相当于targetId
var groupId;    //群id
var map = {}; // Map map = new HashMap();
var imIndex;  //用来判断点击的是好友还是群组
$(function(){
	
  //根据sellId查询shopId
  var searchShopId = function(datas){
	  	var result = datas.data;
	  	author = result.author;
  }
	  
  sellId = 1;//Utils.getUrlParam("sellId");// Utils.getLoginUser.userID;
  var data = {"sellId":sellId};
  doPost("/huoban-sales/http/sales/userlogin/getSellInfo.do",data,searchShopId);
  
  $('#im-info').perfectScrollbar();
  $('#friend-list').perfectScrollbar();
  $('#chat-list').perfectScrollbar();
  $('#record-list').perfectScrollbar();

  laydate({
    elem: '#record-start-date',
    istime: false, //是否开启时间选择
    isclear: false, //是否显示清空
    istoday: false //是否显示今天

  })

  laydate({
    elem: '#record-end-date',
    istime: false, //是否开启时间选择
    isclear: false, //是否显示清空
    istoday: false //是否显示今天
  })

  $("#left-date-btn").click(function(){
    $("#record-start-date").click();
  })
  $("#right-date-btn").click(function(){
    $("#record-end-date").click();
  })

  $('.collapse').on('show.bs.collapse', function () {
      var index=$('.collapse').index($(this));
      $(".arrow-img").eq(index).attr("src","../images/im_arrow_up.png");
  })
  $('.collapse').on('hide.bs.collapse', function () {
    var index=$('.collapse').index($(this));
    $(".arrow-img").eq(index).attr("src","../images/im_arrow_down.png");
  })

  $(".record-btn").click(function(){
    if(!$(this).hasClass("active")){
      changeStyle(".record-btn",$(this));
    }
  })


  function changeStyle(objClass,obj){
      $(objClass).each(function(index,element){
        if($(element).hasClass("active")){
          $(element).find("img").attr("src",$(element).find("img").attr("src").replace("_checked.png",".png"));
          $(element).removeClass("active");
        }
      });
      $(obj).find("img").attr("src",$(obj).find("img").attr("src").replace(".png","_checked.png"));
      $(obj).addClass("active");
  }


  $("#chat-record").click(function(){

    if($(this).hasClass("active")){
      $("#chat-view").animate({width:"875px"});
      $(this).removeClass("active")
    }else{
      $("#chat-view").animate({width:"524px"});
      $(this).addClass("active");
    }
/*    $('#friend-list').perfectScrollbar("update");
    $('#chat-list').perfectScrollbar("update");
    $('#record-list').perfectScrollbar("update");*/

  })


  //左侧menu
  $(".menu-btn").click(function(){
    if(!$(this).hasClass("active")){
      changeStyle(".menu-btn",$(this));

      changeLeftTab($(".menu-btn").index($(this)));
    }
  });


  
	//初始化SDK
	RongIMClient.init("uwd1c0sxdued1");
	
	//获取token
	var webSuccess = function(datas){
		var result = datas.data.result;
		var obj = eval('('+result+')');//将JSON字符串转换为JSON对象
		token = obj.token;
	}
	var im_type = 0;
	var data = {"userId":sellId,"userName":author,"im_type":im_type};
	doPost("/huoban-sales/http/sales/userlogin/salesImWeb.do",data,webSuccess);

	
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
		            case RongIMClient.MessageType.TextMessage: //文本消息
		                // 发送的消息内容将会被打印
		                console.log(message.content.content);
		                var content = message.content.content;
		                var targetId = message.targetId;
			       		var userContent = '<div class="other-chat">'+
						                  '<img class="user-icon" src="../images/im-user-icon.png">'+
					                      '<span class="left-arrow"></span>'+
					                      '<span class="left-arrow-bg"></span>'+
					                      '<div class="other-chat-info">'+
					                      '<pre>'+content+'</pre>'+
					                      '</div></div>';
			       		if((groupId!=undefined & groupId!=null) || (toUserId!=undefined & toUserId!=null)){
			       			if(groupId==targetId || toUserId==targetId){
			       				$("#chat-list").append(userContent);
			       			}
			       		}
		                break;
		            case RongIMClient.MessageType.VoiceMessage:  //声音消息
		                // 对声音进行预加载                
		                // message.content.content 格式为 AMR 格式的 base64 码
		                //RongIMLib.RongIMVoice.preLoaded(message.content.content);
		                break;
		            case RongIMClient.MessageType.ImageMessage:  //图片消息
		            	var targetId = message.targetId;
		            	var imageUri = message.content.imageUri;
		            	var image = '<div class="other-chat">'+
		            	              '<img class="user-icon" src="../images/im-user-icon.png">'+
		            	              '<span class="left-arrow"></span>'+
		            	              '<span class="left-arrow-bg"></span>'+
		            	              '<div class="other-chat-info">'+
		            	              '<pre><img class="record-img" src="'+imageUri+'"></pre>'+
		            	              '</div></div>';
			       		if((groupId!=undefined & groupId!=null) || (toUserId!=undefined & toUserId!=null)){
			       			if(groupId==targetId || toUserId==targetId){
			       				$("#chat-list").append(image);
			       			}
			       		}
		                break;
		            case RongIMClient.MessageType.DiscussionNotificationMessage: //讨论组通知消息

		                break;
		            case RongIMClient.MessageType.LocationMessage:  //本地消息

		                break;
		            case RongIMClient.MessageType.RichContentMessage: //

		                break;
		            case RongIMClient.MessageType.InformationNotificationMessage:  //信息通知消息

		                break;
		            case RongIMClient.MessageType.ContactNotificationMessage:

		                break;
		            case RongIMClient.MessageType.ProfileNotificationMessage:

		                break;
		            case RongIMClient.MessageType.CommandNotificationMessage: //命令通知消息

		                break;
		            case RongIMClient.MessageType.CommandMessage: //命令消息

		                break;
		            case RongIMClient.MessageType.UnknownMessage: //未知消息

		                break;
		            default:
		                // 自定义消息

		        }
		    }
		});
	 
	// 连接融云服务器
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

   /**
    * targetId:目标Id
    */
   function setMap(targetId){
	   if(targetId!=undefined){
		   map[targetId] = $("#chat-list").html(); //将数据存入map
	   }
   }
   /**
    * targetId:目标Id
    **/
   function getMap(targetId){
	   var record = map[targetId]; //根据key获取value的值
	   if(record!=undefined){
		   $("#chat-list").html(record);//将值写在列表上
	   }else{
		   $("#chat-list").html('');
	   }
   }
   var friendListSuccess = function(datas){
	   var result = datas.data; 
	   //好友列表
	   friendList = result.lui;
	   $("#im_friend").show();
	   $("#im_group").hide();
	   $("#friend-list").empty();
	   $("#chat-list").empty();
	   if(friendList==null){
		   alert("暂无好友");
		   return;
	   }
	   for(var i=0;i<friendList.length;i++){
		   var author = friendList[i].author;
		   if(author==null){
			   author = "";
		   }
		   var id = friendList[i].id;
		   var content = '<div class="friend-item"><div class="item" id="'+id+'">'+
		                 '<img class="friend-icon" src="../images/im-user-icon.png" class="friend-icon">'+
		                 '<div class="item-info"><span class="name">'+author+'</span>'+
		                 '<span class="desc" style="display:none;">哈喽！！</span></div></div><div class="line"></div></div>';
           $("#friend-list").append(content);
	   }
	   //选择好友
	   $(".item").click(function(){
	     if(!$(this).hasClass("active")){
	       $(this).addClass("active");

	    	   toUserId = $(this).attr("id");//get new user id
	    	   getMap(toUserId);
	           
	       $(".item").not($(this)).removeClass("active");
	     }
	   })
   }
   
   var contactsSuccess = function(datas){
	   var result = datas.data;
	   //获取群列表
	   groupList = result.lig;
	   $("#im_group").show();
	   $("#im_friend").hide();
	   $("#im-info").empty();
	   $("#chat-list").empty();
	   if(groupList==null){
		   alert("暂无群组");
		   return;
	   }
	   for(var i=0;i<groupList.length;i++){
		   var groupName = groupList[i].groupName;
		   var id = groupList[i].groupId;
		   var lsi = groupList[i].lsi;
		   var length = lsi.length;
		   var group = '<div class="friend-item">'+
			           '<div class="item" id="'+id+'">'+
			           '<img class="friend-icon" src="../images/im-user-icon.png" class="friend-icon">'+
			           '<div class="item-info">'+
			           '<span class="name">'+groupName+'('+length+')</span>'+
			           '<span class="desc" style="display:none;">哈喽！！</span>'+
			           '</div></div>'+
			           '<div class="line"></div></div>';
		   $("#im-info").append(group); 
	   }
	   
	   //选择好友
	   $(".item").click(function(){
	     if(!$(this).hasClass("active")){
	       $(this).addClass("active");	
	    	   //2.取当前选中toUserId,并取当前toUserId的历史记录显示在对话$("#chat-list")
	    	   groupId = $(this).attr("id");//get new user id
	    	   getMap(groupId);
	       $(".item").not($(this)).removeClass("active");
	     }
	   })
   }
   
  
   //左侧menu  0 最近联系人 1 好友列表 2 群组列表
   function changeLeftTab(index){
	   var data = {"uid":sellId};
	   imIndex = index;
	   if(imIndex==1){
		   doPost("/huoban-sales/http/sales/userlogin/userFriend.do",data,friendListSuccess);
	   }
	   if(imIndex==2){
		   doPost("/huoban-sales/http/sales/userlogin/userFriend.do",data,contactsSuccess);
	   }
   }
   //点击enter键发送消息
   $(document).keydown(function (event) {
	   if (event.keyCode == 13) {
		   $("#sendMessage").click();
	   }
	});
   

   $("#sendMessage").click(function(){
	   if(imIndex==1){ //私聊
		   //发送文字消息
		   var im_text = $("#im_text").val();
		   //定义消息类型,文字消息使用 RongIMLib.TextMessage
		   var msg = new RongIMLib.TextMessage({content:im_text,extra:"附加信息"});
		   //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档  //var msg = RongIMLib.TextMessage.obtain("hello"); 
		   var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
		   var targetId = toUserId; // 目标 Id
		   if(targetId==undefined || targetId==null){
			   alert("请选择好友");
			   return;
		   }
		   RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
			   // 发送消息成功
			   onSuccess: function (message) {
				   //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
				   console.log("发送成功！");
				   $("#im_text").val("");
				   //获取内容
				   var content = message.content.content;
				   if(content==null || content== ""){
					   return;
				   }
				   //获取发送时间 
				   var date = new Date();
				   var now = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
				   var hour = now.substring(11,13); //发送消息的小时
				   var fen = now.substring(14,16);  //发送消息的分钟
				  
				   //获取消息唯一的id
				   var messageId = message.messageId;
				   var contentList = '<div class="my-chat">'+
				   '<div class="my-chat-info">'+
				   '<pre>'+content+'</pre>'+
				   '</div>'+
				   '<span class="right-arrow"></span>'+
				   '<img class="user-icon" src="../images/im-user-icon.png">'+
				   '</div>';
				   $("#chat-list").append(contentList);
				   
				   
				   //让滚动滑到最底下
				   var height = $("#chat-list")[0].scrollHeight; 
				   $("#chat-list").perfectScrollbar('update');
				   $("#chat-list").scrollTop(height);
				   
				   setMap(targetId);//保存到历史消息记录中
			   },
			   onError: function (errorCode,message) {
				   var info = '';
				   switch (errorCode) {
				   case RongIMLib.ErrorCode.TIMEOUT:
					   info = '超时';
					   break;
				   case RongIMLib.ErrorCode.UNKNOWN_ERROR:
					   info = '未知错误';
					   break;
				   case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
					   info = '在黑名单中，无法向对方发送消息';
					   break;
				   case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
					   info = '不在讨论组中';
					   break;
				   case RongIMLib.ErrorCode.NOT_IN_GROUP:
					   info = '不在群组中';
					   break;
				   case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
					   info = '不在聊天室中';
					   break;
				   default :
					   info = x;
				   break;
				   }
				   console.log('发送失败:' + info);
			   }
		   });
	   }
	   if(imIndex==2){	//群聊  
		   //文本消息
		   var im_text = $("#im_text").val();
		   var msg = new RongIMLib.TextMessage({content:im_text,extra:"附加信息"});
		   var conversationtype = RongIMLib.ConversationType.GROUP; // 群聊
		   var targetId = groupId;
		   if(targetId==undefined || targetId==null){
			   alert("请选择群组");
			   return;
		   }
		   RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
	           // 发送消息成功
	           onSuccess: function (message) {
	               //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
				   console.log("发送成功！");
				   $("#im_text").val("");
				   //获取内容
				   var content = message.content.content;
				   if(content==null || content== ""){
					   return;
				   }
				   //获取发送时间
				   var sendTime = message.sentTime;
				   //获取消息唯一的id
				   var messageId = message.messageId;
				   var contentList = '<div class="my-chat">'+
									 '<div class="my-chat-info">'+
									 '<pre>'+content+'</pre>'+
									 '</div>'+
									 '<span class="right-arrow"></span>'+
									 '<img class="user-icon" src="../images/im-user-icon.png">'+
									 '</div>';
				   $("#chat-list").append(contentList);
				   
				   //让滚动滑到最底下
				   var height = $("#chat-list")[0].scrollHeight; 
				   $("#chat-list").perfectScrollbar('update');
				   $("#chat-list").scrollTop(height);
				   
				   setMap(targetId);//保存到历史消息记录中
	           },
	           onError: function (errorCode,message) {
	               var info = '';
	               switch (errorCode) {
	                   case RongIMLib.ErrorCode.TIMEOUT:
	                       info = '超时';
	                       break;
	                   case RongIMLib.ErrorCode.UNKNOWN_ERROR:
	                       info = '未知错误';
	                       break;
	                   case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
	                       info = '在黑名单中，无法向对方发送消息';
	                       break;
	                   case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
	                       info = '不在讨论组中';
	                       break;
	                   case RongIMLib.ErrorCode.NOT_IN_GROUP:
	                       info = '不在群组中';
	                       break;
	                   case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
	                       info = '不在聊天室中';
	                       break;
	                   default :
	                       info = x;
	                       break;
	               }
	               alert('发送失败:' + info);
	           }
	       });
		   }
   });
       
     //点击查看更多消息
     $("#all-chat").click(function(){
    	 $("#chat-list").scrollTop(0);
     });
     
	 $("#biaoqing").click(function(){
		
		//使用默认 Emoji 和图片
		RongIMLib.RongIMEmoji.init();
		
		//获取全部表情
		var emojis = RongIMLib.RongIMEmoji.emojis;

		for(var i = 0;i<emojis.length;i++){
			var bq = emojis[i].children[0];
			var $bq = $(bq).attr("name");
			//名称转化为表情
			var str = RongIMLib.RongIMEmoji.symbolToEmoji($bq);
			console.log(str);
		}
		
//		//名称转 Emoji
//		//发送消息使用(表情)
//		var str = RongIMLib.RongIMEmoji.symbolToEmoji("[狞笑][露齿而笑]测试Emoji");
//		
//		//Emoji 转名称
//		//会话列表显示最后一条消息使用(表情转成对应的字)
//		var str1 = RongIMLib.RongIMEmoji.emojiToSymbol("😀😁测试 Emoji");
//		
//		//Emoji 转字 HTML
//		//接收消息使用(html代码)
//		var str2 = RongIMLib.RongIMEmoji.emojiToHTML("😂测试 Emoji");
//		
//		//名称转字 HTML(html代码)
//		var str3 = RongIMLib.RongIMEmoji.symbolToHTML("[露齿而笑]测试 Emoji");
		
	});
	 
	  var  searchFriendSuccess = function(datas){
		  $("#result-list").empty();
		  var result = datas.data;
		  var length = result.length;
		  changeContentHeight(length);
		  for(var i=0;i<result.length;i++){
			  var author = result[i].author;
			  var authorMobile = result[i].authorMobile;
			  var content = '<div class="result-item">'+
			                '<img src="../images/order_test.png" class="user-icon">'+
			                '<div class="info-view">'+
			                '<span class="user-name">'+author+'('+authorMobile+')</span>'+
			                '<div class="cell mt8">'+
		                    '<span class="title">用户信用:</span>'+
		                    '<div class="star-list">'+
		                    '<img src="../images/star.png">'+
		                    '<img src="../images/star.png">'+
		                    '<img src="../images/star.png">'+
		                    '<img src="../images/star.png">'+
		                    '<img src="../images/half_star.png">'+
		                    '<span class="score">4.9分</span>'+
		                    '</div></div>'+
		                    '<div class="cell mt2">'+
		                    '<span class="title">商家等级:</span>'+
		                    '<img class="shop_icon" src="../images/shop_level_icon.png">'+
		                    '<span class="subtitle"> 7 Lev</span></div></div>'+
			                '<div class="tools-view">'+
			                '<a class="add-btn">加为好友</a>'+
			                '</div></div>';
			  $("#result-list").append(content);
		  }
	  }
   
	 //根据条件查询好友
	 $("#search-btn").click(function(){
		 var accountNo = $("#search-input").val();
		 var data = {"pro":accountNo,"uid":sellId};
		 doPost("/huoban-sales/http/sales/userlogin/searchPerson.do",data,searchFriendSuccess);
	 });
	 
	 //点击添加好友
	 
     changeLeftTab(1);
})
