/**
 * Created by lwb on 2016/9/5.
 */
var index;
var updateIndex;
$(function(){

  $(".detail-tab-btn").click(function(){
      if(!$(this).hasClass("active")){
        $(this).addClass("active");
        $(".detail-tab-btn").not($(this)).removeClass("active");
      }
  })

  $(".category_title").on("click",function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".category_title").not($(this)).removeClass("active");
      index=$(".category_title").index($(this));
      if(index==2){
    	 $(".detail-top").attr("style","visibility: visible");
      }else{
    	 $(".detail-top").attr("style","visibility: hidden");
      }
      changeTabForIndex(index);
    }
  });


  //顶部标签切换后执行查询请求
  function changeTabForIndex(index){
	   var data = {"index":index}; 
	   doPost("/huoban-sales",data,searchSuccess); 
  }
  
  //查询成功回调函数
  var searchSuccess = function(datas){
	  $(".detail-list").empty();
	  var result = datas.data;
	  for(var i=0;i<result.length;i++){
		  var pic = result[i].pic;
		  var shopName = result[i].shopName;
		  var title = result[i].productName;
		  var startDate = result[i].starTime;
		  var endDate = result[i].endTime;
		  var content = result[i].content;
		  var status = result[i].status;
		  var address = result[i].address;
		  var releaseTime = result[i].releaseTime;
		  var content1 = '<div class="detail-item" id="'+i+'"><div class="user-icon"><img class="detail-img" src="'+pic+'"></div>'+
		                 '<div class="user-info">'+
		                 '<span class="user-name">'+shopName+'</span>'+
		                 '<span class="user-title">'+productName+'</span>'+
		                 '<span class="vaild-tips">有效期</span>'+
		                 '<span class="vaild-time">'+starTime+' ~ '+endTime+'</span>'+
		                 '<span class="item-desc">'+remark+'</span></div></div>';
          $(".detail-list").append(content1);
          
          if(index==2){
        	  var content2 = '<div class="operating-info">'+
				        	 '<div class="operating-top"><a class="operating-update" data-toggle="modal" data-target="#supply_release_dialog">修改</a><a class="operating-added" data-toggle="modal" data-target="#choose_tips_dialog">上架</a><a class="operating-added" data-toggle="modal" data-target="#choose_tips_dialog">下架</a></div>'+
				        	 '<div class="address-info"><img class="address-icon" src="../images/address-icon.png"><span class="address-tips">'+address+'</span></div>'+
				        	 '<div class="operating-bot"><span class="release-time">'+releaseTime+'</span></div>';
        	  $("div[id='"+i+"']").append(content2);
          }else{
        	  var content2 = '<div class="operating-info">'+
				        	 '<div class="operating-top"><a class="operating-a"><img src="../images/contact-icon.png">联系TA</a><a class="operating-a"><img src="../images/collect-icon.png">收藏店铺</a><a class="operating-a"><img src="../images/collect-icon.png">收藏我有</a></div>'+
				        	 '<div class="address-info"><img class="address-icon" src="../images/address-icon.png"><span class="address-tips">'+address+'</span></div>'+
				        	 '<div class=" "><span class="release-time">'+releaseTime+'</span></div></div>';
        	  $("div[id='"+i+"']").append(content2);
          }
	  }
	  
	  
  }
  
  //时间选择器
  laydate({
	    elem: '#startDate'
  })
	  
  laydate({
    elem: '#endDate'
  })

  //点击发布按钮，获取数据，发送请求
  $("#release_add").on("click",function(){
	  $("#supply_release_dialog").modal("hide");
	  var title = $("#title").val().trim();
	  var startDate = $("#startDate").val().trim();
	  var endDate = $("#endDate").val().trim();
	  var address = $("#place").val().trim();
	  var content = $("#textareContent").val().trim();
	  var data = {"title":title,"startDate":startDate,"endDate":endDate,"place":place,"content":content};
	  doPost("/huoban-sales/",data,releaseSuccess);
  });
  //发布成功回调函数
  var releaseSuccess = function(datas){
	  alert("发布成功");
  }
  
  //点击修改按钮
  $(".operating-update").on("click",function(){
	 updateIndex = $(".operating-update").index($(this));//所点修改按钮的位置
	 var data = {};
	 doPost("",data,updateSuccess);
  });
  
  var updateSuccess = function(datas){
	  var result = datas.data;
	  var title = result[updateIndex].title;
	  var startDate = result[updateIndex].startDate;
	  var endDate = result[updateIndex].endDate;
	  var address = result[updateIndex].address;
	  var content = result[updateIndex].content;
	  $("#title").val(title);
	  $("#startDate").val(startDate);
	  $("#endDate").val(endDate);
	  $("#place").val(address);
	  $("#textareContent").val(content);
  }
  
  
})
