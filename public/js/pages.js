$(function(){
	// 左侧导航栏的切换效果
	var aLeftNav=$(".left-nav-tabs li");
	aLeftNav.each(function(){
		$(this).on("click",function(){
			$(this).siblings("li").removeClass('left-nav-active').addClass('left-nav');
			$(this).removeClass('left-nav').addClass('left-nav-active');
		});
		
	});
});