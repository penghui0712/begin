/**
 * Created by lwb on 2016/8/2.
 */
var parentId;
var catoId;
$(function(){

   /*
    * 分类查询
    */
   var searchSuccess = function(datas){
	   var result = datas.data;
	   var firstList = [];//存放第一层数据
	   var secList = [];  //存放第二层数据
	   var thirdList = []; //存放第三层数据
	   var parentIds = []; //存放第一层的id
	   for(var i=0;i<result.length;i++){
		   if(result[i].parentId==null){
			   parentIds.push(result[i].id);
			   firstList.push(result[i]);
		   }else if(result[i].parentId!=null & parentIds.indexOf(result[i].parentId) > -1){
			   secList.push(result[i]);
		   }else{
			   thirdList.push(result[i]);
		   }
	   }

	   //显示第一层数据
	   for(var i=0;i<firstList.length;i++){
		   var id = firstList[i].id;
		   var categoryName = firstList[i].categoryName;
		   var parentId = firstList[i].parentId;
			   var fir_content = '<div class="category_list"><div class="category_item"><div class="fci" name="'+id+'">'+
								 '<div class="fc_item"><span>'+categoryName+
								 '</span><img src="../images/pro_edit_icon.png" data-toggle="modal" data-target="#update_product_category_dialog">'+
								 '<div class="operating">'+
								 '<a class="add" data-toggle="modal" data-target="#add_product_category_dialog">添加子分类</a>'+
								 '<a class="down" style="visibility:hidden">下移</a><a class="up" style="visibility:hidden">上移</a><a class="del">删除</a></div></div></div></div></div>';
		       $(".sm_center_v").append(fir_content);
	   }
	   //显示第二层数据
	   for(var i=0;i<secList.length;i++){
		   var id = secList[i].id;
		   var categoryName = secList[i].categoryName;
		   var parentId = secList[i].parentId;
		   var sec_content = '<div class="sc_list"><div class="sci" name="'+id+'"><div class="sc_item"><span class="point"></span>'+
						     '<span class="subtitle">'+categoryName+
						     '</span><img src="../images/pro_edit_icon.png" data-toggle="modal" data-target="#update_product_category_dialog">'+
						     '<div class="operating">'+
						     '<a class="add" data-toggle="modal" data-target="#add_product_category_dialog">添加子分类</a>'+
						     '<a class="down" style="visibility:hidden">下移</a><a class="up" style="visibility:hidden">上移</a><a class="del">删除</a></div></div></div></div>';
		   $("div[name='"+parentId+"']").append(sec_content);
	   }
	   //显示第三层数据
	   for(var i=0;i<thirdList.length;i++){
		   var id = thirdList[i].id;
		   var categoryName = thirdList[i].categoryName;
		   var parentId = thirdList[i].parentId;
		   var thd_content = '<div class="thd_list"><div class="tci" name="'+id+'"><div class="thd_item"><span class="point"></span>'+
						     '<span class="subtitle">'+categoryName+
						     '</span><img src="../images/pro_edit_icon.png" data-toggle="modal" data-target="#update_product_category_dialog">'+
						     '<div class="operating">'+
						     '<a class="add none">添加子分类</a><a class="down" style="visibility:hidden">下移</a><a class="up" style="visibility:hidden">上移</a><a class="del">删除</a></div></div></div></div>';
		   $("div[name='"+parentId+"']").append(thd_content);
	   }
   }

	  //页面加载，查询数据
	   $(".category_list").remove();
    	var shopId = Utils.getLoginUser().userID;
		if(!Utils.checkNotEmpty(shopId)){
			window.location.href = "login.html";
		}
	   var data = {"shopId":shopId};
	   doPost("/huoban-sales/http/sales/function/category/searchCategory.do",data,searchSuccess);


	   //修改成功回调函数
	   var updateSuccess = function(datas){
		   window.location.reload();
		   alert("修改成功！")
	   }
	   //点击图片，获取id
	   $("img").on("click",function(){
		   catoId = $(this).parent().parent().attr("name");
		   //将输入框的默认值改为你所点击的那个值
		   var placeholder = $(this).prev().html();
		   $("#update_input").attr("placeholder",placeholder);
	   });

	  //点击修改按钮弹出修改框
	  $("#pro_update").on("click",function(){
		  $("#update_product_category_dialog").hide();
		  $("#pro_update").attr("data-dismiss","modal");
		  var categoryName = $("#update_input").val().trim();
		  var data = {"id":catoId,"categoryName":categoryName};
		  doPost("/huoban-sales/http/sales/function/category/updateCategory.do",data,updateSuccess);
	  });

	  //删除成功回调函数
	  var deleteSuccess = function(datas){
		  window.location.reload();
		  alert("删除成功！");
	  }

	  //点击删除按钮将数据删除
	  $(".del").on("click",function(){
		  var id = $(this).parent().parent().parent().attr("name");
		  var data = {"id":id,"isDel":0};
		  doPost("/huoban-sales/http/sales/function/category/updateCategory.do",data,deleteSuccess);
	  });


	    //插入成功回调函数
		var insertSuccess = function(datas){
			window.location.reload();
			alert("插入数据成功！");
		}
	    $(".add").on("click",function(){
		    parentId = $(this).parent().parent().parent().attr("name");
	        //createElement($(this),"新分类");
	    });
		//点击添加按钮添加子分类
		$("#pro_add").on("click",function(){
			  $("#add_product_category_dialog").hide();
			  $("#pro_add").attr("data-dismiss","modal");

			  categoryName = $("#product_input").val().trim();
     		  var shopId = Utils.getLoginUser().userID;
			  var data = {"categoryName":categoryName,"parentId":parentId,"shopId":shopId,"isDel":1};
			  doPost("/huoban-sales/http/sales/function/category/insertCategory.do",data,insertSuccess);
		});

	    //上移
	    $(".up").on("click",function(){
	    	moveUp($(this));

	    });
	    //下移
	    $(".down").on("click",function(){
	        moveDown($(this));
	    });
	    //添加子分类
	    function createElement(obj,name){
	      obj=obj.parent().parent().parent();
	      if(obj.hasClass("fci")){
	        var b='<div class="sci"><div class="sc_item">' +
	          '<span class="point"></span><span class="subtitle">'+name+'</span><img src="../images/pro_edit_icon.png">' +
	          '<div class="operating"> ' +
	          '<a class="add" data-toggle="modal" data-target="#add_product_category_dialog">添加子分类</a>' +
	          '<a class="down">下移</a>' +
	          '<a class="up">上移</a>' +
	          '<a class="del">删除</a>' +
	          '</div>'+
	          '</div><div class="thd_list"></div></div>';
	        $(".sc_list").eq($(".sc_list").index($(obj).find(".sc_list"))).append(b);
	      }else if(obj.hasClass("sci")){
	        var c='<div class="tci"><div class="thd_item">' +
	          '<span class="point"></span><span class="subtitle">'+name+'</span><img src="../images/pro_edit_icon.png"> ' +
	          '<div class="operating">' +
	          '<a class="add none">添加子分类</a>' +
	          '<a class="down">下移</a>' +
	          '<a class="up">上移</a> ' +
	          '<a class="del">删除</a>' +
	          '</div></div></div>';
	        $(".thd_list").eq($(".thd_list").index($(obj).find(".thd_list"))).append(c);
	      }
	      $(".add").unbind().bind("click",function(){
	      	 parentId = $(this).parent().parent().parent().attr("name");
	         //createElement($(this),"新分类");
	      });
	      $(".up").unbind().bind("click",function(){
	           moveUp($(this));
	       });
	      $(".down").unbind().bind("click",function(){
	           moveDown($(this));
	       })
	     }

	    //上移
	  	function moveUp(obj){
  		    var $list_item=$(obj).parent().parent();
  		    alert($list_item.index());
  		    if($list_item.index()>0){
  		       var className="."+$list_item.prop("className");
  		       var $oneobj=$(className).eq($list_item.index()-1);
  		       var $twoobj=$(className).eq($list_item.index());
  		       $twoobj.insertBefore($oneobj);
	  		}
	  	 }
	  	//下移
	  	function moveDown(obj){
	  	    var $list_item=$(obj).parent().parent();
	  	    var count=$list_item.parent().children().length;
	  	    if($list_item.index()!=count-1){
	  	        var className="."+$list_item.prop("className");
	  	        var $oneobj=$(className).eq($list_item.index());
	  	        var $twoobj=$(className).eq($list_item.index()+1);
	  	        $twoobj.insertBefore($oneobj);
	  	   }
	  }
})
