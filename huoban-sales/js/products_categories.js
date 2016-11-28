/**
 * Created by lwb on 2016/8/1.
 */
var sellId;
$(function(){
/*
  $('.collapse').on('show.bs.collapse', function () {
    alert("1");
    $(this).siblings(".item").find(".triangle_down").addClass("triangle_down_active");
  })
  $('.collapse').on('hide.bs.collapse', function () {
    alert("2");
    $(this).siblings(".item").find(".triangle_down").removeClass("triangle_down_active");
  })
*/
	  var searchShopId = function(datas){
		  	var result = datas.data;
		  	shopId = result.shopId;
	  }
		  
	  sellId = Utils.getUrlParam("sellId");
	  var data = {"sellId":sellId};
	  doPost("/huoban-sales/http/sales/userlogin/getSellInfo.do",data,searchShopId);

	/*
	 * 分类查询
	 */
	//页面加载成功回调函数
	var searchSuccess = function(datas){
		var result = datas.data;
		var firList = []; //存放第一层数据
		var secList = []; //存放第二层数据
		var thdList = []; //存放第三层数据
		var parentIds = [];//存放第一层的id
		for(var i=0;i<result.length;i++){
			if(result[i].parentId==null){
				firList.push(result[i]);
				parentIds.push(result[i].id);
			}else if(result[i].parentId!=null & parentIds.indexOf(result[i].parentId)>-1 ){
				secList.push(result[i]);
			}else{
				thdList.push(result[i]);
			}
		}

		//显示数据
		//第一层
		for(var i=0;i<firList.length;i++){//i=5
			var id = firList[i].id;
			var categoryName = firList[i].categoryName;
			var parentId = firList[i].parentId;
			var cataIp = 'collapseOne'+(1+i);
			var fir_content = '<div class="category_items" ><div class="category_item">'+
		                      '<a class="citem item" href="#'+cataIp+'" data-toggle="collapse"><span>'+categoryName+'</span><div class="triangle_down"></div></a>'+
	                          '<a class="gl" data-toggle="modal" data-target="#add_product_dialog">关联产品</a><div id="'+cataIp+'" name="'+id+'" class="panel-collapse collapse"></div></div></div>';
            $(".category_item_list").append(fir_content);
		}
		//第二层
		for(var i=0;i<secList.length;i++){//i=9
			var id = secList[i].id;
			var categoryName = secList[i].categoryName;
			var parentId = secList[i].parentId;
			var cataIp = 'collapseTwo'+(1+i);
			var sec_content = '<div class="sec_item_list"><div class="sec_item"><span class="point"></span>'+
							  '<a class="scitem item"  href="#'+cataIp+'" data-toggle="collapse">'+categoryName+'<div class="triangle_down"></div></a>'+
							  '<a class="gl" data-toggle="modal" data-target="#add_product_dialog"">关联产品</a><div id="'+cataIp+'" name="'+id+'" class="panel-collapse collapse"></div></div></div>';
            $("div[name='"+parentId+"']").append(sec_content);
		}
		//第三层
		for(var i=0;i<thdList.length;i++){//i=6
			var id = thdList[i].id;
			var categoryName = thdList[i].categoryName;
			var parentId = thdList[i].parentId;
			var thd_content = '<div class="thd_item_list"><div class="thd_item"><span class="tpoint"></span><a class="titem">'+categoryName+'</a>'+
			                  '<a class="gl" data-toggle="modal" data-target="#add_product_dialog">关联产品</a><div name="'+id+'"></div></div></div>';
            $("div[name='"+parentId+"']").append(thd_content);
		}
	}

	//页面加载开始发送查询请求
	$(".category_items").remove();
		if(shopId==null&&shopId==""){
			alert("请先登录！");
			return;
		}
	var data = {"shopId":shopId}; 
	doPost("/huoban-sales/http/sales/function/category/searchCategory.do",data,searchSuccess);

	//点击编辑分类，跳转到产品分类
	$(".bjfl").click(function(){
		window.location.href="products_categories_edit.html?sellId="+sellId;
	});
	
	
	//关联产品查询成功回调函数
//     var searchProductSuccess = function(datas){
//       $(".left_list").empty();
//   	   var result = datas.data;
//   	   for(var i=0;i<result.length;i++){
//   		   var propertyName = result[i].propertyName;
//   		   var propertyViewType = result[i].propertyViewType;
//   		   var content = '<div class="pro_item"><img src="../images/test3.png"><div class="pro_detail">'+
//                         '<span class="pro_subtitle">'+propertyName+'</span><span class="pro_price">¥'+propertyViewType+'</span></div></div>';
//   		   $(".left_list").append(content);
//   	   }
//     }
//     
//	 $(".gl").on("click",function(){
//		 var categoryId = $(this).next().attr("name");
//		 var data = {"categoryId":categoryId};
//		 doPost("/huoban-sales/http/sales/function/product/getProductPropertyByCategoryId.do",data,searchProductSuccess);
//	 });
	 
	 
		
		//关联产品添加成功回调函数
//		var insertSuccess = function(datas){
//			alert("添加数据成功！")
//		}
//		$("#pro_add").click(function(){
//			$("#add_product_dialog").hide();
//			$("#pro_add").attr("data-dismiss","modal");
//	        var productInfoDto = [];
//			for(var i=0;i<$(".right_list").children().length;i++){
//				var detailName = $(".right_list").children()[i].children[1].children[0].innerText;
//				var productPrice = $(".right_list").children()[i].children[1].children[1].innerText;
////				var product_pic = $(".right_list").children()[0].children[0].src;
//			    var datas = {"detailName":detailName,"productPrice":productPrice};
//			    productInfoDto.push(datas);
//			}
//			var inStr = JSON.stringify(productInfoDto);
//			var data = {productDetailPriceDtoList:inStr}
//			doPost("/huoban-sales/http/sales/function/product/insertProductInfo.do",data,insertSuccess);
//		});
	    

})
