$(function(){
	$('#signupForm').bootstrapValidator({
		message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
		fields:{
			name:{
				message:"请填写真实姓名",
				validators:{
					notEmpty:{
						message:'姓名不能为空',
					}
				}
			},
			username:{
				message:'请填写邮箱地址',
				validators:{
					notEmpty:{
						message:'用户名不能为空',
					},
					stringLength:{
						min: 6,
						max: 30,
						message:'用户名必须多于6个字符，少于30个字符'
					}
				}
			},
			password:{
				validators:{
					notEmpty:{
						message:'密码不能为空'
					},
					identical:{
						field:'confirmPassword',
						message:'密码和确认密码不一致'
					},
					stringLength:{
						min: 6,
						max: 30,
						message:'密码必须多于6个字符，少于30个字符'
					}
				}
			},
			confirmPassword:{
				validators:{
					notEmpty:{
						message:'确认密码不能为空'
					},
					identical:{
						field:'password',
						message:'密码和确认密码不一致'
					}
				}
			},
			phoneNum:{
				validators:{
					notEmpty:{
						message:'联系方式不能为空'
					}
				}
			},
			address:{
				validators:{
					notEmpty:{
						message:'地址不能为空'
					}
				}
			}
		}
	})
	$('#signinForm').bootstrapValidator({
		message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
		fields:{
			username:{
				validators:{
					notEmpty:{
						message:'用户名不能为空',
					}
				}
			},
			password:{
				validators:{
					notEmpty:{
						message:'密码不能为空'
					}
				}
			},
			role: {
                validators: {
                    notEmpty: {
                        message: '角色不能为空'
                    }
                }
            }
		}

	})
	$('#signin-btn').on('click',function(event){
		console.log("111111111111");
		$('#signinForm').bootstrapValidator('validate');
		if($('#signinForm .glyphicon-remove').length==0){
			$.ajax({
				url:"http://127.0.0.1:8081/user/signin",
				data:{
					"method":"signin",
					"username":$.trim($('#username').val()),
					"password":$.md5($.trim($('#password').val()))
					// "password":$.trim($("#password").val())
				},
				type:"post",
				success:function(data, textStatus, request){
					if(data.result){
						alert('登录成功！');
						$('#signin').modal('hide');
						$.cookie('key',data.user.token);
						$.cookie('uid',data.user.id);
						$.cookie('uname',data.user.name);
						$.cookie('image_url',data.user.image_url);
						$('#navbar-default ul').hide();
						$('#navbar-default div').show();
						$('#navbar-default > div > img').attr('src',data.user.image_url);
						$('#navbar-default > div > .name').html(data.user.name).attr('href','/zone#'+data.user.id);
						$.ajax({
							url:"http://127.0.0.1:8081/service",
							data:{
								"method":"query",
								"type":"category",
								"id":0,
								'token':$.cookie('key')
							},
							type:"post",
							statusCode: {
							    403: function() {
							      location.href = "";
							    }
							},
							success:function(data){

								console.log("success",data);
							},
							error:function(data){
								console.log("error",data);
							}
						});
					}else if(data.code==1){
						alert('用户名或密码错误！');
					}
				},
				error: function (data) {
			        alert(data);
			   }
			});
		}
	});
	$('#inputusername').on('blur',function(){
		$.ajax({
			url:"http://127.0.0.1:8081/user/signup",
			data:{
				"method":"check_user",
				"username":$.trim($('#inputusername').val())
			},
			type:"post",
			success:function(data){
				console.log("success",data);
				if(!data.result){
					$('#helpBlock1').html('改用户名已存在！');
					$('#helpBlock1').addClass('red');
				}
			},
			error:function(data){
				console.log("err",data);
			}
		});
	})
	$('#signup-btn').on('click',function(){
		$('#signupForm').bootstrapValidator('validate');
		var ajaxDate={ 
			"name":$.trim($("#inputname").val()),
			"email":$.trim($("#inputusername").val()),
			"phone":$.trim($("#inputphone").val()),
			"password":$.md5($.trim($("#inputpsd").val())),
			"address":$.trim($("#inputaddress").val()),
			"status":1
		}
		if($('#signupForm .glyphicon-remove').length==0){
			$.ajax({
				url:"http://127.0.0.1:8081/user/signup",
				type:"POST",
				contentType:"application/x-www-form-urlencoded",
				data:{
					"method":"signup",
					"data": JSON.stringify(ajaxDate)
				},
				success:function(data){
					if(data.result){
						alert('注册成功！');
						$('#signup').modal('hide');
					}else{
						alert("error");
					}
				}
			})
		}
	});
	if($.cookie('key')!='null'){
		$('#navbar-default ul').hide();
		$('#navbar-default div').show();
		$('#navbar-default > div > img').attr('src',$.cookie('image_url'));
		$('#navbar-default > div > .name').html($.cookie('uname')).attr('href','/zone#'+ $.cookie('uid'));
	}
	$('#quit').on('click',function(){
		$.cookie('key',null);
		$.cookie('uid',null);
		$.cookie('uname',null);
		$.cookie('image_url',null);
	})
});