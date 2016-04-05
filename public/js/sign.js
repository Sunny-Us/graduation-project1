$(function(){
	$('#signupForm').bootstrapValidator({
		message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
		fields:{
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
			}
		}

	})
	$('#signin-btn').on('click',function(){
		$.ajax({
			url:"http://123.125.130.103:8081/signin",
			data:{
				"method":"signin",
				"username":$.trim($('#username').val()),
				"password":$.md5($.trim($('#password').val()))
			},
			type:"post",
			success:function(data){
				if(data.result){

				}else if(data.code==1){
					alert('用户名或密码错误！');
				}
			},
			error:function(data){
				console.log('error',data);
			}
		});
	});
	$('#inputusername').on('blur',function(){
		$.ajax({
			url:"http://123.125.130.103:8081/user/signup",
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
		var metric = {
			"name":$.trim($("#inputname").val()),
			"email":$.trim($("#inputusername").val()),
			"phone":$.trim($("#inputphone").val()),
			"password":$.md5($.trim($("#inputpsd").val())),
			"status":1
		}
		$.ajax({
			url:"http://123.125.130.103:8081/user/signup",
			contentType:"application/x-www-form-urlencoded",
			data:{
				"method":"signup",
				"data":metric
			},
			type:"post",
			success:function(data){
				if(data.result){
					alert('注册成功！');
				}else{
					alert("error");
				}
			}
		})
	});
});