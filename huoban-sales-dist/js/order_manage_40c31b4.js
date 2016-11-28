/**
 * Created by lwb on 2016/8/4.
 */
var orderId;
var result;
var deveryIndex;
var deliveryId;
var status;
var shopId;
$(function(){
	  //根据sellId查询shopId
	  var searchShopId = function(datas){
		  	var result = datas.data;
		  	shopId = result.shopId;
	  }
		  
	  var sellId = 1;// Utils.getLoginUser.userID;
	  var data = {"sellId":sellId};
	  doPost("/huoban-sales/http/sales/userlogin/getSellInfo.do",data,searchShopId);
	
	
  $(".category_title").on("click",function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".category_title").not($(this)).removeClass("active");
      var index=$(".category_title").index($(this));
      changeTabForIndex(index);
    }

  });

  //顶部标签切换后执行
  function changeTabForIndex(index){
	   status = index-2;
	   var data = {"status":status,"shopId":1}; 
	   doPost("/huoban-sales/http/sales/function/order/sellInfoOrderList.do",data,searchSuccess); 
  }

  laydate({
    elem: '#order_range_before'
  })

  laydate({
    elem: '#order_range_after'
  })

  laydate({
    elem: '#order_pay_before'
  })

  laydate({
    elem: '#order_pay_after'
  })

/*
  laydate({
    elem: '#startDate'
  })

  laydate({
    elem: '#endDate'
  })
*/


   //发货成功回调函数
   function deliverySuccess(){
	    $("#delivery_dialog").modal("hide");
	    $("#success_dialog").modal("show");
	    var f=function(){
	    	$("#success_dialog").modal("hide");
	    	window.location.reload();
	    }
	    setTimeout(f,1000);
	    
   }
//   $('#delivery_dialog').on('hidden.bs.modal', function () {
//	     $("#success_dialog").modal("show");
//	     var f=function(){
//	       $("#success_dialog").modal("hide");
//	     }
//	     setTimeout(f,2000);
//   });


  
  //查询订单成功回调函数
  var  searchSuccess = function(datas){	  
	  $(".order_list").empty();
	  result = datas.data;
	  for(var i=0;i<result.length;i++){
		  var orderNo = result[i].orderNo;
		  if(orderNo==null){
			  orderNo = "";
		  }
		  var remark = result[i].remark;
		  if(remark==null){
			  remark="";
		  }
		  var createTime = result[i].createTime;
		  if(createTime==null){
			  createTime="";
		  }
		  var productName = result[i].productName;
		  if(productName==null){
			  productName="";
		  }
		  var count = result[i].count;
		  if(count==null){
			  count=0; 
		  }
		  var buyPrice = result[i].buyPrice;
		  if(buyPrice==null){
			  buyPrice=0;
		  }
		  var productPropertys = result[i].productPropertys;
		  var userId = result[i].userId;
		  if(userId==null){
			  userId="";
		  }
		  var userName = result[i].userName;
		  if(userName==null){
			  userName="";
		  }
		  var userRemark = result[i].userRemark;
		  if(userRemark==null){
			  userRemark="";
		  }
		  var freStatus = result[i].freStatus;
		  if(freStatus==null){
			  freStatus="";
		  }
		  var productId = result[i].productId;
		  if(productId==null){
			  productId="";
		  }
		  var productPic = result[i].productPic;
		  if(productPic==null){
			  productPic="";
		  }
		  var id = result[i].id;
		  var isGood = result[i].isGood;
		  if(isGood==null){
			  isGood="";  
		  }
		  var price = buyPrice*count;
		  if(price==null){
			  price="";
		  }
		  var orderList = '<div class="order_item_detail" name="'+id+'"><div class="order_top">'+
                          '<span class="order_id">订单号：'+orderNo+'</span><span class="order_time">下单时间:'+createTime+'</span>'+
                          '<span class="order_buy">买家：'+userName+'</span><div class="bz dropdown">'+
                          '<a class="remark_b" data-toggle="dropdown">我的备注</a><div class="dropdown-menu remark_drop">'+
                          '<span class="up_arrow"></span><span class="up_arrow_bg"></span><div class="drop_v">'+
                          '<span class="dtitle">我的备注</span><span class="dcontent">'+remark+'</span>'+
                          '<a class="dupdate" data-toggle="modal" data-target="#update_remark_dialog">修改</a><a class="dclose">关闭</a>'+
                          '</div></div></div></div></div>';
		  $(".order_list").append(orderList);
		  var productList = '<div class="order_item_list"><div class="order_item"><img class="order_img" src="'+productPic+'"><div class="order_detail_c1">'+
				            '<span class="title">'+productName+'</span></div><div class="order_detail_c2">'+
				            '<span class="price">¥'+buyPrice+'</span><span class="count">'+count+'</span><span class="total">¥'+price+'</span></div>'+
				            '<div class="order_detail_c3" name="order'+id+'"></div><div class="order_detail_c4" name="devery'+id+'">'+
				            '</div><div style="clear: both"></div>'+
				            '<div class="order_special"><span class="left_arrow"></span></div>'+
				            '<div style="clear: both"></div></div></div>'+
				            '<div class="order_bot"><span class="title">买家备注</span><span class="subtitle">'+userRemark+'</span></div>';
          $("div[name='"+id+"']").append(productList);
          
          if(isGood==0){//实物订单        
        	  if(freStatus==1){//已发货
    			  var entity = '<span class="order_status">交易未完成</span><a class="order_detail_btn" href="entity_order_detail.html?orderNo='+orderNo+'&id='+id+'">'+
                               '订单详情</a><span class="order_wl">查看物流</span>';
                  $("div[name='order"+id+"']").append(entity); 
        		  var devEntity = '<a class="order_pay" data-toggle="modal" data-target="#delivery_dialog" style="display:none">发货</a>';
        		  $("div[name='devery"+id+"']").prepend(devEntity);
        	  }else if(freStatus==0){//未发货
    			  var entity = '<span class="order_status">待卖家发货</span><a class="order_detail_btn" href="entity_order_detail.html?orderNo='+orderNo+'&id='+id+'">'+
    			               '订单详情</a><span class="order_wl">查看物流</span>';
    			  $("div[name='order"+id+"']").append(entity); 
    			  var devEntity = '<a class="order_pay" data-toggle="modal" data-target="#delivery_dialog">发货</a>';
    			  $("div[name='devery"+id+"']").prepend(devEntity);
        	 }else{ //未支付
	   			  var entity = '<span class="order_status">待买家付款</span><a class="order_detail_btn" href="entity_order_detail.html?orderNo='+orderNo+'&id='+id+'">'+
				               '订单详情</a><span class="order_wl">查看物流</span>';
				  $("div[name='order"+id+"']").append(entity); 
				  var devEntity = '<a class="order_pay" data-toggle="modal" data-target="#delivery_dialog" style="display:none">发货</a>';
				  $("div[name='devery"+id+"']").prepend(devEntity);
        	 }
          }  
          if(isGood==1){//服务订单
        	  if(freStatus==2){
        		  var service = '<span class="order_status">待买家付款</span><a class="order_detail_btn" href="service_order_detail.html?orderNo='+orderNo+'&id='+id+'">'+
                                '订单详情</a><span class="order_wl">查看物流</span>';
                  $("div[name='order"+id+"']").append(service);  
        	  }else{
        		  var service = '<span class="order_status">交易完成</span><a class="order_detail_btn" href="service_order_detail.html?orderNo='+orderNo+'&id='+id+'">'+
                                '订单详情</a><span class="order_wl">查看物流</span>';
                  $("div[name='order"+id+"']").append(service);   
        	  }
		      var devService = '<a class="order_pay" data-toggle="modal" data-target="#delivery_dialog" style="display:none">发货</a>';
		      $("div[name='devery"+id+"']").prepend(devService);
          }
          
          if(isGood==2){//券订单
        	  if(freStatus==2){
        		  var voucher = '<span class="order_status">待买家付款</span><a class="order_detail_btn" href="ticket_order_detail.html?orderNo='+orderNo+'&id='+id+'">'+
                                '订单详情</a><span class="order_wl">查看物流</span>';
                  $("div[name='order"+id+"']").append(voucher); 
        	  }else{
        		  var voucher = '<span class="order_status">交易完成</span><a class="order_detail_btn" href="ticket_order_detail.html?orderNo='+orderNo+'&id='+id+'">'+
                                '订单详情</a><span class="order_wl">查看物流</span>';
                  $("div[name='order"+id+"']").append(voucher); 
        	  }   	  
    		  var devVoucher = '<a class="order_pay" data-toggle="modal" data-target="#delivery_dialog" style="display:none">发货</a>';
    		  $("div[name='devery"+id+"']").prepend(devVoucher);
              }
	  }
	  //alert("查询成功！");
	  
	  //点击发货发送查询请求
      $(".order_pay").unbind().bind("click",function(){
	     var orderContnt = $(this).parent().parent().parent().parent().children()[0].children[0].innerText;
	     var orderNo = orderContnt.substring(4);
	     deliveryId = $(this).parent().parent().parent().parent().attr("name");
	     deveryIndex = $(".order_pay").index($(this));
	     var data ={"orderNo":orderNo};
	     doPost("/huoban-sales/http/sales/function/order/getOrderAddress.do",data,deliverSearchSuccess);
      });
      
      //获取所点备注元素的id
      $(".remark_b").unbind().bind("click",function(){
    	  orderId = $(this).parent().parent().parent().attr("name");
      });
  }
  
  
	  //点击查询按钮获取数据
	 $(".search_btn").on("click",function(){
		   var orderNo = $("#orderNo").val().trim();
		   var sctime = $("#order_range_before").val().trim();
		   var ectime = $("#order_range_after").val().trim();
		   var sptime = $("#order_pay_before").val().trim();
		   var eptime = $("#order_pay_after").val().trim(); 
		   var data = {"orderNo":orderNo,"sctime":sctime,"ectime":ectime,"sptime":sptime,"eptime":eptime,"status":status,"shopId":1}; 
		   $(".order_list").empty();
		   doPost("/huoban-sales/http/sales/function/order/sellInfoOrderList.do",data,searchSuccess);
	 });

     //修改备注
     $("#remark_add").on("click",function(){
      	$("#remark_add").attr("data-dismiss","modal");
      	var remark = $("#textarea").val().trim();
      	var data = {"id":orderId,"remark":remark};
      	doPost("/huoban-sales/http/sales/function/order/updateOrder.do",data,dupdateSuccess);
     });
     
    //修改备注成功回调函数
     var dupdateSuccess = function(datas){
    	 alert("修改成功！");
     }
  
    //发货查询成功回调函数
    var deliverSearchSuccess = function(datas){
    	$(".delivery_dialog").empty();
    	var data = datas.data;
    	var takeName = data.takeName;
    	if(takeName==null){
    		takeName="";
    	}
    	var takeMobile = data.takeMobile;
    	if(takeMobile==null){
    		takeMobile="";
    	}
    	var takeAddress = data.takeAddress;
    	if(takeAddress==null){
    		takeAddress="";
    	}
    	var takeProvince = data.takeProvince;
    	if(takeProvince==null){
    		takeProvince="";
    	}
    	var takeCity = data.takeCity;
    	if(takeCity==null){
    		takeCity="";
    	}
    	var takeArea = data.takeArea;
    	if(takeArea==null){
    		takeArea="";
    	}
    	var orderNo = result[deveryIndex].orderNo;
    	var createTime = result[deveryIndex].createTime;
    	if(createTime==null){
    		createTime="";
    	}
    	var productName = result[deveryIndex].productName;
    	if(productName==null){
    		productName="";
    	}
	    var count = result[deveryIndex].count;
	    if(count==null){
	    	count=0;
	    }
	    var buyPrice = result[deveryIndex].buyPrice;
	    if(buyPrice==null){
	    	buyPrice=0;
	    }
	    var remark = result[deveryIndex].remark;
	    if(remark==null){
	    	remark="";
	    }
	    var userRemark = result[deveryIndex].userRemark;
	    if(userRemark==null){
	    	userRemark="";
	    }
	    var productPropertys = result[deveryIndex].productPropertys; 
	    var price = buyPrice*count;
	    var id = 'delivery_btn'+deveryIndex;
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
    		   var freNum = freNo.join(",");
    		   var data = {"id":deliveryId,"freStatus":1,"freNo":freNum};
    		   doPost("/huoban-sales/http/sales/function/order/updateOrder.do",data,deliverySuccess);
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
	   
	   
	   //页面加载默认查询全部订单
	   changeTabForIndex(1);

})
