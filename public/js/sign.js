$(function(){
	//-----------------登录
	$('#signin-btn').on('click',function(){
		$('#signinForm').bootstrapValidator('validate');
		if($('#signinForm .glyphicon-remove').length==0){
			console.log($.md5($.trim($('#password').val())));
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
						$.cookie('address',data.user.address);
						$.cookie('phone',data.user.phone);
						$.cookie('balance',data.user.balance);
						$.cookie('role',data.user.role);
						$('#navbar-default ul').hide();
						$('#navbar-default div').show();
						$('#navbar-default .image_url').attr('src',data.user.image_url);
						$('#navbar-default > div > .name').html(data.user.name);
						if(data.user.role==0){
							$('#navbar-default > div > .name').attr('href','/zone');
						}else if(data.user.role==1){
							$('#navbar-default > div > .name').attr('href','/workerZone');
						}else if(data.user.role==2){
							$('#navbar-default > div > .name').attr('href','/adminZone');
							// $('<a class="admin-zone" href="/admin-user">主界面</a>').insertBefore('#navbar-default > div > img');
							location.href='/admin-user';
						}
					}else{
						if(data.code==1){
							alert('登录名或密码错误！');
						}else{
							alert('登录失败！');
						}
					}
				},
				error: function (data) {
			        alert(data);
			   }
			});
		}
	});
	$('#navbar-default > div > .name').on('click',function(){
		if($.cookie('role')==0){
			$('#navbar-default > div > .name').attr('href','/zone');
		}else if($.cookie('role')==1){
			$('#navbar-default > div > .name').attr('href','/workerZone');
		}else if($.cookie('role')==2){
			$('#navbar-default > div > .name').attr('href','/adminZone');
			// $('<a class="admin-zone" href="/admin-user">主界面</a>').insertBefore('#navbar-default > div > img');
		}
	});
	
	$('#navbar-default .image_url').attr('src',$.cookie('image_url'));
	//---------------注册验证
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
					$('#inputusername').parent('div').parent('div').removeClass('has-success').addClass('has-error');
					$('#inputusername + i').removeClass('glyphicon-ok').addClass('glyphicon-remove');
					alert('改用户名已存在！请重新输入');
					
				}
			},
			error:function(data){
				console.log("err",data);
			}
		});
	})
	//---------------注册
	$('#signup-btn').on('click',function(){
		$('#signupForm').bootstrapValidator('validate');
		var ajaxDate={ 
			"name":$.trim($("#inputname").val()),
			"email":$.trim($("#inputusername").val()),
			"phone":$.trim($("#inputphone").val()),
			"password":$.md5($.trim($("#inputpsd").val())),
			"address":$.trim($("#inputaddress").val()),
			"gender":$('.gender:radio:checked').val(),
			"role":0,
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
						alert("注册失败！");
					}
				},
				error:function(data){
					console.log(data);
				}
			})
		}
	});
	if($.cookie('key')&&$.cookie('key')!='null'){
		$('#navbar-default ul').hide();
		$('#navbar-default div').show();
		$('#navbar-default > div > img').attr('src',$.cookie('image_url'));
		$('#navbar-default > div > .name').html($.cookie('uname')).attr('href','/zone');
	}else{
		$('#navbar-default ul').show();
		$('#navbar-default div').hide();
	}
	$('#quit').on('click',function(){
		$.cookie('key',null);
		$.cookie('uid',null);
		$.cookie('uname',null);
		$.cookie('image_url',null);
		$.cookie('phone',null);
		$.cookie('address',null);
		$.cookie('balance',null);
		$.cookie('role',null);
		window.location.href="/";
	})
});