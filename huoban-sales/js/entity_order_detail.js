/**
 * Created by lwb on 2016/8/10.
 */
var addressData;
var result;
$(function(){

  <!--fs 下单状态   ss 付款状态  ts 卖家发货 fths 完成-->
  function checkStatus(cn){
    $(".sm_detail_v").addClass(cn);
  }
  
   var orderSuccess = function(datas){
		   addressData = datas.data;
   }

   //实物订单查询成功回调函数
   var searchSuccess = function(datas){
	  doPost("/huoban-sales/http/sales/function/order/getOrderAddress.do",data,orderSuccess);
	  $(".order_staus_tips_v").empty();
	  $(".seller_v").empty();
	  $(".order_list_v").empty();
	  result = datas.data;
	  var orderNo = result.orderNo;
	  if(orderNo==null){
		  orderNo="";
	  }
	  var productName = result.productName;
	  if(productName==null){
		  productName="";
	  }
	  var count = result.count;
	  if(count==null){
		  count=0;
	  }
	  var buyPrice = result.buyPrice;
	  if(buyPrice==null){
		  buyPrice=0;
	  }
	  var createTime = result.createTime;
	  if(createTime==null){
		  createTime="";
	  }
	  var updateTime = result.updateTime;
	  if(updateTime==null){
		  updateTime="";
	  }
	  var remark = result.remark;
	  if(remark==null){
		  remark="";
	  }
	  var productPropertys = result.productPropertys;
	  var userId = result.userId;
	  if(userId==null){
		  userId="";
	  }
	  var freStatus = result.freStatus; 
	  var productPic = result.productPic;
	  var pay_time = result.pay_time;
	  if(pay_time==null){
		  pay_time="";
	  }
	  var userRemark = result.userRemark;
	  if(userRemark==null){
		  userRemark="";
	  }
	  var info_size = result.info_size;
	  if(info_size==null){
		  info_size="";
	  }
	  var takeName = addressData.takeName;
	  if(takeName==null){
		  takeName="";
	  }
	  var takeMobile = addressData.takeMobile;
	  if(takeMobile==null){
		  takeMobile="";
	  }
	  var status = addressData.status;
	  var price = buyPrice*count;
	  if(status==0){ //下单
		  checkStatus("fs");
		  $(".rstatus_4").remove();
          var four1 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
                      '<span class="subtitle">买家下单</span></div>';
          $(".transaction_tips").append(four1);
          var turn = "无";
	  }
	  if(status==1){ //买家付款
		  if(freStatus==1){//已发货
			  checkStatus("ts");
			  $(".rstatus_4").remove();
	          var four2 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
	                      '<span class="subtitle">卖家发货</div>';
	          $(".transaction_tips").append(four2);
	          var turn = "无";
		  }else{ //未发货
			  checkStatus("ss");
			  $(".rstatus_4").remove();
			  var four2 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
			  '<span class="subtitle">买家付款</span><a class="fh" data-toggle="modal" data-target="#delivery_dialog">发货</a></div>';
			  $(".transaction_tips").append(four2);
			  var turn = "无";
		  } 
	  }
	  if(status==2){ //卖家发货
		  checkStatus("ts");  
		  $(".rstatus_4").remove();
          var four3 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
                      '<span class="subtitle">卖家发货</span></div>';
          $(".transaction_tips").append(four3);
          var turn = "无";
	  }
	  if(status==3 || status==4){ //交易完成或交易关闭
		  checkStatus("fths");  
		  $(".rstatus_4").remove();
          var four4 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
                      '<span class="subtitle">交易完成</span></div>';
          $(".transaction_tips").append(four4);
          var turn = "无";
	  }
	  if(status==99){
		  checkStatus("ts");  
		  $(".rstatus_4").remove();
          var four3 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
                      '<span class="subtitle">卖家发货</span></div>';
          $(".transaction_tips").append(four3);
		  var turn = "退款";
	  }
	  if(status==98){
		  checkStatus("ts");  
		  $(".rstatus_4").remove();
          var four3 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
                      '<span class="subtitle">卖家发货</span></div>';
          $(".transaction_tips").append(four3);
		  var turn = "退货";
	  }
	  if(status==100){
		  checkStatus("ts");
		  $(".rstatus_4").remove();
          var four3 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
                      '<span class="subtitle">卖家发货</span></div>';
          $(".transaction_tips").append(four3);
          var turn = "无";
	  }
	  
	  var first = '<div class="fstatus"><span class="time">'+createTime+'</span><span>买家下单</span></div>'+
	              '<div class="sstatus"><span class="time">'+pay_time+'</span><span>买家付款</span></div>'+
	              '<div class="tstatus"><span class="time">'+updateTime+'</span><span>卖家发货</span></div>'+
	              '<div class="fthstatus"><span class="time"></span><span>交易完成</span></div>';
	  $(".order_staus_tips_v").append(first);
 
	  var second = '<div class="seller_bar"><span class="title">买家ID:'+userId+'</span><img class="number_ico" src="../images/number_icon.png"><span class="subtitle">'+orderNo+'</span></div>'+
	               '<div class="seller_detail_v"><img class="seller_ico" src="../images/seller_icon.png"><img class="tuan" src="../images/tuan_ico.png">'+
	               '<div style="clear: both"></div><span class="user_tips">联系人信息</span><div class="user_info_v">'+
	               '<div class="fcell"><img class="user_ico" src="../images/user_name_ico.png"><span>'+takeName+'</span></div>'+
	               '<div class="scell"><img class="phone_ico" src="../images/phone_ico.png"><span>'+takeMobile+'</span></div></div>'+
	               '<div class="remark_v"><div class="cell"><span class="btitle">买家备注：</span><span>'+userRemark+'</span></div>'+
	               '<div class="cell"><span class="rtitle">商家备注：</span><span>'+remark+'</span></div></div></div>';
	  $(".seller_v").append(second);
	  
	  var third = '<div class="order_bar"><span class="sp_1">产品名称</span><span class="sp_2">属性</span><span class="sp_3">退款／货状态</span><span class="sp_4">单价</span>'+
	              '<span class="sp_5">数量</span><span class="sp_6" style="display:none">优惠</span><span class="sp_7">商品总价</span></div>'+
	              '<div class="order_list"><div class="order_item_v"><div class="order_item"><div class="item_cell_1"><img class="item_icon" src="'+productPic+'">'+
	              '<span class="title">'+productName+'</span></div><div class="item_cell_2"><span class="title">'+info_size+'</span></div><div class="item_cell_3">'+
	              '<span class="title">'+turn+'</span></div><div class="item_cell_4"><span class="title">¥'+buyPrice+'</span></div><div class="item_cell_5"><span class="title">'+count+'</span></div>'+
	              '<div class="item_cell_6" style="display:none"><span class="title">0</span></div><div class="item_cell_7"><span class="title">¥'+price+'</span></div></div></div></div>'+
	              '<div class="bot_total_v"><span class="total_count">一共：'+count+'件商品</span><span class="total_tips">总价:</span><span class="total_price">¥'+price+'</span></div>';
	  $(".order_list_v").append(third);
   }
  
  
   //页面加载发送查询请求
   var id = Utils.getUrlParam("id");
   var orderNo = Utils.getUrlParam("orderNo");
   var data = {"id":id,"orderNo":orderNo};
   doPost("/huoban-sales/http/sales/function/order/productDetail.do",data,searchSuccess);
   
   
   var deliverSuccess = function(datas){
	    var orderNo = result.orderNo;
	    if(orderNo==null){
	    	orderNo="";
	    }
	    var productName = result.productName;
	    if(productName==null){
	    	productName="";
	    }
	    var count = result.count;
	    if(count==null){
	    	count=0;
	    }
	    var buyPrice = result.buyPrice;
	    if(buyPrice==null){
	    	buyPrice=0;
	    }
	    var createTime = result.createTime;
	    if(createTime==null){
	    	createTime="";
	    }
	    var updateTime = result.updateTime;
	    if(updateTime==null){
	    	updateTime="";
	    }
	    var remark = result.remark;
	    if(remark==null){
	    	remark="";
	    }
	    var productPropertys = result.productPropertys;
	    var userId = result.userId;
	    if(userId==null){
	    	userId="";
	    }
	    var userRemark = result.userRemark;
	    if(userRemark==null){
	    	userRemark="";
	    }
	    var productPic = result.productPic;
	    var pay_time = result.pay_time;
	    if(pay_time==null){
	    	pay_time="";
	    }
	    var takeName = addressData.takeName;
	    if(takeName==null){
	    	takeName="";
	    }
	    var takeMobile = addressData.takeMobile;
	    if(takeMobile==null){
	    	takeMobile="";
	    }
	    var takeProvince = addressData.takeProvince;
	    if(takeProvince==null){
	    	takeProvince="";
	    }
	    var takeCity = addressData.takeCity;
	    if(takeCity==null){
	    	takeCity="";
	    }
	    var takeArea = addressData.takeArea;
	    if(takeArea==null){
	    	takeArea="";
	    }
	    var takeAddress = addressData.takeAddress;
	    if(takeAddress==null){
	    	takeAddress="";
	    }
	    var status = addressData.status;
	    var price = buyPrice*count;
	   	$(".delivery_dialog").empty();
		var first = '<div class="user_info_v"><div class="top_tips"><span class="left_line"></span><span class="title">收货信息</span></div>'+
	                '<div class="user_top_cell"><span class="cell_tips">收货人：</span><span class="cell_value">'+takeName+'</span></div>'+
	                '<div class="user_cells"><span class="cell_tips">手机号：</span><span class="cell_value">'+takeMobile+'</span></div>'+
	                '<div class="user_cells"><span class="cell_tips">收货地址：</span><span class="cell_value">'+takeProvince+' '+takeCity+' '+takeArea+' '+takeAddress+'</span></div>'+
	                '<div class="user_cells"><span class="cell_tips">买家备注：</span><span class="cell_value">'+userRemark+'</span></div>'+
	                '<div class="user_cells"><span class="cell_tips">商家备注：</span><span class="cell_value">'+remark+'</span></div></div>';
	   $(".delivery_dialog").append(first);
	   
	   var second = '<div class="order_info_v"><div class="order_top_v"><span class="title">订单号：'+orderNo+'</span>'+
	                '<span class="subtitle">下单时间：'+createTime+'</span></div><div class="order_list"><div class="order_item">'+
	                '<img class="order_img" src="../images/order_test.png"><div class="order_detail_c1"><span class="title">'+productName+'</span>'+
	                '</div><div class="order_detail_c2">'+
	                '<span class="price">¥'+buyPrice+'</span><span class="count">'+count+'</span><span class="total">¥'+price+'</span></div><div style="clear: both"></div>'+
	                '<div class="order_special"><span class="left_arrow"></span></div>'+
	                '<div style="clear: both"></div></div></div></div>';
	   $(".delivery_dialog").append(second);
	   
	   var third = '<div class="shipment_info_v"><div class="shipment_list"><div class="shipment_item"><select><option>顺丰速递</option></select>'+
	               '<div class="shipment_detail_v"><span class="title">快递单号</span><input class="input" type="text"></div><a class="add">＋</a></div></div></div>';
	   $(".delivery_dialog").append(third);
	   
	   var four = '<div class="shipment_bot_v"><a class="pro_cancel" data-dismiss="modal">取消</a><a class="pro_add" id="'+id+'">发货</a></div>';
	   $(".delivery_dialog").append(four);
	   
	   
       //点击发货发送修改请求
       $('#'+id).unbind().bind("click",function(){
    	   var freNo = [];
    	   var input = $(".input");
    	   for(var i =0,len = input.length;i< len;i++){
    		   var everyInput = input[i].value;
    		   if(everyInput!=""){
        		   freNo.push(everyInput); 
    		   }
    	   }
    	   if(freNo.length>0){ 
    		   var id = Utils.getUrlParam("id");
    		   var freNum = freNo.join(",");
    		   var data = {"id":id,"freStatus":1,"freNo":freNum};
    		   doPost("/huoban-sales/http/sales/function/order/updateOrder.do",data,deliveryUpdateSuccess);
    	   }else{
    		   alert("请输入快递单号！");
    	   }

       });
       
       $(".add").on("click",function(){
    	    createShipmentElement();
        });

	   $(".del").on("click",function(){
	     console.log($(this))
	     delShipmentElement($(this));
	   });
   }
    
   
   //点击发货发送查询请求
   $(".fh").on("click",function(){
	   var orderNo = Utils.getUrlParam("orderNo");
	   var data = {"orderNo":orderNo};
	   doPost("/huoban-sales/http/sales/function/order/getOrderAddress.do",data,deliverSuccess);
   });
   
   //发货成功回调函数
	var deliveryUpdateSuccess = function(datas){
		$("#delivery_dialog").modal("hide");
		alert("发货成功！");
		window.location.reload();
	}
	
  function delShipmentElement(obj){
	    $(obj).parent().remove();
  }

  function createShipmentElement(){
	    var a='<div class="shipment_item"><select><option>顺丰速递</option></select><div class="shipment_detail_v"><span class="title">快递单号</span><input class="input" type="text"></div><a class="del">－</a><a class="add">＋</a></div>';
	    $(".shipment_list").append(a);
	    $(".add").unbind().bind("click",function(){
	      createShipmentElement()
	    });
	    $(".del").unbind().bind("click",function(){
	      delShipmentElement($(this))
	    });
  }
   
})
