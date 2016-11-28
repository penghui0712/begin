/**
 * Created by lwb on 2016/7/20.
 */
var company_register_currentId;//全局变量-当前选中元素id
var company_register_currentFileType;//全局变量-当前选中元素类型
$(function(){

	 //点击三证合一，切换界面信息
    $("#rg_cb_hy").click(function(){
        if($(this).is(":checked")){
          $("#com_rg_v1").hide();
          $("#com_rg_v2").show();
        }else{
          $("#com_rg_v1").show();
          $("#com_rg_v2").hide();
        }
      });

     //点击获取验证码，将手机号码传给后端
    $("a[class='rg_ymz']").click(function(){
    	var telephoneNumber = $("#personPhoneNo").val().trim();
    	var data = {"telephoneNumber":telephoneNumber};
    	doPost("/huoban-sales/http/sales/userlogin/sendSMS.do",data);
    });

    //点击下载授权书
    $("a[class='download_btn']").click(function(){

    });
    //成功回调函数
    var companyRegisterSuccess=function(datas){
        window.location.href="register_check.html";
    }

    //点击下一步进行信息校验
    $("#rg_next_btn").click(function(){

    	    var loginName = $("#userName").val().trim();
    	    if(!Utils.checkNotEmpty(loginName)){
    	    	alert("请填写用户名");
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

    	    var corName = $("#corName").val().trim();
    	    if(!Utils.checkNotEmpty(corName)){
    	    	alert("请填写公司名称");
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

    	    var address = $("#address").val().trim();
    	    if(!Utils.checkNotEmpty(address)){
    	    	alert("请填写地址");
    	    	return;
    	    }

    	    var currency = $("#currency").val().trim();
    	    if(!Utils.checkNotEmpty(currency)){
    	    	alert("请填写货币");
    	    	return;
    	    }

    	    var email = $("#email").val().trim();
    	    if(!Utils.checkNotEmpty(email)){
    	    	alert("请填写邮箱");
    	    	return;
    	    }

            var jy_xiangmu =[];
            $('input[name="checkbox"]:checked').each(function(){
            	jy_xiangmu.push($(this).val());
            });
            var saleScope = jy_xiangmu.join(",");
            if(!$("#rg_cb_ly").is(":checked") && !$("#rg_cb_hd").is(":checked") &&
               !$("#rg_cb_px").is(":checked") && !$("#rg_cb_cy").is(":checked") &&
               !$("#rg_cb_j").is(":checked")){
            	alert("请选择经营项目");
            	return;
            }

    	    var certificateOfAuthorization = $("#img4").attr("src");
    	    if(!Utils.checkNotEmpty(certificateOfAuthorization)){
    	    	alert("请上传授权书");
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

    	    var bankPermit = $("#img9").attr("src");
    	    if(!Utils.checkNotEmpty(bankPermit)){
    	    	alert("请上传开户许可证");
    	    	return;
    	    }

    	    if(!$("#rg_cb_fwtk").is(":checked")){
    	    	alert("请选择同意服务条款");
    	    	return;
    	    }

    	    if($("#rg_cb_hy").is(":checked")){

    	    	var creditCode = $("#creditCodeNo").val().trim();
    	        if(!Utils.checkNotEmpty(creditCode)){
    	    	    alert("请填写统一社会信用代码号");
    	    	    return;
    	         }

    			var file8 = $("#img8").attr("src");
    			if(!Utils.checkNotEmpty(file8)){
    				 alert("请上传三证合一图片");
    			     return;
    			}

    			var data={"loginName":loginName,"password":password,"confirmPwd":confirmPwd,"brandName":brandName,"corName":corName,
        	    		"author":author,"idCard":idCard,"cardInPic":cardInPic,"cardOnPic":cardOnPic,"cardPersonPic":cardPersonPic,
        	    		"certificateOfAuthorization":certificateOfAuthorization,"authorMobile":authorMobile,"smsMsg":smsMsg,"country":country,
        	    		"address":address,"currency":currency,"email":email,"saleScope":saleScope,"creditCode":creditCode,
        	    		"bankName":bankName,"bankNo":bankNo,"bankAuthorName":bankAuthorName,"bankPermit":bankPermit,"file8":file8};
        	    doPost("/huoban-sales/http/sales/userlogin/qy_register.do",data,companyRegisterSuccess);

    	    }else{

    	    	var businessLicenceCode = $("#businessLicenseNo").val().trim();
        	    if(!Utils.checkNotEmpty(businessLicenceCode)){
        	    	alert("请填写营业执照注册号");
        	    	return;
        	    }

        	    var organizationalInstitutionCode = $("#OrganizeCodeNo").val().trim();
        	    if(!Utils.checkNotEmpty(organizationalInstitutionCode)){
        	    	alert("请填写组织机构代码号");
        	    	return;
        	    }

        	    var businessLicence = $("#img5").attr("src");
        	    if(!Utils.checkNotEmpty(businessLicence)){
        	    	alert("请上传营业执照");
        	    	return;
        	    }

        	    var organizationalInstitution = $("#img6").attr("src");
        	    if(!Utils.checkNotEmpty(organizationalInstitution)){
        	    	alert("请上传组织机构代码证");
        	    	return;
        	    }


        	    var taxLogin = $("#img7").attr("src");
        	    if(!Utils.checkNotEmpty(taxLogin)){
        	    	alert("请上传税务登记证");
        	    	return;
        	    }

        	    var data={"loginName":loginName,"password":password,"confirmPwd":confirmPwd,"brandName":brandName,"corName":corName,"author":author,"idCard":idCard,
        	    		"cardInPic":cardInPic,"cardOnPic":cardOnPic,"businessLicenceCode":businessLicenceCode,"organizationalInstitutionCode":organizationalInstitutionCode,
        	    		"businessLicence":businessLicence,"organizationalInstitution":organizationalInstitution,"taxLogin":taxLogin,"cardPersonPic":cardPersonPic,
        	    		"certificateOfAuthorization":certificateOfAuthorization,"authorMobile":authorMobile,"smsMsg":smsMsg,"country":country,"address":address,"currency":currency,
        	    		"email":email,"saleScope":saleScope,"bankName":bankName,"bankNo":bankNo,"bankAuthorName":bankAuthorName,"bankPermit":bankPermit};
        	    doPost("/huoban-sales/http/sales/userlogin/qy_register.do",data,companyRegisterSuccess);
    	    }
    });


    var suc=function(url,inputId){
      console.log(IMAGE_PATH+url);
      var $input=$("#"+company_register_currentId);
      $($input).siblings("span").hide();
      $($input).siblings("img").attr("src",IMAGE_PATH+url);
      $($input).siblings("img").show();
      $(".upload").unbind().bind("change",function(){
        uploadImage($(this));
      })
//    $("#"+company_register_currentId).attr("src",url+company_register_currentFileType);

    }

    $(".upload").change(function(){
      uploadImage($(this));
    })

    function uploadImage(input){
      company_register_currentId=$(input).attr("id");//保存当前选中元素
      company_register_currentFileType=$(input).val().substring($(input).val().lastIndexOf("."),$(input).val().length);
      ajaxFileUpload($(input),suc);
    }
})

