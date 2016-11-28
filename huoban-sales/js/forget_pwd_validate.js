/**
 * Created by lwb on 2016/7/21.
 */
$(function(){
  $("#forward_btn").click(function(){
    history.go(-1);;
  });
  
  var validateSuccess= function(datas){
	  window.location.href="forget_pwd_success.html";
  }
  
  $("#fp_phone_next").click(function(){
    
    var password=$("#newPwd").val().trim();
    if(!Utils.checkNotEmpty(password)){
      alert("请填写新的密码");
      return;
    }
    
    var pwd2=$("#confirmPwd").val().trim();
    if(!Utils.checkNotEmpty(pwd2)){
      alert("请填写确认密码");
      return;
    }
    //验证两次密码是否一致
    if(!checkRepeatPassword(password,pwd2)){
    	return;
    }
    id = Utils.getUrlParam("id");
    var data = {"password":password,"pwd2":pwd2,"id":id};
    doPost("/huoban-sales/http/sales/userlogin/resetPwd.do",data,validateSuccess);
    
  });

})
