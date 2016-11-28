/**userName
 * Created by lwb on 2016/7/20.
 */
var register_currentId;//全局变量-当前选中元素id
var register_currentFileType;//全局变量-当前选中元素类型
$(function(){
	
    $("a[class='rg_ymz']").click(function(){
    	var telephoneNumber = $("#personPhoneNo").val().trim();
    	var data = {"telephoneNumber":telephoneNumber};
    	doPost("/huoban-sales/http/sales/userlogin/sendSMS.do",data);
    });

    var registerSuccess=function(datas){
	      window.location.href="register_check.html";
	    }
    
    $("#rg_next_btn").click(function(){
    	
        var loginName = $("#userName").val().trim();
        if(!Utils.checkNotEmpty(loginName)){
        	alert("请填写用户名");
        	return;
        }
        
        var lReg = /^\w{8,}/;
        if(!lReg.test(loginName)){
        	alert("用户名不正确");
        	return;
        }
        
        var password = $("#userPwd").val().trim();
        if(!Utils.checkNotEmpty(password)){
        	alert("请填写密码");
        	return;
        }
        //验证密码长度(6-16位)
        if(!Utils.checkPassword(password)){
        	return;
        }
        
        var confirmPwd = $("#confirmPwd").val().trim();
        if(!Utils.checkNotEmpty(confirmPwd)){
        	alert("请填写再次输入密码");
        	return;
        }
        //验证两次密码是否一致
        if(!checkRepeatPassword(password,confirmPwd)){
        	return;
        }

        var brandName = $("#brandName").val().trim();
        if(!Utils.checkNotEmpty(brandName)){
        	alert("请填写品牌名称");
        	return;
        }
        
        var author = $("#chargePersonName").val().trim();
        if(!Utils.checkNotEmpty(author)){
        	alert("请填写负责人姓名");
        	return;
        }
        
        var idCard = $("#idNo").val().trim();
        if(!Utils.checkNotEmpty(idCard)){
        	alert("请填写身份证号");
        	return;
        }
        var iReg = /^([0-9]{17}[0-9X]{1})|([0-9]{15})$/;
        if(!iReg.test(idCard)){
        	alert("身份证号码不正确");
        	return;
        }
        var cardInPic = $("#img1").attr("src");
        if(!Utils.checkNotEmpty(cardInPic)){
        	alert("请上传身份证正面");
        	return;
        }
        
        var cardOnPic = $("#img2").attr("src");
        if(!Utils.checkNotEmpty(cardOnPic)){
        	alert("请上传身份证背面");
        	return;
        }
        
        var cardPersonPic = $("#img3").attr("src");
        if(!Utils.checkNotEmpty(cardPersonPic)){
        	alert("请上传手持身份证照片");
        	return;
        }
        
        var authorMobile = $("#personPhoneNo").val().trim();
        if(!Utils.checkNotEmpty(authorMobile)){
        	alert("请填写负责人手机号");
        	return;
        }
        //验证手机号码格式是否正确
        if(!Utils.checkPhoneNumber(authorMobile)){
        	return;
        }
        

        var smsMsg = $("#randomCode").val().trim();
        if(!Utils.checkNotEmpty(smsMsg)){
        	alert("请填写验证码");
        	return;
        }
        //验证验证码长度(6位)
        if(!checkAuthCode(smsMsg)){
        	return;
        }


        var country = $("#country").val().trim();
        if(!Utils.checkNotEmpty(country)){
        	alert("请填写国家 ");
        	return;
        }
        var cReg = /^\d*$/;
        if(!cReg.test(country)){
        	alert("国家请填写数字 ");
        	return;
        }

        
        var address = $("#address").val().trim();
        if(!Utils.checkNotEmpty(address)){
        	alert("请填写地址");
        	return;
        }
        var aReg = /^\w{10,}$/;
//        if(!aReg.test(address)){
//        	alert("地址未写全");
//        	return;
//        }
        var currency = $("#currency").val().trim();
        if(!Utils.checkNotEmpty(currency)){
        	alert("请填写货币");
        	return;
        }
        var hReg = /^\d*$/;
        if(!hReg.test(currency)){
        	alert("货币请填写数字 ");
        	return;
        }

        
        var email = $("#email").val().trim();
        if(!Utils.checkNotEmpty(email)){
        	alert("请填写邮箱");
        	return;
        }
        var eReg = /^\w+[@]{1}\w+[.]\w+$/;
        if(!eReg.test(email)){
        	alert("邮箱不正确");
        	return;
        }
        
        var jy_xiangmu =[]; 
        $('input[name="jy"]:checked').each(function(){ 
        	jy_xiangmu.push($(this).val()); 
        }); 
        var saleScope = jy_xiangmu.join(",");
        
        if(!$("#rg_cb_ly").is(":checked") && !$("#rg_cb_hd").is(":checked") &&
                !$("#rg_cb_px").is(":checked") && !$("#rg_cb_cy").is(":checked") && 
                !$("#rg_cb_j").is(":checked")){
             	alert("请选择经营项目");
             	return;
        }

        
        var bankName = $("#bankAccount").val().trim();
        if(!Utils.checkNotEmpty(bankName)){
        	alert("请填写开户行");
        	return;
        }
        
        var bankNo = $("#cardNo").val().trim();
        if(!Utils.checkNotEmpty(bankNo)){
        	alert("请填写银行账号");
        	return;
        }
        
        var bankAuthorName = $("#accountName").val().trim();
        if(!Utils.checkNotEmpty(bankAuthorName)){
        	alert("请填写开户者名称");
        	return;
        }
        
        var bankPermit = $("#img4").attr("src");
        if(!Utils.checkNotEmpty(bankPermit)){
        	alert("请上传开户许可证");
        	return;
        }
        
        if(!$("#rg_cb_fwtk").is(":checked")){
        	alert("请选择同意服务条款");
        	return;
        } 
        
        var data={"loginName":loginName,
        		"password":password,
        		"confirmPwd":confirmPwd,
        		"brandName":brandName,
        		"author":author,
        		"idCard":idCard,
        		"cardInPic":cardInPic,
        		"cardOnPic":cardOnPic,
        		"cardPersonPic":cardPersonPic,
        		"authorMobile":authorMobile,
        		"smsMsg":smsMsg,
        	    "country":country,
        	    "address":address,
        	    "currency":currency,
        	    "email":email,
        	    "saleScope":saleScope,
        		"bankName":bankName,
        		"bankNo":bankNo,
        		"bankAuthorName":bankAuthorName,
        		"bankPermit":bankPermit
        };
        
        doPost("/huoban-sales/http/sales/userlogin/qy_register.do",data,registerSuccess);
        
    });
    
    var suc=function(url){
    	console.log(IMAGE_PATH+url);
        var $input=$("#"+register_currentId);
        $($input).siblings("span").hide();
        $($input).siblings("img").attr("src",IMAGE_PATH+url);
        $($input).siblings("img").show();
        $(".upload").unbind().bind("change",function(){
          uploadImage($(this));
        })
//    	company_register_currentDom.attr("src",IMAGE_PATH+url);
//    	$("#"+register_currentId).attr("src",url+register_currentFileType);
    }
    
    $(".upload").change(function(){
        uploadImage($(this));
      })

    function uploadImage(input){
        register_currentId=$(input).attr("id");//保存当前选中元素
        register_currentFileType=$(input).val().substring($(input).val().lastIndexOf("."),$(input).val().length);
        ajaxFileUpload($(input),suc);
    }
  
})

