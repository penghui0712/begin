/**
 * Created by lwb on 2016/7/21.
 */
$(function(){
	
    $("a[class='fpp_btn']").click(function(){
    	var telephoneNumber = $("#mobilePhoneNo").val();
    	var data = {"telephoneNumber":telephoneNumber};
    	doPost("/huoban-sales/http/sales/userlogin/sendSMS.do",data);
    });
    
    var forgetSuccess = function(datas){
    	 var data = datas.data;
    	 var id = data.id;
    	 window.location.href="forget_pwd_validate.html?id="+id;
   }
	  
   $("#fp_phone_next").click(function(){

	    var loginName=$("#accountNo").val().trim();
	    if(!Utils.checkNotEmpty(loginName)){
	        alert("请填写账号");
	        return;
	    }
	    
	    var tel=$("#mobilePhoneNo").val().trim();
	    if(!Utils.checkNotEmpty(tel)){
	        alert("请填写用户名预留手机号");
	        return;
	    }
	    //验证手机号码格式是否正确 
        if(!Utils.checkPhoneNumber(tel)){
        	return;
        }
        
	    var smsMsg=$("#randomCode").val().trim();
	    if(!Utils.checkNotEmpty(smsMsg)){
	        alert("请填写验证码");
	        return;
	    }
	    //验证验证码长度(6位)
        if(!checkAuthCode(smsMsg)){
        	return;
        }
	    
	    var data = {"loginName":loginName,"tel":tel,"smsMsg":smsMsg};
	    doPost("/huoban-sales/http/sales/userlogin/resetPwd_yz.do",data,forgetSuccess);

   });

  $("#forward_btn").click(function(){
    history.go(-1);;
  });

})
