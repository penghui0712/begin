/**
 * Created by lwb on 2016/8/12.
 */
var MAX_UPLOAD_COUNT=6
$(function(){
  var sed=UE.getEditor('summary_editor');
  var ced=UE.getEditor('content_editor');
  var swiper=new Swiper('.swiper_v');
  laydate({
    min: laydate.now(),
    elem: '#time_start',
    choose: function(datas){ //选择日期完毕的回调
      changePhonePreView();
    }
  })

  laydate({
    min: laydate.now(),
    elem: '#time_end',
    choose: function(datas){ //选择日期完毕的回调
      changePhonePreView();
    }
  })

  //点击上传图片按钮
  $("#uploadBtn").click(function(){
      createImageView(__uri("../images/order_test.png"));
  })




  //点击添加规则按钮
  var rule =1;
  $("#add_rule").click(function(){
	rule = rule+1;
    addRule("规则"+rule);
  })

  //点击添加产品按钮
  $("#add_goods").click(function(){
    addGoods();
  })

  //点击添加必填信息
  $("#add_info").click(function(){
      addInfo();
  })

  //输入信息之后同步到手机预览里
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


  sed.addListener('selectionchange',function(){
    changePhonePreView();
  })


  //改变手机预览
  function changePhonePreView(){

    var title=$("#title").val();
    if(!Utils.checkNotEmpty(title)){
      title="标题";
    }
    var subtitle=$("#subtitle").val();
    if(!Utils.checkNotEmpty(subtitle)){
      subtitle="副标题";
    }

    //亮点
    var charArr=new Array();
    $('.char_i').each(function(index,domEle){
      if(Utils.checkNotEmpty(domEle.value)){
        charArr.push(domEle.value);
      }
    });
    var charStr='';

    for(var i=0;i<charArr.length;i++){
      charStr+='<div class="char_item"><span>'+charArr[i]+'</span></div>';
    }
    $("#char_list").html(charStr);

    var address='地址';
    var province=$("#province").val();
    var city=$("#city").val();
    var area=$("#area").val();
    if(province!='请选择'&&city!='请选择'&&area!='请选择'){
      address=province+city+area;
    }
    var nprice=$("#nprice").val();
    if(!Utils.checkNotEmpty(nprice)){
      nprice='价格';
    }else{
      nprice='￥'+nprice;
    }

    var oprice=$("#oprice").val();
    if(!Utils.checkNotEmpty(oprice)){
      oprice='';
    }else{
      oprice='￥'+oprice;
    }

    var addressDetail=$("#address_detail").val();
    if(!Utils.checkNotEmpty(addressDetail)) {
      addressDetail = '详细地址';
    }

    //将简介、内容等信息添加到手机预览里
    var tabIndex=$(".tab_c").index($(".tab_active"));
    if(tabIndex==0){
      $("#goods_d").html(sed.getContent());
    }else if(tabIndex==1){
      $("#goods_d").html(ced.getContent());
    }else if(tabIndex==2){
        var a='<div class="goods_rule_v">' +
          '<span class="title">— 有效期 —</span>' +
          '<span class="subtitle" id="validityT">2015.01.01 - 2016.01.01</span>' +
          '<span class="title">— 预约信息 —</span>' +
          '<span class="subtitle" id="reservationT">需提前一天预约</span>' +
          '<span class="title">— 规则提醒 —</span>' +
          '<span class="subtitle" id="ruleT">不与其他优惠叠加</span>' +
          '<span class="title">— 温馨提示 —</span>' +
          '<span class="subtitle" id="tipsT">如需开发票，请在用餐时咨询商户</span>' +
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
    $(".pre_address").html(address);
    $(".oprice").html(oprice);
    $(".nprice").html(nprice);
    $("#address_detailT").html(addressDetail);
    $("#phoneNumT").html(phoneNum);

    $("#validityT").html(validity);
    $("#reservationT").html(reservation);
    $("#ruleT").html(rule);
    $("#tipsT").html(tips);
    $("#timeTips").html(timeTips);

  }

  function addPreviewImage(objId){
    var a='<div class="swiper-slide" id="'+objId+'"><img class="sw_image" src="'+__uri("../images/order_test.png")+'"></div>';
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
        '<img class="delete delete_image" src="'+__uri("../images/delete_ico.png")+'">' +
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
      '<img class="delete delete_rule" src="'+__uri("../images/delete_ico.png")+'">' +
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
      '<img class="delete delete_goods" src="'+__uri("../images/delete_ico.png")+'">' +
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
      '<img class="delete delete_info" src="'+__uri("../images/delete_ico.png")+'">' +
      '</div>';
    $("#add_info").before(a);
    $(".delete_info").unbind().bind("click",function(){
      $(this).parent().remove();
    });
  }


  $(".pro_item").on("click",function(){
    changeBGStyle($(this));

  })
  $("#right_btn").click(function(){
    $('.left_list .pro_item').each(function (i,obj){
      if($(obj).hasClass("pro_active")){
        $(".left_list").find(obj).remove();
        $(".right_list").append(obj);
        $(obj).unbind().bind("click",function(){
          changeBGStyle(obj);
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
          changeBGStyle(obj);
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
  $("#goood_cancel").click(function(){
	  window.location.reload();
  });
  
  //点击保存按钮
  $("#good_save").click(function(){
	  var productNameCn = $("#title").val();
	  var productFname = $("#subtitle").val();
	  var cateoryId = $("#cateory option:selected").val();
	  var price = $("#oprice").val();
	  var salePrice = $("#nprice").val();
	  var count = $("#count").val();
	  var stock1 = $("#stock1").val();
	  var province = $("#province").val();
	  var city = $("#city").val();
	  var area = $("#area").val();
	  var address_detail = $("#address_detail").val();
	  var phoneNum = $("#phoneNum").val();

	  var productPic = [];  //图片
	  for(var i=0;i<$(".image_list").children().length;i++){
		  var pic = $(".image_list").children()[i].children[0].src;
		  productPic.push(pic);
	  }
	  var productPics = productPic.join(",");
	  
	  //特色亮点
	  var char = [];
	  for(var i=0;i<$(".char_i").length;i++){
		  var con = $(".char_i").eq(i).val();
		  char.push(con);
	  }
	  var highlights = char.join(";");
	  
	  var time_start = $("#time_start").val();
	  var time_end = $("#time_end").val();
	  var validity = $("#validity").val();
	  var reservation = $("#reservation").val();
	  var rule = $("#rule").val();
	  var tips = $("#tips").val();
	  
	  var discount = []; //折扣规则
	  for(var i=0;i<$(".rule_list_v").children().length;i++){
		  var start1 = $(".rule_list_v").children()[i].children[1].children[0].value;
		  var start2 = $(".rule_list_v").children()[i].children[3].children[0].value;
		  var start3 = $(".rule_list_v").children()[i].children[5].children[0].value;
		  var data = {"start1":start1,"start2":start2,"start3":start3};
		  discount.push(data);
	  }
	  var discountRule = JSON.stringify(discount);
	  
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
	  
	  var transaction = $("#transaction option:selected").val(); //交易方式
	  var logistics = $("input[name='rdo_wl']:checked").next().text();  //物流
	  
	  var infos = [];  //报名信息
	  for(var i=0;i<$(".info_list_v").children().length-1;i++){
		  var info = $(".info_list_v").children()[i].children[0].value;
		  infos.push(info);
	  }
	  var signUp = infos.join(",");
      
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

	  var data = {};
	  doPost("",data,addGoodSuccess);
  });
	  
  var addGoodSuccess = function(){
	  alert("保存成功！");
  }
})
