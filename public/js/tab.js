$(function(){
	$(".left-nav-tabs").on("click","li",function(){
		$(this).siblings("li").removeClass('left-nav-active').addClass('left-nav');
		$(this).removeClass('left-nav').addClass('left-nav-active');
	});
})