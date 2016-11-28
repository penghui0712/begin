/**
 * Created by lwb on 2016/9/27.
 */
$(function(){

  $(".tab").click(function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".tab").not($(this)).removeClass("active");
    }
  })
  $(".tab-pro").click(function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".tab-pro").not($(this)).removeClass("active");
    }
  })



})
