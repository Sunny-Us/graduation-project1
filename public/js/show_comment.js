function showComment(service_type){
	$('#evaluation-list').children().remove();
	var service=[];
	$.ajax({
		url:'http://127.0.0.1:8081/service',
		type:'POST',
		data:{
			'method':'query',
			'type':'service',
			'type_id':service_type
		},
		success:function(data){
			if(data.result){
				data.data.map(function(item){
					service.push(parseInt(item.id));
				});
				console.log(service);
				$.ajax({
					url:'http://127.0.0.1:8081/comment',
					type:'POST',
					data:{
						'method':'query',
						'token':$.cookie('key'),
						'service_id':JSON.stringify(service)
					},
					success:function(data){
						if(data.result){
							data.data.map(function(elem){
								var star;
								for(i=0;i<elem.score;i++){
									if(i==0){
										star='<span class="star-icon-active"></span>';
									}else{
										star+='<span class="star-icon-active"></span>';
									}
		                         }
		                         for (i=5;i>elem.score;i--){
		                          	star+='<span class="star-icon"></span>';
		                          }	
								$('<div class="evaluation clearfix">'+
				                    '<div class="evaluation-con clearfix">'+
				                        '<img src="'+elem.user_id.image_url+'" alt="photo">'+
				                        '<div class="content-box">'+
					                        '<div class="user-info">'+
					                            '<span class="user-name">'+elem.user_id.name+'</span>'+
					                            '<div class="star-box">'+star
					                          +'</div>'+
					                        '</div>'+
					                        '<div class="info">'+
					                            '<p>'+elem.comment+'</p>'+
					                            '<span class="time">日期：'+elem.comment_time+'</span>'+
					                        '</div>'+   
				                        '</div>'+
				                    '</div>'+
				                    '<div class="evaluation-con add clearfix" value='+elem.id+'>'+
				                      
				                    '</div>'+
				                '</div>').appendTo('#evaluation-list');
								if(elem.add_comment){
									$('<div class="content-box">'+
				                        '<p class="add-info importent">追加评论:</p>'+
				                        '<div class="info">'+
				                            '<p>'+elem.add_comment+'</p>'+
				                        '</div>'+    
				                    '</div>').appendTo('.evaluation-con.add[value='+elem.id+']');
								}
							});
						}else{
							$('<p class="nocomment">暂无评论！</p>').appendTo('#evaluation-list');
						}
					},
					error:function(data){
						alert('请登录后再查看！');
					}
				});
			}else{
				alert('失败！');
			}

		},
		error:function(data){
			console.log(data);
		}
	});
}
$(function(){
	$('.show-comment').click(function(){
		var service_type=$('li[role=presentation].active').data('id');
		showComment(service_type);
	});

});
