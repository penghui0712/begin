/**
 * Utils class
 *
 * 该文件会根据debug版本或dist版进行编译
 */

var IMAGE_PATH="http://image.huoban.asia/";


(function() {
    var ErrorCode = {};
    ErrorCode.BadRequest = 400;
    ErrorCode.Unauthorized = 401;
    ErrorCode.RequestError = 404;
    ErrorCode.InternalError = 500;

    window["ErrorCode"] = ErrorCode;
})();



(function() {
    // author: meizz
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function(fmt) {
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }
})();


//解决IE8没有IndexOf的问题
(function() {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this && this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
})();

/**
 * 消息中心
 * 需要监听消息的组件，在初始化时需要将this添加到listeners，即 MessageCenter.addListener(this);
 * 向外广播消息，调用MessageCenter.post(message,data,sender)
 * 组件中添加receiveMessage用于接收消息
 */
(function() {
    var MessageCenter = {};
    var listeners = [];
    MessageCenter.addListener = function(listener) {
        listeners.push(listener);
    }
    MessageCenter.post = function(message, data, sender) {
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i].receiveMessage != null) {
                if (sender != listeners[i])
                    listeners[i].receiveMessage(message, data);
            }
        }
    }
    window["MessageCenter"] = MessageCenter;
})();



(function() {
    var Utils = {};

    //包装请求的参数，可接受url,data,type
    //
    Utils.getReqParams = function(url, data, type) {
        var _url = url,
            _data = data,
            _type = type;
        var reqParams = {
            "url": _url,
            "dataType": "json",
            "type": _type
        };

        if (_type == undefined) {
            _type = "POST";
            reqParams.type = _type;
        }



        reqParams.data = JSON.stringify(_data);

        return reqParams;
    }

    //获取当前登陆用户
    Utils.getLoginUser = function() {
        if ($.cookie("user_id") == null)
            return null;
        return {
            username: $.cookie("user_name"),
            userID: $.cookie("user_id"),
            login: true
        }
    }

    //获取网页url中指定参数的值
    Utils.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }

    Utils.getLastPageUrl = function(){
        var referrer = document.referrer;
        var domain = document.domain;
        if (referrer.indexOf("login") >= 0 ||
            referrer.indexOf("register") >= 0 ||
            referrer.indexOf("logout") >= 0 ||
            referrer.indexOf("forgetpw") >= 0)
            return "/";
        if (referrer.indexOf(domain) >= 0) {
            return referrer;
        }
        return "/";
    }

    //Ajax请求错误时的处理
    Utils.handleErrors = function(req, handles, notHandles) {
        if (req.status == ErrorCode.Unauthorized &&
            ((handles == null) || (handles.indexOf(ErrorCode.Unauthorized) >= 0)) &&
            ((notHandles == null) || (notHandles.indexOf(ErrorCode.Unauthorized) < 0 ))) {
                window.location.href = "/login.html";
            }
        if (req.status == ErrorCode.RequestError &&
            ((handles == null) || (handles.indexOf(ErrorCode.RequestError) >= 0)) &&
            ((notHandles == null) || (notHandles.indexOf(ErrorCode.RequestError) < 0 ))) {
                Utils.alert(req.responseText);
            }
        if (req.status == ErrorCode.InternalError &&
            ((handles == null) || (handles.indexOf(ErrorCode.InternalError) >= 0)) &&
            ((notHandles == null) || (notHandles.indexOf(ErrorCode.InternalError) < 0 ))) {
                Utils.alert("服务器错误！");
            }
    }


    //检查手机号码是否符合要求
    Utils.checkPhoneNumber = function(str) {
        var reg = /^[1][0-9]{10}$/;
        if (!reg.test(str)) {
            Utils.alert("请输入正确的手机号");
            return false;
        }
        return true;
    }

    //检查密码码是否符合要求
    Utils.checkPassword = function(str) {
        var reg = /^.{6,16}$/;
        if (!reg.test(str)) {
            Utils.alert("密码长度需要为6-16位");
            return false;
        }
        return true;
    }

    //检查是否为空
    Utils.checkNotEmpty = function(str) {
        if (str != null && str.length > 0&&str!='')
            return true;
        return false;
    }

    //检查是否为数字
    Utils.checkNumber = function(str) {
        var reg = /^\d*$/;
        if (!reg.test(str)) {
            Utils.alert("请输入数字");
            return false;
        }
        return true;
    }

    //检查是否为手机浏览器
    Utils.isMobileBrowser = function() {
        var ua = navigator.userAgent.toLowerCase();
        var ipad = ua.match(/(ipad).*os\s([\d_]+)/),
            isIphone = !ipad && ua.match(/(iphone\sos)\s([\d_]+)/),
            isAndroid = ua.match(/(android)\s+([\d.]+)/);
        var isMobile = isIphone || isAndroid;
        return isMobile;
    }

    //alert
    Utils.alert = function(message) {
        alert(message);
    }

    Utils.alertNotOpen = function() {
        Utils.alert('亲，对不起，该功能还未开放，2016年初即将与您见面哦！但是您可以预先注册，领取新年活动首月免单优惠，或拨打400-999-8873获得最新活动资讯！')
    }

    //生成最近7天的日期（18点之后为第三天开始的7天）
    Utils.createReservationDates = function() {
        //填充日期，7天
        var now = new Date();
        var dates = [];
        if (now.getHours() >= 18)
            now = new Date(now.getTime() + 86400 * 1000);
        for (var i = 1; i <= 7; i++) {
            var date = new Date(now.getTime() + 86400 * 1000 * i);
            dates.push(date);
        }
        return dates;
    }

	 //生成最近3天的日期（18点之后为第三天开始的3天）
    Utils.createReservationDates3 = function() {
        //填充日期，3天
        var now = new Date();
        var dates = [];
        if (now.getHours() >= 18)
            now = new Date(now.getTime() + 86400 * 1000);
        for (var i = 1; i <= 3; i++) {
            var date = new Date(now.getTime() + 86400 * 1000 * i);
            dates.push(date);
        }
        return dates;
    }

    //生成预约天数（30-720，间隔30天）
    Utils.createReservationDays = function() {
        var days = [];
        for (var i = 30; i <= 720; i += 30) {
            days.push(i);
        }
        return days;
    }

    //return container's height >= elements' height
    //indicates whether the images is loaded
    Utils.adjustElementVerticalCenter = function(ele) {
        var minpx = 0, maxpx = 10000;
        if (ele.attr("vcenter-container") == null)
            return;
        if ($(ele).attr("vcenter-min-width") != null)
            minpx = +$(ele).attr("vcenter-min-width");
        if ($(ele).attr("vcenter-max-width") != null)
            maxpx = +$(ele).attr("vcenter-max-width");
        var w = document.body.clientWidth;

        if (! (w >= minpx && w <= maxpx)) {
            ele.css("top", 0);
            return;
        }

        var container = $(ele.attr("vcenter-container"));

        var top = (container.height() - ele.height()) / 2;
        ele.css("position", "relavite");
        ele.css("top", top + "px");

        return container.height() >= ele.height();
    }

    window["Utils"] = Utils;
})();

function getParameter(param)
{
    var query = decodeURI(window.location.search);//获取URL地址中？后的所有字符
    var iLen = param.length;//获取你的参数名称长度
    var iStart = query.indexOf(param);//获取你该参数名称的其实索引
    if (iStart == -1)//-1为没有该参数
        return "";
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart);//获取第二个参数的其实索引
    if (iEnd == -1)//只有一个参数
        return query.substring(iStart);//获取单个参数的参数值
    return query.substring(iStart, iEnd);//获取第二个参数的值
}
//显示登录窗口
function showLoginDialog(){
    if($("#loginView").length==0){
        var a='<div class="modal fade" id="loginView" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            ' <div class="modal-lg_cust">' +
            '<div class="modal-lg_cust">' +
            '<div><div class="dia_view"><div><button type="button" class="closec"data-dismiss="modal" aria-hidden="true"> &times; </button></div>' +
            '<div class="log_view">' +
            '<div><span class="lspan">登录</span></div><div class="l_c"><input id="phone_number" type="text" class="ltext" placeholder="请输入手机号"/></div><div class="l_c1"><input id="pwd" type="password" class="ltext" placeholder="请输入密码"/></div><div class="l_c4"><a id="forgetPwd">忘记密码？</a></div><div class="l_c2"><a id="login_b" class="lsty">登录</a></div>' +
            '<div class="l_c3"><span>还没有账号？</span><a id="reg_btn">立即注册</a></div>' +
            '</div>' +
            '</div>' +
            '<img src="img_2/window.png" class="dialog_bg">' +
            '</div></div> </div></div>';
        $("body").append(a);

        $("#reg_btn").click(function(){
            $("#loginView").modal("hide")
            showReigsterDialog();
        });
        $("#login_b").click(function(){
            var phone_number=$("#phone_number").val();
            var pwd=$("#pwd").val();
            var loginCallback=function(data){
                $("#loginView").modal("hide");
                setLoginState(true);
            };
            if(!Utils.checkPhoneNumber(phone_number)){
                return;
            }
            if (!Utils.checkNotEmpty(pwd)) {
                Utils.alert("密码不能为空")
                return;
            }
            var data={
                telephoneNumber : phone_number,
                password : pwd};
            doPost("/site-app/http/app/user/login.do",data,loginCallback);
        });

        $("#forgetPwd").click(function(){
            $("#loginView").modal("hide")
            forgetPwdView();
        })

    }
    $("#loginView").modal().css({

    });
}

function forgetPwdView(){
    if($("#forgetView").length==0){
        var a='<div class="modal fade" id="forgetView" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            ' <div class="modal-lg_cust">' +
            '<div class="modal-lg_cust">' +
            '<div><div class="dia_view"><div><button type="button" class="closec"data-dismiss="modal" aria-hidden="true"> &times; </button></div>' +
            '<div class="reg_view">' +
            '<div><span class="lspan">找回密码</span></div><div class="l_c"><input id="forget_telephone" type="text" class="ltext" placeholder="请输入手机号"/></div><div class="l_c1"><div class="tcell"><div class="tcell_1"><input id="forget_code" type="text" class="ltext stext" placeholder="请输入验证码"/></div><div class="tcell_2"><a id="ffsyzm" class="lsty2">发送验证码</a></div></div></div><div class="l_c1"><input id="forget_password" type="password" class="ltext" placeholder="请输入新密码"/></div><div class="l_c1"><input id="forget_repassword" type="password" class="ltext" placeholder="再次输入密码"/></div><div class="l_c2"><a class="lsty" id="forget_btn">确定</a></div>' +
            '' +
            '</div>' +
            '</div>' +
            '<img src="img_2/window.png" class="dialog_bg">' +
            '</div></div> </div></div>';
        $("body").append(a);
        $("#ffsyzm").click(function(){
            var phoneNumber = $("#forget_telephone").val();
            if (!Utils.checkPhoneNumber(phoneNumber)) {
                return;
            }
            if($("#ffsyzm").hasClass('disabled')){
                return false;
            }
            $("#forgetView").modal("hide");
            showforgetValiDialog();
        })
        $("#forget_btn").click(function() {
            var phoneNumber = $("#forget_telephone").val(),
                code = $("#forget_code").val(),
                pw = $("#forget_password").val(),
                pw2 = $("#forget_repassword").val();
            if (!(Utils.checkPhoneNumber(phoneNumber) && checkAuthCode(code) && Utils.checkPassword(pw) && checkRepeatPassword(pw, pw2))){
                return;
            }

            var forSuccess=function(){
                $("#forgetView").modal("hide");
                showSuccessDialog("修改成功");
            }
            doPost('/site-app/http/app/user/retrievePwd.do',{
                    telephoneNumber : phoneNumber,
                    smsMsg:code,
                    newPassword:pw
                }
                ,forSuccess);
/*          var regSuccess=function(){
                $("#regView").modal("hide");
                showSuccessDialog("注册成功");
                setLoginState(true);
            }
            doPost("/site-app/http/app/user/register.do",{telephoneNumber : phoneNumber,
                smsMsg:code,
                password:pw},regSuccess);*/

        })
    }
    $("#forgetView").modal().css({

    });
}

//验证重复密码
function checkRepeatPassword(pw1, pw2) {
    if (pw1 != pw2) {
        Utils.alert("两次密码输入不一致");
        return false;
    }
    return true;
}

//验证短信验证码
function checkAuthCode(code) {
    if (code == null || code.length != 6) {
        Utils.alert("验证码长度为6位");
        return false;
    }
    return true;
}

var islogin=false;

//设置登录状态
function setLoginState(f){
    islogin=f;
    if(f) {
        $(".user_c").addClass("dbshow");
        $(".login_i").removeClass("dbshow");

    }else{
        $(".user_c").removeClass("dbshow");
        $(".login_i").addClass("dbshow");
    }
}
//显示注册窗口
function showReigsterDialog(){
    if($("#regView").length==0){
        var a='<div class="modal fade" id="regView" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            ' <div class="modal-lg_cust">' +
            '<div class="modal-lg_cust">' +
            '<div><div class="dia_view"><div><button type="button" class="closec"data-dismiss="modal" aria-hidden="true"> &times; </button></div>' +
            '<div class="reg_view">' +
            '<div><span class="lspan">注册</span></div><div class="l_c"><input id="register_telephone" type="text" class="ltext" placeholder="请输入手机号"/></div><div class="l_c1"><div class="tcell"><div class="tcell_1"><input id="register_code" type="text" class="ltext stext" placeholder="请输入验证码"/></div><div class="tcell_2"><a id="fsyzm" class="lsty2">发送验证码</a></div></div></div><div class="l_c1"><input id="register_password" type="password" class="ltext" placeholder="请输入密码"/></div><div class="l_c1"><input id="register_repassword" type="password" class="ltext" placeholder="再次输入密码"/></div><div class="l_c2"><a class="lsty" id="register_btn">注册并登录</a></div>' +
            '' +
            '</div>' +
            '</div>' +
            '<img src="img_2/window.png" class="dialog_bg">' +
            '</div></div> </div></div>';
        $("body").append(a);
        $("#fsyzm").click(function(){
            var phoneNumber = $("#register_telephone").val();
            if (!Utils.checkPhoneNumber(phoneNumber)) {
                return;
            }
            if($("#fsyzm").hasClass('disabled')){
                return false;
            }
            $("#regView").modal("hide");
            showValiDialog();
        })
        $("#register_btn").click(function() {
            var phoneNumber = $("#register_telephone").val(),
                code = $("#register_code").val(),
                pw = $("#register_password").val(),
                pw2 = $("#register_repassword").val();
            if (!(Utils.checkPhoneNumber(phoneNumber) && checkAuthCode(code) && Utils.checkPassword(pw) && checkRepeatPassword(pw, pw2))){
                return;
            }
            var regSuccess=function(){
                $("#regView").modal("hide");
                showSuccessDialog("注册成功");
                setLoginState(true);
            }
            doPost("/site-app/http/app/user/register.do",{telephoneNumber : phoneNumber,
                smsMsg:code,
                password:pw},regSuccess);

        })
    }
    $("#regView").modal().css({

    });
}
//显示注册验证码窗口
function showValiDialog(){
    if($("#valid").length==0){
        var a='<div class="modal fade" id="valid" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            ' <div class="modal-lg_cust">' +
            '<div class="modal-lg_cust">' +
            '<div><div class="dia_view"><div><button type="button" class="closec" id="close_b"> &times; </button></div>' +
            '<div class="log_view">' +
            '<div><span class="lspan">请输入图形验证码</span></div>' +
            '<div class="vali_v"><div class=""><input id="validate_code" type="text" class="vtext" placeholder="请输入验证码"/></div><div><img id="vaimg" class="valiimg" src="/site-app/http/image/validate/drawRandom.do"></div></div>' +
            '<div class="l_c2"><a id="sure_b" class="phone_a_s">确定</a></div>' +
            '</div>' +
            '</div>' +
            '<img src="img_2/window.png" class="dialog_bg">' +
            '</div></div> </div></div>';
        $("body").append(a);
        $("#sure_b").click(function(){

            var vcode=$("#validate_code").val();
            if (!Utils.checkNotEmpty(vcode)) {
                Utils.alert("请填写验证码")
                return;
            }

            var isValidate=function(){
                $("#valid").modal("hide");
                showReigsterDialog();
                sendFCode();
            }

            doPost("/site-app/http/app/user/validateCode.do",{randomCode : vcode},isValidate);

        })
        $("#close_b").click(function(){
            $("#valid").modal("hide");
            showReigsterDialog();
        })
        $("#vaimg").click(function(){
            $(this).attr('src','/site-app/http/image/validate/drawRandom.do?ran='+Math.random());
        })
    }
    $("#valid").modal().css({

    });
}


//显示忘记密码验证码窗口
function showforgetValiDialog(){
    if($("#forget_valid").length==0){
        var a='<div class="modal fade" id="forget_valid" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            ' <div class="modal-lg_cust">' +
            '<div class="modal-lg_cust">' +
            '<div><div class="dia_view"><div><button type="button" class="closec" id="forget_close_b"> &times; </button></div>' +
            '<div class="log_view">' +
            '<div><span class="lspan">请输入图形验证码</span></div>' +
            '<div class="vali_v"><div class=""><input id="forget_validate_code" type="text" class="vtext" placeholder="请输入验证码"/></div><div><img id="forget_vaimg" class="valiimg" src="/site-app/http/image/validate/drawRandom.do"></div></div>' +
            '' +
            '<div class="l_c2"><a id="forget_sure_b" class="phone_a_s">确定</a></div>' +
            '</div>' +
            '</div>' +
            '<img src="img_2/window.png" class="dialog_bg">' +
            '</div></div> </div></div>';
        $("body").append(a);
        $("#forget_sure_b").click(function(){

            var vcode=$("#forget_validate_code").val();
            if (!Utils.checkNotEmpty(vcode)) {
                Utils.alert("请填写验证码")
                return;
            }

            var isValidate=function(){
                $("#forget_valid").modal("hide");
                forgetPwdView();
                sendFFCode();
            }

            doPost("/site-app/http/app/user/validateCode.do",{randomCode : vcode},isValidate);

        })
        $("#forget_close_b").click(function(){
            $("#forget_valid").modal("hide");
            forgetPwdView();
        })
        $("#forget_vaimg").click(function(){
            $(this).attr('src','/site-app/http/image/validate/drawRandom.do?ran='+Math.random());
        })
    }
    $("#forget_valid").modal().css({

    });
}


function sendFCode(){
    var phoneNumber = $("#register_telephone").val();
    var vcode=$("#validate_code").val();
    var $obj=$("#fsyzm");
    if($obj.hasClass('disabled')){
        return false;
    }
    var sendSuccess=function(){
        $obj.addClass('disabled');
        var leftSecond=60;
        $obj.html(leftSecond+'秒后重新发送')
        var t=setInterval(function(){
            if(leftSecond==0){
                $obj.removeClass('disabled');
                $obj.html('发送验证码');
                leftSecond=60;
                clearInterval(t);
                return;
            }
            leftSecond--;
            $obj.html(leftSecond+'秒后重新发送')
        }, 1000);
    }
    doPost("/site-app/http/app/user/sendSMS.do",{telephoneNumber : phoneNumber,
        randomCode : vcode},sendSuccess);
}

function sendFFCode(){
    var phoneNumber = $("#forget_telephone").val();
    var vcode=$("#forget_validate_code").val();
    var $obj=$("#ffsyzm");
    if($obj.hasClass('disabled')){
        return false;
    }
    var sendSuccess=function(){
        $obj.addClass('disabled');
        var leftSecond=60;
        $obj.html(leftSecond+'秒后重新发送')
        var t=setInterval(function(){
            if(leftSecond==0){
                $obj.removeClass('disabled');
                $obj.html('发送验证码');
                leftSecond=60;
                clearInterval(t);
                return;
            }
            leftSecond--;
            $obj.html(leftSecond+'秒后重新发送')
        }, 1000);
    }
    doPost("/site-app/http/app/user/sendSMS.do",{telephoneNumber : phoneNumber,
        randomCode : vcode},sendSuccess);
}


function getLoginStatus(){
    var f=function(data){
        setLoginState(true);
    };
    doPost('/site-app/http/app/user/getLoginStatus.do?ran='+Math.random(),null,f);
}

function setLogout(){
    var f=function(data){
        setLoginState(false);
        showSuccessDialog("注销成功")
    };
    doPost('/site-app/http/app/user/logout.do',null,f);
}

function createTplView(url,layout,data){
    var tpl=getTpl(url);
    var html = juicer(tpl,data);
    $(layout).html(html);
}

function doPost(url,data,callback){
    $.ajax({
        url : url,
        data :data,
        type : 'POST',
        dataType : 'json',
        async : false,
        success : succFun
    });
    function succFun(datas) {
        if(datas.status==999){

        }
        if(datas.status==500){
            alert(datas.message);
        }
        if(datas.status==200){
            callback(datas);
        }if(datas.status==201){
            setLoginState(false)
        }
    }
}
function setLoginStatus(flg){
  //$.cookie('HBloginStatus', 'flg', { expires: 7 });
  $.cookie('HBloginStatus', flg, { expires: 7 });
}
function getLoginStatus(){
  return $.cookie('HBloginStatus');
}

$(function() {
    var channel=getParameter("channel");
    if(channel!=''){
        document.cookie = "channel='';expires=-1";
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie="channel="+channel+";expires=" + exp.toGMTString();;
    }
});


function ajaxFileUpload(value,callback) {
  var prefix=$(value).val().substring($(value).val().lastIndexOf(".")+1,$(value).val().length);
  var pid=$(value).attr("id");
  if(prefix!='png'&&prefix!='jpg'&&prefix!='jpeg'){
    alert("只能上传jpg，png，jpeg");
    return;
  }
  $.ajaxFileUpload({
    url : '/huoban-sales/http/sales/user/image/api/upload.do', //用于文件上传的服务器端请求地址
    secureuri : false, //一般设置为false
    fileElementId : pid, //文件上传空间的id属性  <input type="file" id="file" name="file" />
    type : 'post',
    dataType : 'json', //返回值类型 一般设置为json
    success : function(data) //服务器成功响应处理函数
    {
      if(data.status==200){
        callback(data.data,pid);
      }else{
        alert(data.message);
      }


    },
    error : function(data)//服务器响应失败处理函数
    {
      alert("上传失败");
    }
  })
  return false;
}
