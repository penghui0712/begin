/**
 * Created by lwb on 2016/7/28.
 */
var shipmentName;//全局变量-分区名称
var freemarkId;  //全局变量-运费模板Id
var freightId;  //全局变量-运费信息Id
var ids = []; //全局变量 数据id
var shopId;   //全局变量 shopId
$(function(){
    Sortable.create($("#qxgroup1")[0], { group: "qxgroup",
      onMove:function(evt){
        changeLayout($(evt.from),$(evt.to));
      }
    });

    //创建新分区
    function createElements(){
      var length=$("#qx_list").children().length+1;
      var centerE='';
      var rightE='';
      var createEId='qxgroup'+length;
      if(length % 2 == 1){
        centerE='<div class="ss_item onum" id="'+createEId+'"></div>'
        rightE+='<div class="sm_item onum">';
      }else{
        centerE='<div class="ss_item" id="'+createEId+'"></div>'
        rightE+='<div class="sm_item">';
      }
      var leftE="<div class='fq_item'> <span>• "+shipmentName+"</span> </div>";
      rightE += "<div class='input1'><span>¥</span><input type='text'/></div>" +
        "<div class='input2'><input type='text'/></div>" +
        "<div class='input1'><span>¥</span><input type='text'/></div>" +
        "</div>"
      $("#fq_list").append(leftE);
      $("#qx_list").append(centerE);
      $("#right_list").append(rightE);
      Sortable.create($("#"+createEId)[0], { group: "qxgroup",
        onMove:function(evt){
          changeLayout($(evt.from),$(evt.to));
        }
      });
    }
  //根据高度改变其他布局高度
  function changeLayout(from,to){
      var findex=$(".ss_item").index($(from));
      var tindex=$(".ss_item").index($(to));
      if(findex!=tindex){
        var fqh=$(from).height();
        var tqh=$(to).height();
        var $al=$(".fq_item").eq(findex);
        var $bl=$(".fq_item").eq(tindex);
        var $ar=$(".sm_item").eq(findex);
        var $br=$(".sm_item").eq(tindex);
        $($al).height(fqh);
        $($bl).height(tqh);
        $($ar).height(fqh);
        $($br).height(tqh);
      }
  }

      /*
       * 添加运费信息
       */

       freemarkId = Utils.getUrlParam("freemarkId");//获取通过URL传过来的值

	  //添加按钮
	  $("#shipment_add").click(function(){
	    $("#add_shipment_fq_dialog").modal("show");
	  })

	  $("#fq_add").click(function(){
	    $("#add_shipment_fq_dialog").modal("hide");

	    shipmentName = $("#fq_title").val().trim(); //点击添加分区获取名称
	    if(!Utils.checkNotEmpty(shipmentName)){
	    	alert("分区名不能为空！");
	    	return;
	    }
	    //判断分区名不能重复
	    if(getFqName().indexOf("• "+shipmentName)!=-1){
	  	  alert("分区名不能重复！");
	  	  return;
	    }
	    createElements();
	  });

	  //循环获取分区名
	  function getFqName(){
	  	var childs = [];
	      var length = $("#fq_list").children().length;
	      for(var i=0;i<length;i++){
	    	  childs.push($("#fq_list").children()[i].innerText);
	      }
	      return childs;
	  }

	  //根据Id获取每个分区的省份
	  function getProvince(key){
	  	var province =[];
	  	var length=$("#"+key).children().length;
	  	for(var i=0;i<length;i++){
	  		province.push($("#"+key).children()[i].innerText);
	  	}
	  	return province;
	  }

	  //循环获取id并获取分区的省份(二维数组)
	  function getProvinceId(){
	  	var provinces=[];
	  	var len = $("#qx_list").children().length;
	  	for(var i=0;i<len;i++){
	  		var provinceId = "qxgroup"+(1+i);
	  		provinces.push(getProvince(provinceId));
	  	}
	  	return provinces;
	  }

	  //循环获取计费
	  function getShimentFee(){
		var feeNodes = $('#right_list').children();
		var shipmentEditfee=[];
		for(var i =0;i<feeNodes.length;i++ ){
			var cols = [];
			var tempCols = feeNodes[i].children;
			cols.push(tempCols[0].children[1].value);//tempCols[i].children[1].value
			cols.push(tempCols[1].children[0].value);
			cols.push(tempCols[2].children[1].value);
			shipmentEditfee.push(cols);
		}
	  	return shipmentEditfee;
	  }


     //更新成功回调函数
	  var updateSuccess = function(datas){
//	  	  window.location.reload();
		  alert("数据保存成功！");
	  }

	  //点击保存按钮发送请求
	  $("#save").click(function(){
	  	//存放数据
	  	var name;
	  	var citys;
	    var fee;
	  	var length = $("#fq_list").children().length;
	  	var freightDtos = [];
	  	shopId = Utils.getLoginUser().userID;
	  	//循环取出数据
	  	for(var i=0;i<length;i++){
	  		name=getFqName()[i].substring(2);    //获取名字并截取
	  		citys=getProvinceId()[i].join(",");  //获取出城市名称
	     	fee=getShimentFee()[i];              //获取计费模式
	     	var fristPrice = fee[0];
	     	if(!Utils.checkNotEmpty(fristPrice)){
	     		fristPrice=0;
	     	}
	     	var againWegith = fee[1];
	     	if(!Utils.checkNotEmpty(againWegith)){
	     		againWegith=0;
	     	}
	     	var againPrice = fee[2];
	     	if(!Utils.checkNotEmpty(againPrice)){
	     		againPrice=0;
	     	}
	     	if (i >= ids.length) {
				id="0";
			}else{
				id=ids[i]+"";
			}
	        var datas = {"id":id,"shopId":shopId,"name":name,"citys":citys,"fristPrice":fristPrice,"againWegith":againWegith,"againPrice":againPrice,"freemarkId":freemarkId};
	        freightDtos.push(datas);// 将数据放到一个数组
	  	}
		   var inStr = JSON.stringify(freightDtos );//将数组转化为json字符串
		   var data = {message:inStr} ;
		   doPost("/huoban-sales/http/sales/function/freight/updateFreight.do",data,updateSuccess);
	  });

	  
	  /*
	   * 查询运费信息
	   */

	  //查询成功回调函数
	  var searchEditSuccess = function(datas){
		  //先清空div中的内容
		  $("#fq_list").empty();
		  $("#qx_list").empty();
		  $("#right_list").empty();

		  var result = datas.data;
		  var city1='';
		  var fees='';
		  var names;
		  var citys;
		  //循环获取数据
		  for(var i=0;i<result.length;i++){
			    ids.push(result[i].id);//保存id到全局变量ids
	    		var name = result[i].name;
	    		var fristPrice = result[i].fristPrice;
	    		if(fristPrice==null || fristPrice==0 ){
	    			fristPrice="";
	    		}
	    		var againWegith = result[i].againWegith;
	    		if(againWegith==null || againWegith==0){
	    			againWegith="";
	    		}
	    		var againPrice = result[i].againPrice;
	    		if(againPrice==null || againPrice==0){
	    			againPrice="";
	    		}
	    		var province = result[i].citys;
                if(province.length!=0){ //判断省份是否为空
	    		    citys = province.split(",");  
                }else{
                	citys = [];
                }
	    		var qxId = "qxgroup"+(1+i);  //获取省份的id
    	        if(result.length % 2 == 1){
    	        	city1 ='<div class="ss_item onum" id="'+qxId+'"></div>';
    	        	fees ='<div class="sm_item onum">';
    	        }else{
    	        	city1 ='<div class="ss_item" id="'+qxId+'"></div>';
    	        	fees ='<div class="sm_item">';
    	        }
    	        if(citys.length!=0){
    	        	$("#qx_list").append(city1);
   	        	    var citysArray;
   	    		    for(var j=0;j<citys.length;j++){
   	    			    citysArray = citys[j];
   		        	    var city = '<span class="ss_sp">'+citysArray+'</span>';
   		        	    $("#"+qxId).append(city);
   	    		    }  
    	        }else{
    	        	$("#qx_list").append(city1);
    	        }

    	         names="<div class='fq_item'> <span>• "+name+"</span> </div>";
    	         fees += "<div class='input1'><span>¥</span><input type='text' value='"+fristPrice+"'/></div>" +
    	                 "<div class='input2'><input type='text' value='"+againWegith+"'/></div>" +
    	                 "<div class='input1'><span>¥</span><input type='text' value='"+againPrice+"'/></div>" +
    	                 "</div>"
    	          $("#fq_list").append(names);
    	          $("#right_list").append(fees);
	 
    	         Sortable.create($("#"+qxId)[0], { group: "qxgroup",
    	          onMove:function(evt){
    	            changeLayout($(evt.from),$(evt.to));
    	          }
    	        });
	    	}
	  }

	  //页面加载自动发送查询请求
	  var data = {"freemarkId":freemarkId};
      doPost("/huoban-sales/http/sales/function/freight/searchFreightByFreemarkId.do",data,searchEditSuccess);

})
