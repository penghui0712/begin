/**
 * Created by lwb on 2016/9/6.
 */
$(function(){

  $(".tab-item").click(function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".tab-item").not($(this)).removeClass("active");
    }
  });
  
  //加载页面发送查询请求（商家信息）
  var data = {};
  doPost("",data,searchSuccess);
  
  var searchSuccess = function(datas){
	  var shopId = 1;//Utils.getLoginUser().userID;
	  var data = {"shopId":shopId};
	  doPost("/huoban-sales/http/sales/function/order/",data,searchOrderSuccess);
	  var result = datas.data;
	  for(var i=0;i<result.length;i++){
		 var pic = result[i].pic;
		 var busName = result[i].busName;
		 var name = result[i].name;
		 var address = result[i].address;
		 var busType = result[i].busType;
		 var project = result[i].project;
		 var company = result[i].company;
		 var email = result[i].email;
		 var telephone = result[i].telephone;
		 var busInfo = '<div class="detail-info"><div class="detail-cell">'+
		               '<img class="detail-icon" src="'+pic+'">'+
		               '<div class="user-info">'+
		               '<a class="user-info-a"><span class="name">'+busName+'</span><img class="" src="../images/contact-icon.png"></a>'+
		               '<img class="user-icon" src="../images/user_ico.png"><span class="user-name">'+name+'</span>'+
		               '<img class="address-icon" src="../images/address-icon.png"><span class="user-address">'+address+'</span>'+
		               '<span class="type"><span class="left_arrow"></span>'+busType+'</span></div></div>'+
		               '<span class="desc">'+project+'</span>'+
		               '<div class="company-info"><span class="title">公司 </span><span class="subtitle">'+company+'</span></div>'+
		               '<div class="mail-info"><span class="title">邮箱 </span><span class="subtitle">'+email+'</span></div>'+
		               '<div class="phone-info"><span class="title">电话 </span><span class="subtitle">'+telephone+'</span></div></div> ';
		 $(".detail-left").append(busInfo);
	  }  
  }
  
  var searchOrderSuccess = function(datas){
	  var data = datas.data;
	  for(var i=0;i<data.length;i++){
		  var orderNo = data[i].orderNo;
		  var createTime = data[i].createTime;
		  var userName = data[i].userName;
		  var productPic = data[i].productPic;
		  var productName = data[i].productName;
		  var buyPrice = data[i].buyPrice;
		  var count = data[i].count;
		  var allPrice = buyPrice*count;
		  var userRemark = data[i].userRemark;

		  var orderInfo = '<div class="order-head">'+
		                  '<span class="head-title ml8">订单号：'+orderNo+'</span>'+
		                  '<span class="head-title ml50">下单时间：'+createTime+'</span>'+
		                  '<span class="head-title ml45">买家：'+userName+'</span></div>'+
		                  '<div class="order-item-info">'+
		                  '<img class="order-item-img" src="'+productPic+'">'+
		                  '<div class="order-info">'+
		                  '<span class="title">'+productName+'</span>'+
		                  '<span class="order-price">¥'+buyPrice+'</span>'+
		                  '<span class="order-count">'+count+'</span>'+
		                  '<span class="order-total">¥'+allPrice+'</span>'+
		                  '<a class="order-detail-a">订单详情</a>'+
		                  '<div class="order-remark"><span class="tips">买家备注</span><span class="remark-detail">'+userRemark+'</span></div></div></div>';
		  $(".order-list").append(orderInfo);
	  }
  }
  
})
