/**
 * Created by lwb on 2016/7/21.
 */
$(function(){



    $(".ml_menu_btn").click(function(){
      if(!$(this).hasClass("active")){
        var index=$(".ml_menu_btn").index($(this));
        $(this).addClass("active");
        $(this).find(".right_ic").show();
        $(".ml_menu_btn").not($(this)).find(".right_ic").hide();
        $(".ml_menu_btn").not($(this)).removeClass("active");
        $.each($(".ml_menu_btn"), function(i, item){
          $(item).find(".left_ic").attr("src",$(item).find(".left_ic").attr("src").replace("_hover.png",".png"));
        });
        $(this).find(".left_ic").attr("src",$(this).find(".left_ic").attr("src").replace(".png","_hover.png"));
        $.each($(".panel-collapse"), function(i, item){
          if(i==index){
            /*$(item).collapse('show');*/
            $(item).addClass("collapse in");
          }else{
            $(item).removeClass("in");
            /*$(item).collapse('hide');*/
          }
        });
      }
    })
    $(".sec_menu").click(function(){
      $(this).addClass("sec_menu_active");
      $(".sec_menu").not($(this)).removeClass("sec_menu_active");
    })
    setMenuStyle();

    function setMenuStyle(){
      var pi=getParameter("pi");
      var ci=getParameter("ci");
      $(".ml_menu_btn").eq(pi).click();
      $(".collapse").eq(pi).find(".sec_menu").eq(ci).addClass("sec_menu_active");;
    }
})
