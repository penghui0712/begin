/**
 * Created by lwb on 2016/7/19.
 */
$(function(){
    $("#register_btn").click(function(){
        window.location.href="register_choose.html";
    });

    $("#forget_btn").click(function(){
        window.location.href="forget_pwd.html";
    });

    var loginSuccess=function(datas){
        alert("登录成功");
        setLoginStatus(1);
        var result = datas.data;
        var sellId = result.id;
        window.location.href="products_categories.html?sellId="+sellId;
    }

    $("#login_btn").click(function(){

      var userName=$("#userName").val();
      if(!Utils.checkNotEmpty(userName)){
        alert("请填写用户名");
        return;
      }

      var pwd=$("#userPwd").val();
      if(!Utils.checkNotEmpty(pwd)){
        alert("请填写密码");
        return;
      }
      var randomCode=$("#randomCode").val();
      if(!Utils.checkNotEmpty(randomCode)){
        alert("请填写验证码");
        return;
      }

      var data={loginName:userName,password:pwd,randomCode:randomCode};
      doPost("/huoban-sales/http/sales/userlogin/login.do",data,loginSuccess);
    });

    $("#change_code").click(function(){
        var url="/huoban-sales/http/image/validate/drawRandom.do?"+Math.random()
        $("#img_code").attr("src",url);
    })


});
