/**
 * Created by lwb on 2016/8/1.
 */
$(function(){
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

})
