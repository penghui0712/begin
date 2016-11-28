/**
 * Created by lwb on 2016/7/20.
 */
$(function(){
  checkLogin();

  $("#re_login_btn").click(function(){
      window.location.href="login.html";
  })
  $("#re_forget_btn").click(function(){
      window.location.href="forget_pwd.html";
  })


  function checkLogin(){
     if(getLoginStatus()==null){
       $("#rc_left_v").hide();
       $("#is_login_v").hide();
       $("#rc_other_v").show();
     }else{
        $("#rc_left_v").show();
        $("#is_login_v").show();
        $("#rc_other_v").hide();
     }
  }
})
