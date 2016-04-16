$(function(){
	$('#signupForm').bootstrapValidator({
		message: '不能为空',
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
						message:'用户名不能为空'
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
			},
			gender:{
				validators:{
					notEmpty:{
						message:'性别不能为空'
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
	$('#insertForm').bootstrapValidator({
		message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
		fields:{
			name:{
				validators:{
					notEmpty:{
						message:'服务名称不能为空',
					}
				}
			},
			image_url:{
				validators:{
					notEmpty:{
						message:'图片地址不能为空'
					}
				}
			},
			title: {
                validators: {
                    notEmpty: {
                        message: '小标题不能为空'
                    }
                }
            },
            type_id:{
            	validators:{
            		notEmpty:{
            			message:'服务类型不能为空'
            		}
            	}
            },
            price:{
            	validators:{
            		notEmpty:{
            			message:'价格不能为空'
            		}
            	}
            }
		}
	})
});