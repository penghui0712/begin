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
  $(".hdsource-a").click(function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".hdsource-a").not($(this)).removeClass("active");
    }
  })

  try {
    var i, et = document.getElementById('tags').childNodes;
    for (i in et) {
      et[i].nodeName == 'A' && et[i].addEventListener('click', function (e) {
        e.preventDefault();
      });
    }

    TagCanvas.Start('myCanvas', 'tags', {
      textColour: '#222',
      outlineColour: '#ebebeb',
      reverse: false,
      depth: 2.8,
      dragControl: false,
      decel:0.95,
      maxSpeed: 0.05,
      initial: [-0.1, 0]
    });
  } catch (e) {
    // something went wrong, hide the canvas container
    //document.getElementById('myCanvasContainer').style.display = 'none';
  }
})
