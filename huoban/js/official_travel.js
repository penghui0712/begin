/**
 * Created by lwb on 2016/9/9.
 */
$(function(){
  var swiper = new Swiper('#banner-swiper', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 2500,
    centeredSlides: true,
    loop:true,
    autoplayDisableOnInteraction: false
  });
  $(".dest-a").click(function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".dest-a").not($(this)).removeClass("active");
    }
  })
})
