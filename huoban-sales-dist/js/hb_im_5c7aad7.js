/**
 * Created by lwb on 2016/9/19.
 */
$(function(){
  $('#friend-list').perfectScrollbar();
  $('#chat-list').perfectScrollbar();
  $('#record-list').perfectScrollbar();

  laydate({
    elem: '#record-start-date',
    istime: false, //是否开启时间选择
    isclear: false, //是否显示清空
    istoday: false //是否显示今天

  })

  laydate({
    elem: '#record-end-date',
    istime: false, //是否开启时间选择
    isclear: false, //是否显示清空
    istoday: false //是否显示今天
  })

  $("#left-date-btn").click(function(){
    $("#record-start-date").click();
  })
  $("#right-date-btn").click(function(){
    $("#record-end-date").click();
  })

  $('.collapse').on('show.bs.collapse', function () {
      var index=$('.collapse').index($(this));
      $(".arrow-img").eq(index).attr("src","../images/im_arrow_up.png");
  })
  $('.collapse').on('hide.bs.collapse', function () {
    var index=$('.collapse').index($(this));
    $(".arrow-img").eq(index).attr("src","../images/im_arrow_down.png");
  })

  //好友
  $(".item").click(function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".item").not($(this)).removeClass("active");

    }
  })

  $(".record-btn").click(function(){
    if(!$(this).hasClass("active")){
      changeStyle(".record-btn",$(this));
    }
  })


  function changeStyle(objClass,obj){
      $(objClass).each(function(index,element){
        if($(element).hasClass("active")){
          $(element).find("img").attr("src",$(element).find("img").attr("src").replace("_checked.png",".png"));
          $(element).removeClass("active");
        }
      });
      $(obj).find("img").attr("src",$(obj).find("img").attr("src").replace(".png","_checked.png"));
      $(obj).addClass("active");
  }


  $("#chat-record").click(function(){

    if($(this).hasClass("active")){
      $("#chat-view").animate({width:"875px"});
      $(this).removeClass("active")
    }else{
      $("#chat-view").animate({width:"524px"});
      $(this).addClass("active");
    }
/*    $('#friend-list').perfectScrollbar("update");
    $('#chat-list').perfectScrollbar("update");
    $('#record-list').perfectScrollbar("update");*/

  })


  //左侧menu
  $(".menu-btn").click(function(){
    if(!$(this).hasClass("active")){
      changeStyle(".menu-btn",$(this));

      changeLeftTab($(".menu-btn").index($(this)));
    }
  });


  //左侧menu  0 最近联系人 1 好友列表 2 群组列表
  function changeLeftTab(index){

  }

})
