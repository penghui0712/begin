/**
 * Created by lwb on 2016/7/20.
 */
$(function(){
    $("#login_btn").click(function(){
      window.location.href="login.html";
    });
   $("#register_btn").click(function(){
      window.location.href="register_choose.html";
    });
   $("#fp_phone_btn").click(function(){
      window.location.href="forget_pwd_phone.html";
   });
  $("#fp_phone_mail").click(function(){
    window.location.href="forget_pwd_mail.html";
  });
  $("#fp_phone_ss").click(function(){
    window.location.href="forget_pwd_ss.html";
  });

});
