/**
 * Created by lwb on 2016/8/10.
 */
var addressData;
$(function(){

//  checkStatus("fths");
  
  <!--fs 下单状态   ss 付款状态  ts 服务状态 fths 完成-->
  function checkStatus(cn){
    $(".sm_detail_v").addClass(cn);
  }
  
		var orderSuccess = function(datas){
			   addressData = datas.data;
		}
		
	  //服务订单查询成功回调函数
      var searchSuccess = function(datas){
		 doPost("/huoban-sales/http/sales/function/order/getOrderAddress.do",data,orderSuccess);
		 $(".order_staus_tips_v").empty();
		 $(".seller_v").empty();
		 $(".order_list_v").empty();
		 $(".service_list_v").empty();
		 result = datas.data;
		 var orderNo = result.orderNo;
		 var productName = result.productName;
		 var count = result.count;
		 var buyPrice = result.buyPrice;
		 var createTime = result.createTime;
		 var updateTime = result.updateTime;
		 var remark = result.remark;
		 var productPropertys = result.productPropertys;
		 var userId = result.userId;
		 var userRemark = result.userRemark;
		 var info_size = result.info_size;
		 var productPic = result.productPic;
		 var pay_time = result.pay_time;
		 var takeName = addressData.takeName;
		 var takeMobile = addressData.takeMobile;
		 var status = addressData.status;
		 var price = buyPrice*count;
		 if(status==0){
			  checkStatus("fs");
			  $(".rstatus_4").remove();
		     var four1 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
		                 '<span class="subtitle">买家下单</span></div>';
		     $(".transaction_tips").append(four1);
		     var turn = "无";
		 }
		 if(status==1){
			  checkStatus("ss");
			  $(".rstatus_4").remove();
		     var four2 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
		                 '<span class="subtitle">买家付款</span></div>';
		     $(".transaction_tips").append(four2);
		     var turn = "无";
		 }
		 if(status==2){
			  checkStatus("ts");  
			  $(".rstatus_4").remove();
		     var four3 = '<div class="rstatus_4"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
		                 '<span class="subtitle">服务进行中</span></div>';
		     $(".transaction_tips").append(four3);
		     var turn = "无";
		 }
         if(status==3 || status==4){
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
		             '<div class="tstatus"><span class="time">'+updateTime+'</span><span>服务进行中</span></div>'+
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
		 
		 var product = productPropertys.split(";");
		 for(var i=0;i<product.length;i++){
			 var five = '<div class="service_info_item"><table class="stable" name="table'+i+'"></table>'+
                        '<div class="bot_v"><span class="title">纪念徽章x1</span></div></div>';
             $(".service_list_v").append(five);        
			 var pro = product[i].split(",");
			 for(var j=0;j<pro.length;j++){
				var reg = pro[j].indexOf(":") ;
				var pref = pro[j].substring(reg+1);
				var piff = pro[j].substring(0,reg+1);
				var six = '<tr><td class="title" valign="top"><span>'+piff+'</span></td><td class="value"><span>'+pref+'</span></td></tr>';
				$("table[name='table"+i+"']").append(six);
			 }
		 }
	}
		
		
		//页面加载发送查询请求
		var id = Utils.getUrlParam("id");
		var orderNo = Utils.getUrlParam("orderNo");
		var data = {"id":id,"orderNo":orderNo}; 
		doPost("/huoban-sales/http/sales/function/order/productDetail.do",data,searchSuccess);

})
