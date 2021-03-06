/**
 * Created by lwb on 2016/8/12.
 */
var MAX_UPLOAD_COUNT=6
$(function(){
  var sed=UE.getEditor('summary_editor');
  var ced=UE.getEditor('content_editor');
  var swiper=new Swiper('.swiper_v');
  laydate({
    elem: '#time_start',
    choose: function(datas){ //选择日期完毕的回调
      changePhonePreView();
    }
  })

  laydate({
    elem: '#time_end',
    choose: function(datas){ //选择日期完毕的回调
      changePhonePreView();
    }
  })


  laydate({
    elem: '#gzdate',
    choose: function(datas){ //选择日期完毕的回调
      changePhonePreView();
    }
  })

/*  laydate({
    elem: '#shop_service_start',
    choose: function(datas){ //选择日期完毕的回调
      changePhonePreView();
    }
  })

  laydate({
    elem: '#shop_service_end',
    choose: function(datas){ //选择日期完毕的回调
      changePhonePreView();
    }
  })*/




  //点击上传图片按钮
  $("#uploadBtn").click(function(){
      createImageView("../images/order_test.png");
  })

  //点击添加规则按钮
  $("#add_rule").click(function(){
    addRule("规则2");
  })

  //点击添加产品按钮
  $("#add_goods").click(function(){
    addGoods();
  })

  //点击添加必填信息
  $("#add_info").click(function(){
      addInfo();
  })

  $('input').on('input',function() {
    changePhonePreView();
  });
  $('select').on('change',function() {
    changePhonePreView();
  });

  $('textarea').on('input',function() {
    changePhonePreView();
  });

  $(".tab_c").on("click",function(){
    if(!$(this).hasClass("tab_active")){
      $(this).addClass("tab_active");
      $(".tab_c").not($(this)).removeClass("tab_active");
      changePhonePreView();

    }
  });

  var i=2;
  $("#con_add").on("click",function(){
	  i=i+1;
	  var checkboxId = "rg_cb_dfk"+i;
      var a='<div class="aroma_item">' +
        '<div class="rg_cb">' +
        '<input class="" type="checkbox" id="'+checkboxId+'" name="checkbox" value=""/>' +
        '<label for="'+checkboxId+'"></label>' +
        '</div>' +
        '<input class="normal_input" type="text">' +
        '<img class="delete delete_aroma" src="../images/delete_ico.png">' +
        '</div>';
      $("#aroma_list").append(a);
    $(".delete_aroma").unbind().bind("click",function(){
      $(this).parent().remove();
    });
  });


  sed.addListener('selectionchange',function(){
    changePhonePreView();
  })


  //改变手机预览
  function changePhonePreView(){

    var title=$("#title").val();
    var en_title=$("#en_title").val();
    var years=$("#years").val();
    if(!Utils.checkNotEmpty(title)&&!Utils.checkNotEmpty(en_title)&&!Utils.checkNotEmpty(years)){
      title="标题";
    }else{
      title+=' '+en_title+' '+years;
    }


    var subtitle=$("#subtitle").val();
    if(!Utils.checkNotEmpty(subtitle)){
      subtitle="副标题";
    }

    var aroma_list=$("input[name='checkbox']");


    var charArr=new Array();
    $('.char_i').each(function (index,domEle){
      if(Utils.checkNotEmpty(domEle.value)){
        charArr.push(domEle.value);
      }
    });
    var charStr='';

    for(var i=0;i<charArr.length;i++){
      charStr+='<div class="char_item"><span>'+charArr[i]+'</span></div>';
    }
    $("#char_list").html(charStr);

    var side_dishes=$("#side_dishes").val();
    if(!Utils.checkNotEmpty(side_dishes)){
      side_dishes='配菜';
    }else{
      side_dishes='建议配菜：'+side_dishes;
    }
    var nprice=$("#nprice").val();
    if(!Utils.checkNotEmpty(nprice)){
      nprice='价格'
    }else{
      nprice='￥'+nprice;
    }

    var oprice=$("#oprice").val();
    if(!Utils.checkNotEmpty(oprice)){
      oprice='';
    }else{
      oprice='￥'+oprice;
    }
    var pro_type=$("#pro_type").val();
    var variety=$("#variety").val();
    var varietyArr=variety.split("，");
    var material=$("#material").val();
    var materialArr=material.split("，");
    var pick_years=$("#pick_years").val();
    var gzdate=$("#gzdate").val();
    var capacity=$("#capacity").val();
    var storage=$("#storage").val();
    var aboutfh=$("#aboutfh").val();
    var express_delivery=$("#express_delivery").val();
    var range=$("#range").val();

    var shop_service_start_time=$("#shop_service_start_time").val();
    var shop_service_end_time=$("#shop_service_end_time").val();

    var about_pc=$("#about_pc").val();
    var huoban_phone=$("#huoban_phone").val();
    var shop_service=$("#shop_service").val();


    var sp_desc=$("#sp_desc").val();

    if(Utils.checkNotEmpty(capacity)){
      capacity=capacity+'ml';
    }



    var place_of_origin=$("#place_of_origin").val();
    var place_of_origin_new=$("#place_of_origin_new").val();
    var addressDetail='';
    if(!Utils.checkNotEmpty(place_of_origin)&&!Utils.checkNotEmpty(place_of_origin_new)) {
      addressDetail = '产地';
    }else{
      if(Utils.checkNotEmpty(place_of_origin)){
        addressDetail+='原产：'+place_of_origin;
      }
      if(Utils.checkNotEmpty(place_of_origin_new)){
        addressDetail+='  产地：'+place_of_origin_new;
      }
    }





    var tabIndex=$(".tab_c").index($(".tab_active"));
    if(tabIndex==0){
      $("#goods_d").html(sed.getContent());
    }else if(tabIndex==1){
      var a='<div class="goods_rule_v">' +
        '<span class="title">— 产品类型 —</span>' +
        '<span class="subtitle" id="validityT">'+pro_type+'</span>' +
        '<span class="title">— 葡萄品种 —</span>';
        for(var i=0;i<varietyArr.length;i++){
          a+='<span class="subtitle" id="reservationT">'+varietyArr[i]+'</span>';
        }
        a+='<span class="title">— 原料/辅料 —</span>';
        for(var i=0;i<materialArr.length;i++){
          a+= '<span class="subtitle">'+materialArr[i]+'</span>';
        }
        a+='<span class="title">— 葡萄采摘年份 —</span>' +
        '<span class="subtitle">'+pick_years+'</span>' +
        '<span class="title">— 灌装日期 —</span>' +
        '<span class="subtitle">'+gzdate+'</span>' +
        '<span class="title">— 容量 —</span>' +
        '<span class="subtitle">'+capacity+'</span>' +
        '</div>';
      $("#goods_d").html(a);
    }else if(tabIndex==2){
        var a='<div class="goods_rule_v">' +
          '<span class="title">— 存储方式 —</span>' +
          '<span class="subtitle" id="validityT">'+storage+'</span>' +
          '<span class="title">— 关于发货 —</span>' +
          '<span class="subtitle" id="reservationT">'+aboutfh+'</span>' +
          '<span class="title">— 快递公司 —</span>' +
          '<span class="subtitle" id="ruleT">'+express_delivery+'</span>' +
          '<span class="title">— 送货范围 —</span>' +
          '<span class="subtitle" id="tipsT">'+range+'</span>' +
          '<span class="title">— 商家客服 —</span>' +
          '<span class="subtitle" id="tipsT">'+shop_service+'</span>' +
          '<span class="title">— 客服在线 —</span>' +
          '<span class="subtitle" id="tipsT">'+shop_service_start_time+' - '+shop_service_end_time+'</span>' +
          '<span class="title">— 关于赔偿 —</span>' +
          '<span class="subtitle" id="tipsT">'+about_pc+'</span>' +
          '<span class="title">— '+huoban_phone+' —</span>' +
          '<span class="subtitle" id="tipsT">如需开发票，请在用餐时咨询商户</span>' +
          '<span class="title">— '+sp_desc+' —</span>' +
          '</div>';
      $("#goods_d").html(a);
    }else{
      $("#goods_d").html('');
    }



    var phoneNum=$("#phoneNum").val();
    if(!Utils.checkNotEmpty(phoneNum)) {
      phoneNum = '电话';
    }

    var validity=$("#validity").val();
    var reservation=$("#reservation").val();
    var rule=$("#rule").val();
    var tips=$("#tips").val();

    var stime=$("#time_start").val();
    var etime=$("#time_end").val();

    var timeTips='时间';
    if(Utils.checkNotEmpty(stime)&&Utils.checkNotEmpty(etime)){
      timeTips=stime+' ～ '+etime;
    }


    $(".pre_title").html(title);
    $(".pre_subtitle").html(subtitle);
    $(".pre_address").html(side_dishes);
    $(".oprice").html(oprice);
    $(".nprice").html(nprice);
    $("#address_detailT").html(addressDetail.trim());
    $("#phoneNumT").html(phoneNum);

    $("#validityT").html(validity);
    $("#reservationT").html(reservation);
    $("#ruleT").html(rule);
    $("#tipsT").html(tips);
    $("#timeTips").html(timeTips);

  }

  function addPreviewImage(objId){
    var a='<div class="swiper-slide" id="'+objId+'"><img class="sw_image" src="../images/order_test.png"></div>';
    $(".swiper-wrapper").append(a);
    swiper.update();
  }

  //添加图片
  function createImageView(src){
    var length=$(".image_list").children().length;
    if(length<MAX_UPLOAD_COUNT){
      var objId='uploadImage'+length;
      var a='<div class="uploadImage" data-upload-image="'+objId+'">' +
        '<img class="image" src="'+src+'">' +
        '<img class="delete delete_image" src="../images/delete_ico.png">' +
        '</div>';
      $(".image_list").append(a);
      checkImageCount();
      //添加预览图片
      addPreviewImage(objId);
      $(".delete_image").unbind().bind("click",function(){
        var oId=$(this).parent().attr("data-upload-image");
        $('#'+oId).remove();
        swiper.update();
        swiper.slideTo(0,false);
        $(this).parent().remove();
        checkImageCount();
      });
    }
  }
  function checkImageCount(){
    var length=$(".image_list").children().length;
    if(length>=MAX_UPLOAD_COUNT){
      $("#uploadBtn").hide();
    }else{
      $("#uploadBtn").show();
    }
    if(length>0){
      $(".swiper_preview_v").hide();
      $(".swiper_v").show();
    }else{
      $(".swiper_preview_v").show();
      $(".swiper_v").hide();
    }


  }

  //添加规则
  function addRule(ruleName){
    var a='<div class="rule_item">' +
      '<span class="subtitle">'+ruleName+'</span>' +
      '<div class="cinput">' +
      '<input class="input" type="text">' +
      '<span class="line"></span> ' +
      '<span class="count">份</span> ' +
      '</div> ' +
      '<span class="tips">至</span>' +
      '<div class="cinput">' +
      '<input class="input" type="text">' +
      '<span class="line"></span>' +
      '<span class="count">份</span>' +
      '</div>' +
      '<span class="subtitle">折扣率</span>' +
      '<div class="zinput">' +
      '<input class="input" type="text">' +
      '<span class="line"></span>' +
      '<span class="count">%</span>' +
      '</div> ' +
      '<img class="delete delete_rule" src="../images/delete_ico.png">' +
      '</div>';
    $(".rule_list_v").append(a);
    $(".delete_rule").unbind().bind("click",function(){
      $(this).parent().remove();
    });
  }
  //添加产品
  function addGoods(){
    var a='<div class="goods_item">' +
      '<span class="subtitle">名称</span>' +
      '<input class="normal_input" type="text">' +
      '<span class="subtitle">价格</span>' +
      '<input class="normal_input small" type="text">' +
      '<span class="subtitle">数量</span>' +
      '<input class="normal_input small" type="text">' +
      '<img class="delete delete_goods" src="../images/delete_ico.png">' +
      '<div class="mt12"></div>' +
      '<span class="subtitle">库存少于</span>' +
      '<input class="normal_input small" type="text">' +
      '<span class="subtitle">时提醒</span>'+
      '</div>';
    $(".goods_child_list").append(a);
    $(".delete_goods").unbind().bind("click",function(){
      $(this).parent().remove();
    });
  }

  function addInfo(){
    var a='<div class="add_info_v">' +
      '<input type="text" class="input2">' +
      '<img class="delete delete_info" src="../images/delete_ico.png">' +
      '</div>';
    $("#add_info").before(a);
    $(".delete_info").unbind().bind("click",function(){
      $(this).parent().remove();
    });
  }


  $(".pro_item").on("click",function(){
    changeBGStyle($(this))

  })
  $("#right_btn").click(function(){
    $('.left_list .pro_item').each(function (i,obj){
      if($(obj).hasClass("pro_active")){
        $(".left_list").find(obj).remove();
        $(".right_list").append(obj);
        $(obj).unbind().bind("click",function(){
          changeBGStyle(obj)
        })
      }else{

      }
    });
  })
  $("#left_btn").click(function(){
    $('.right_list .pro_item').each(function (i,obj){
      if($(obj).hasClass("pro_active")){
        $(".right_list").find(obj).remove();
        $(".left_list").append(obj);
        $(obj).unbind().bind("click",function(){
          changeBGStyle(obj)
        })
      }else{
      }
    });
  })
  function changeBGStyle(obj){
    $(obj).addClass("pro_active");
    $(".pro_item").not($(obj)).removeClass("pro_active");
  }
  
  //点击取消按钮
  $("#liqueur_cancle").click(function(){
	  window.location.reload();
  })
  
  //点击保存按钮
  $("#liqueur_save").click(function(){
	  var productNameCn = $("#title").val().trim();
	  var productNameEn = $("#en_title").val().trim();
	  var liqueurYear = $("#years").val().trim();
	  var productFname = $("#subtitle").val().trim();
	  var garnish  = $("#side_dishes").val().trim();
	  var cateoryId = $("#cateory option:selected").val();
	  
	  var productPic = [];  //图片
	  for(var i=0;i<$(".image_list").children().length;i++){
		  var pic = $(".image_list").children()[i].children[0].src;
		  productPic.push(pic);
	  }
	  var productPics = productPic.join(",");
	  
	  var price = $("#liqueur_price").val().trim();
	  var salePrice = $("#nprice").val().trim();
	  var count = $("#liqueur_count").val().trim();
	  var stock = $("#liqueur_stock").val().trim();
	  var deliveryPlacde = $("#delivery_place").val().trim();
	  
	  var characteristic = [];//特色亮点
	  for(var i=0;i<$(".char_i").length;i++){
		  var con = $(".char_i").eq(i).val();
		  characteristic.push(con);
	  }
	  var chars = characteristic.join(";");
	  
	  var originPlace = $("#place_of_origin option:selected").val();
	  var newPlace = $("#place_of_origin_new option:selected").val();
	  var timeStart = $("#time_start").val().trim();
	  var timeEnd = $("#time_end").val().trim();
	  
	  var aromasList = [];//香气
      $('input[name="checkbox"]:checked').each(function(index,element){ 
		  if($(element).attr("id")=="rg_cb_dfk" || $(element).attr("id")=="rg_cb_dfk2"){
			  var content = $(element).val();
			  aromasList.push(content);
		  }else{  
			  var content = $(element).parent().parent().children()[1].value;
			  $(element).attr("value",content);
			  aromasList.push(content);
		  }
      }); 
      var aromas = aromasList.join(",");//将数组转化为字符串
 
      var degrees = $("#degrees").val().trim();//酒精度数
      var Acerbity = $("input[name='rdo_wl']:checked").next().text();//涩度
      var WineBody = $("input[name='rdo_wl2']:checked").next().text();//酒体
      var productType = $("#pro_type option:selected").val();
      var variety = $("#variety").val().trim();
      var material = $("#material").val().trim();
      var pickYears = $("#pick_years option:selected").val().trim();
      var gzdate = $("#gzdate").val().trim();
      var producer = $("#producer").val().trim();
      
      var capacity = $("#capacity").val().trim();
      var storage = $("#storage").val().trim();
      var aboutfh = $("#aboutfh").val().trim();
      var expressDelivery = $("#express_delivery").val().trim();
      var range = $("#range").val().trim();
      var shopService = $("#shop_service").val().trim();
      var serviceStart = $("#shop_service_start_time").val().trim();
      var serviceEnd = $("#shop_service_end_time").val().trim();
      var aboutPc = $("#about_pc").val().trim();
      var huobanService = $("#huoban_phone").val().trim();
      var special = $("#sp_desc").val().trim();
      
	  var child_goods = []; //子产品
	  for(var i=0;i<$(".goods_child_list").children().length;i++){
		  var goodName = $(".goods_child_list").children()[i].children[1].value;
		  var goodPrice = $(".goods_child_list").children()[i].children[3].value;
		  var goodCount = $(".goods_child_list").children()[i].children[5].value;
		  var goodStock = $(".goods_child_list").children()[i].children[9].value;
		  var data = {"goodName":goodName,"goodPrice":goodPrice,"goodCount":goodCount,"goodStock":goodStock};
		  child_goods.push(data);
	  }
	  var childGoods = JSON.stringify(child_goods);
      
	  var related_products = []; //关联产品
	  for(var i=0;i<$(".right_list").children().length;i++){
		  var productPic = $(".right_list").children()[i].children[0].src;
		  var productName = $(".right_list").children()[i].children[1].children[0].innerText;
		  var price = $(".right_list").children()[i].children[1].children[1].innerText;
		  var productPrice = price.substring(1);
		  var data = {"productPic":productPic,"productName":productName,"productPrice":productPrice};
		  related_products.push(data);
	  }
	  var relatedProducts = JSON.stringify(related_products);
	  
	  var logistics = $("input[name='rdo_wl3']:checked").next().text();  //物流
	  var transaction = $("#transaction option:selected").val(); //交易方式
	  
	  var infos = [];  //报名信息
	  for(var i=0;i<$(".info_list_v").children().length-1;i++){
		  var info = $(".info_list_v").children()[i].children[0].value;
		  infos.push(info);
	  }
	  var signUp = infos.join(",");
	  
	  var brief = new Array();
	  $('.view body').each(function(index,element){
		 alert(index);
		 console.log($(element));
		 var introduction = $(element).html();
		 //var introduction = $('.view body').children[index].innerText;
		 brief.push(introduction);
	  });

	  console.log(brief);
	  
	  var data = {};
	  doPost("",data,saveSuccess);
  });
  
  var saveSuccess = function(datas){
	  alert("保存成功！");
  }
})
