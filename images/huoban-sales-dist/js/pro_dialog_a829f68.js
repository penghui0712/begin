$(function(){function i(i){$(i).addClass("pro_active"),$(".pro_item").not($(i)).removeClass("pro_active")}$(".pro_item").on("click",function(){i($(this))}),$("#right_btn").click(function(){$(".left_list .pro_item").each(function(t,n){$(n).hasClass("pro_active")&&($(".left_list").find(n).remove(),$(".right_list").append(n),$(n).unbind().bind("click",function(){i(n)}))})}),$("#left_btn").click(function(){$(".right_list .pro_item").each(function(t,n){$(n).hasClass("pro_active")&&($(".right_list").find(n).remove(),$(".left_list").append(n),$(n).unbind().bind("click",function(){i(n)}))})})});