function showComments(id,container){
	var token=$.cookie("key");
	var dataValue;
	container=="comments"?dataValue={
		'method':'query',
		'token':token,
		'user_id':id
	} : dataValue={
		'method':'query',
		'token':token,
		'worker_id':id
	};

	$.ajax({
		url:'http://127.0.0.1:8081/comment',
		type:'POST',
		data:dataValue,
		success:function(data){
			console.log(data);
			if(data.result){
				data.data.map(function(elem){
					var orderId=elem.order_id;
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
                    var bookTime;
                    $.ajax({
                    	url:"http://127.0.0.1:8081/order",
                    	type:"POST",
                    	cache:false,
                    	async:false,
                    	data:{
                    		'method':'query',
							'token':token,
							"order_id":orderId
                    	},
                    	success:function(data){
                    		console.log(data);
                    		bookTime=data.data[0].book_time;
                    		console.log("bookTime1",bookTime);
                    	}
                    });
                    var userinfo="<div class='uinfo'>"+
                   			 '<img src="'+elem.user_id.image_url+'" alt="photo">'+
                   			 "<span>"+elem.user_id.name+"</span>"
                    +"</div>";
					$('<div class="evaluation clearfix">'+
	                    '<div class="evaluation-con clearfix">'+
	                    	(container=="workerCommentList" ? userinfo:"")+
	                       
	                        '<div class="content-box">'+
		                        '<div class="comment-info  clearfix">'+
		                            "<a href='"+(container=='comment'?'orderDetail#':'workerOrderDetail#')+orderId+"#4'><h4 style='float:left;'>"+elem.service_id.name+"</h4><span class='booktime'>"+
		                            bookTime+'</span></a>'+
		                        '</div>'+
		                        '<div>'+star+
		                         '</div>'+
		                        '<div class="info">'+
		                            '<p>'+(elem.comment=="None" ? "":elem.comment )+'</p>'+
		                            '<span class="time">['+elem.comment_time+']</span>'+
		                        '</div>'+   
	                        '</div>'+ 
	                        '<div class="evaluation-con add clearfix" value='+elem.id+'>'+
	                      
	                    	'</div>'+
	                    '</div>'+
	                   
	                '</div>').appendTo('#'+container);
					if(elem.add_comment!="None"){
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
}
$(function(){
	// $('.show-comment').click(function(){
	// 	var service_type=$('li[role=presentation].active').data('id');
	// 	showComment(service_type);
	// });
	$("#my_comments").on("click",function(){
		showComments($.cookie("uid"),"comments");
	});
	$("#worker_comments").on("click",function(){
		console.log("click worker_comments");
		showComments($.cookie("uid"),"workerCommentList");
	})
});
