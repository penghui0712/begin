$(function(){function o(){null==getLoginStatus()?($("#rc_left_v").hide(),$("#is_login_v").hide(),$("#rc_other_v").show()):($("#rc_left_v").show(),$("#is_login_v").show(),$("#rc_other_v").hide())}o(),$("#re_login_btn").click(function(){window.location.href="login.html"}),$("#re_forget_btn").click(function(){window.location.href="forget_pwd.html"})});