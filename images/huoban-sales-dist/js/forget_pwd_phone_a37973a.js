$(function(){$("a[class='fpp_btn']").click(function(){var t=$("#mobilePhoneNo").val(),o={telephoneNumber:t};doPost("/huoban-sales/http/sales/userlogin/sendSMS.do",o)});var t=function(t){var o=t.data,e=o.id;window.location.href="forget_pwd_validate.html?id="+e};$("#fp_phone_next").click(function(){var o=$("#accountNo").val().trim();if(!Utils.checkNotEmpty(o))return void alert("请填写账号");var e=$("#mobilePhoneNo").val().trim();if(!Utils.checkNotEmpty(e))return void alert("请填写用户名预留手机号");if(Utils.checkPhoneNumber(e)){var i=$("#randomCode").val().trim();if(!Utils.checkNotEmpty(i))return void alert("请填写验证码");if(checkAuthCode(i)){var a={loginName:o,tel:e,smsMsg:i};doPost("/huoban-sales/http/sales/userlogin/resetPwd_yz.do",a,t)}}}),$("#forward_btn").click(function(){history.go(-1)})});