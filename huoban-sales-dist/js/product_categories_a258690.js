/**
 * Created by lwb on 2016/7/22.
 */
$(function(){
	//鼠标放到删除键和离开删除键切换图片
    $(".sc_del").mouseover(function(){
      $(this).attr("src","../images/delete-hover.png");
    })
    $(".sc_del").mouseleave(function(){
      $(this).attr("src","../images/delete.png");
    })
    //点击笔图片，将标题栏隐藏，文本框出现并光标集中
    $(".up_i").click(function(){
        $(this).siblings(".sec_title").hide();
        $(this).siblings(".sec_input").show();
        $(this).siblings(".sec_input").focus();
    })


    //光标切换时，将标题显示，当前的文本框隐藏
    $(".sec_input").blur(function(){
       $(this).siblings(".sec_title").show();
       $(this).hide();
    });

    //点击加入产品，将模态框显示出来
    $(".sc_add").click(function(){
        $("#add_product_dialog").modal('show')
    });

    //点击模态框里面选中的内容，加上样式，离开去掉样式
    $(".pro_item").click(function(){
        var index=$(".pro_item").index($(this));
        $(this).addClass("pro_active");
        !$(".pro_item").not($(this)).removeClass("pro_active");
    })
})
