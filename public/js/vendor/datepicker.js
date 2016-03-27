$(function (){
	$('#service-data').datepicker({
	    language: 'zh-CN',
	    todayHighlight: true,
	    format: 'yyyy-mm-dd',
	    autoclose: true,
	    startDate: '-3d'
	});
	$('#service-data').val(new Date().getTime());
	$('#maintain-data').datepicker({
	    language: 'zh-CN',
	    todayHighlight: true,
	    format: 'yyyy-mm-dd',
	    autoclose: true,
	    startDate: '-3d'
	});
});