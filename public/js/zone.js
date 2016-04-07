$(function(){
	// 左侧导航栏的切换效果
	var aLeftNav=$(".left-nav-tabs li");
	aLeftNav.each(function(){
		$(this).on("click",function(){
			$(this).siblings("li").removeClass('left-nav-active').addClass('left-nav');
			$(this).removeClass('left-nav').addClass('left-nav-active');
		});
		
	});
	
	//已完成订单待评价
	$(".to-evaluate span").each(function(){
		var object=$(".to-evaluate span");
		var length=object.length;
		var index=$(this).index();
		$(this).on("click",function(){
			
			var i=0;
			for(i=0;i<=index;i++){
				object.eq(i).removeClass('star-icon');
				object.eq(i).addClass("star-icon-active");
			}
			for(i;i<length;i++){
				object.eq(i).removeClass('star-icon-active');
				object.eq(i).addClass('star-icon');
			}
		});
		
	})
});