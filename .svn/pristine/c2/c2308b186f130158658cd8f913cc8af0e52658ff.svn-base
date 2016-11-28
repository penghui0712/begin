/**
 * Created by lwb on 2016/7/28.
 */
var freemarkId;//全局变量-运费模板id
var shopId;
$(function(){
	/*
	 * 添加运费模板
	 */
    var freightFreemarkSuccess = function(datas){
    	alert("运费模板添加成功！");
    	window.location.reload(); 
    }
    
    var searchShopId = function(datas){
    	var result = datas.data;
    	shopId = result.shopId;
    }
    var sellId = Utils.getLoginUser.userID;
    var data = {"sellId":sellId};
    doPost("/huoban-sales/http/sales/userlogin/getSellInfo.do",data,searchShopId);
    
    //点击添加按钮
    $("#pro_add").click(function(){
      $("#add_shipment_dialog").modal("hide");
      var freightName = $("#express option:selected").text();
      if(!Utils.checkNotEmpty(freightName)){
    	  alert("模板名称不能为空！")
    	  return;
      }
      if(getModelName().indexOf(freightName)!=-1){
    	  alert("模板名称不能重复！")
    	  return;
      }

      var data = {"freightName":freightName,"shopId":shopId};
      doPost("/huoban-sales/http/sales/function/freight/insertFreightFreemark.do",data,freightFreemarkSuccess);
    });

    //获取所有模板名称放入数组
	function getModelName(){
	  	var childs = [];
	    var length = $("#shipment_list").children().length;
	      for(var i=0;i<length;i++){
	    	  childs.push($("#shipment_list").children()[i].children[0].innerText);
	      }
	      return childs;
	}
    
	/*
	 * 查询运费模板
	 */
	
    //查询成功回调函数
    var selectSuccess = function(datas){
    	$("#shipment_list").empty();
    	var data = datas.data;
    	for(var i=0;i<data.length;i++){
    		var freightName = data[i].freightName;
    		    freemarkId = data[i].id; 
         	var shipment_context ='<div class="shipment_v"><span class="title">'+freightName+'</span><a href="shipment_manage_edit.html?freemarkId='+freemarkId+'">编辑</a></div>';
         	$("#shipment_list").append(shipment_context);
    	}
    }
    //页面加载发送查询请求
    doPost("/huoban-sales/http/sales/function/freight/searchFreightFreemarkBySellId.do",null,selectSuccess);

})
