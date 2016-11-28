/**
 * Created by lwb on 2016/8/10.
 */
var addressData;
var couponData;
$(function(){

//  checkStatus("fs");
  
  <!--fs 下单状态   ss 付款状态  ts 已使用状态-->
  function checkStatus(cn){
    $(".sm_detail_v").addClass(cn);
  }
  
	  var orderSuccess = function(datas){
		   addressData = datas.data;
	 }
	  
	 var couponSuccess = function(datas){
		 couponData = datas.data;
	 }

	//券订单查询成功回调函数
	var searchSuccess = function(datas){
		 doPost("/huoban-sales/http/sales/function/order/getOrderAddress.do",data,orderSuccess);
		 var data1 = {"od_id":id};
		 doPost("/huoban-sales/http/sales/function/order/getCouponList.do",data1,couponSuccess);
		 $(".order_staus_tips_v").empty();
		 $(".seller_v").empty();
		 $(".order_list_v").empty();
		 $(".ttable").empty();
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
		 var userId = result.userId;
		 if(userId==null){
			 userId="";
		 }
		 var userRemark = result.userRemark;
		 if(userRemark==null){
			 userRemark="";
		 }
		 var info_size = result.info_size;
		 if(info_size==null){
			 info_size="";
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
		 var status = addressData.status;
		 var price = buyPrice*count;

		 if(status==0){
			  checkStatus("fs");
			  $(".rstatus_3").remove();
		      var four1 = '<div class="rstatus_3"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
		                 '<span class="subtitle">买家下单</span></div>';
		      $(".transaction_tips").append(four1);
		      var turn = "无";
		 } else if(status==1){
			  checkStatus("ss");
			  $(".rstatus_3").remove();
		      var four2 = '<div class="rstatus_3"><div class="p"></div><img src="../images/success_icon.png"><span class="title">交易状态：</span>'+
		                 '<span class="subtitle">买家付款</span><a class="fh" data-toggle="modal" data-target="#delivery_dialog">发货</a></div>';
		      $(".transaction_tips").append(four2);
		      var turn = "无";
		 }else if(status==99){
			  checkStatus("ss");
			  $(".transaction_tips").remove();
		      var turn = "退款";
		 }else if(status==98){
			  checkStatus("ss");
			  $(".transaction_tips").remove();
		      var turn = "退货";
		 }else{
			  checkStatus("ss");  
			  $(".transaction_tips").remove();
			  var turn = "无";
		 }
	 
	 var first = '<div class="fstatus"><span class="time">'+createTime+'</span><span>买家下单</span></div>'+
	             '<div class="sstatus"><span class="time">'+pay_time+'</span><span>买家付款</span></div>'+
	             '<div class="tstatus"><span class="time"></span><span>已使用</span></div>';
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
	 
	 var five = '<table class="table_v">'+
			    '<tr class="title"><td>券编号</td><td>时间</td><td>券状态</td></tr></table>';
     $(".ttable").append(five);
     
	 for(var i=0;i<couponData.length;i++){
		 var couponCode = couponData[i].couponCode;
		 var takeTme = couponData[i].takeTme;
		 var couponStatus = couponData[i].status; 
		 
		 if(couponStatus==0){
			  var region = "未使用";
		 }else{
			  var region = "已使用"; 
		 }
			 
		 if(takeTme==null || takeTme==""){
			  var takeTime = "—— ——";
		 }else{
			  var takeTime = takeTme;
		 }
		
		 var content = '<tr><td>'+couponCode+'</td><td>'+takeTime+'</td><td>'+region+'</td></tr>';
		 $(".table_v").append(content);	 
	 }
	}
	
	
	//页面加载发送查询请求
	var id = Utils.getUrlParam("id");
	var orderNo = Utils.getUrlParam("orderNo");
	var data = {"id":id,"orderNo":orderNo};
	doPost("/huoban-sales/http/sales/function/order/productDetail.do",data,searchSuccess);
  
  
})
