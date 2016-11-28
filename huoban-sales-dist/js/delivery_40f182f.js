/**
 * Created by lwb on 2016/8/4.
 */
$(function(){

  $(".add").on("click",function(){
    createShipmentElement();
  });

  $(".del").on("click",function(){
    console.log($(this))
    delShipmentElement($(this));
  });

  function delShipmentElement(obj){
    $(obj).parent().remove();
  }

  function createShipmentElement(){
    var a='<div class="shipment_item"><select><option>顺丰速递</option></select><div class="shipment_detail_v"><span class="title">快递单号</span><input class="input" type="text"></div><a class="del">－</a><a class="add">＋</a></div>';
    $(".shipment_list").append(a);
    $(".add").unbind().bind("click",function(){
      createShipmentElement()
    });
    $(".del").unbind().bind("click",function(){
      delShipmentElement($(this))
    });
  }

})
