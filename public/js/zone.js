$(function(){
	// 左侧导航栏的切换效果
	var aLeftNav=$(".left-nav-tabs li");
	// aLeftNav.each(function(){
	// 	$(this).on("click",function(){
	// 		$(this).siblings("li").removeClass('left-nav-active').addClass('left-nav');
	// 		$(this).removeClass('left-nav').addClass('left-nav-active');
	// 	});
		
	// });
	$(".left-nav-tabs").on("click","li",function(){
		$(this).siblings("li").removeClass('left-nav-active').addClass('left-nav');
		$(this).removeClass('left-nav').addClass('left-nav-active');
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
		
	});
});

$(function(){
	//--------------初始化页面
	// var strUrl=window.location.href;
	// console.log(strUrl);
	// var id=strUrl.split("#")[1];
	// console.log(id);
	var id=parseInt($.cookie("uid"));
	var token=$.cookie("key");
	function getPagesInfo(data){
	  $("#name_input").attr("value",data.data[0].name);
	  $("#tel_input").attr("value",data.data[0].phone);
	  $("#address_input").attr("value",data.data[0].address);
	  switch(data.data[0].gender){
	    case '0':break;
	    case '1':$("#gender").prop("checked","checked");break;
	    case '2':$("#gender1").prop("checked","checked");break;
	  }
	  $(".balance").html(" 您的账户余额为 "+data.data[0].balance+" 元");
	}
	function getPsd(data){
	  var oldPsd=data.data[0].password;
	  var newPsd=$.md5($("#old_psd").val());
	  if(oldPsd==newPsd){
	    $(".psd-warning").css("display","none");
	    $("#submit_psd").on("click",function(){
	      changePsd();
	    });
	  }else{
	    $(".psd-warning").css("display","block");
	    $("#submit_psd").unbind("click");
	  }
	}
	function getData(data){
		return data;
	}
	function initial(id,operation){
	 var Data = {};
	 $.ajax({
	    url:"http://127.0.0.1:8081/user/user",
	    type:"post",
	    data:{"method":"query","id":id,"token":token},
	    success:function(data){
	      if(operation=="getPagesInfo"){
	        getPagesInfo(data);
	      }else if(operation == "getPsd"){
	        getPsd(data);
	      }
	    }
	  });
	}
	initial(id,"getPagesInfo");
	//- ----------修改信息
	function modifyInfo(name,phone,gender,address){
	  // console.log(name,phone,gender,address);
	  // var cookie=$.cookie("key");
	  $.ajax({
	    url:"http://127.0.0.1:8081/user/user",
	    type:"post",
	    data:{"method":"update","token":token,"data":JSON.stringify([{[id]:{"name":name,"phone":phone,"gender":gender,"address":address}}])},
	    success:function(data){
	      if(data.result){
	        alert("修改信息成功");
	      }
	      
	    },
	    erro:function(data){
	      // console.log(data);
	      alert("修改信息失败");
	    }
	  });
	}
	$("#submit_baseInfo").on("click",function(){
	  var newname=$.trim($("#name_input").val());
	  var newtel=$.trim($("#tel_input").val());
	  var newgender=$.trim($('input:radio[name="gender"]:checked').val());
	  // console.log("newgender",newgender);
	  var newaddress=$.trim($("#address_input").val());
	  modifyInfo(newname,newtel,newgender,newaddress);
	});
	//-------------修改密码
	function changePsd(){
	  
	  var newpsd=$.md5($.trim($("#new_psd").val()));
	  $.ajax({
	    url:"http://127.0.0.1:8081/user/user",
	    type:"post",
	    data:{"method":"update","token":token,"data":JSON.stringify([{[id]:{"password":newpsd}}])},
	    success:function(data){
	      if(data.result){
	        alert("修改信息成功");
	      }
	      
	    },
	    erro:function(data){
	      // console.log(data);
	      alert("修改信息失败");
	    }
	  });
	}
	$("#old_psd").on("blur",function(){
	  initial(id,"getPsd");
	});
	$("#reinput_psd").on("blur",function(){
	  var repsd=$.trim($(this).val());
	  var newpsd=$.trim($("#new_psd").val());
	  if(repsd==newpsd){
	    $(".reinput-warning").css("display","none");
	     $("#submit_psd").on("click",function(){
	      changePsd();
	    });
	  }else{
	    $(".reinput-warning").css("display","block");
	    $("#submit_psd").unbind("click");
	  }
	});

	$("#submit_psd").on("click",function(){
	  changePsd();
	});
	//删除订单
	function deleteOrder(order_id){
		console.log(order_id);
		$.ajax({
			url:"http://127.0.0.1:8081/order",
			type:"post",
			data:{
				"method":"delete",
				"data":JSON.stringify({"id":order_id}),
				"token":token
			},
			success:function(data){
				if(data.result){
					alert("删除成功");
					$("#list"+order_id).remove();
				}
			}
		});
	}
	//获取订单列表 start
	function getOrders(array,wrap){
		console.log("enterneternetetnekkdjfd");
		$.ajax({
			url:"http://127.0.0.1:8081/order",
			type:"post",
			data:{
				"method":"query",
				"user_id":id,
				"token":token,
				"status":JSON.stringify(array)
			},
			success:function(data){
				console.log(data);
				var listNum=data.data.length;
				var i=0;
				$(".order-going-ul").empty();
				$(".order-done-ul").empty();
				for(i=0;i<listNum;i++){
					var status=data.data[i].status;
					console.log("status:",status);
					var statusDesc;
					var order=data.data[i].id;
					console.log(i,order);
					switch(status){
						case "1":statusDesc="已下单...";break;
						case "2":statusDesc="已受理...";break;
						case "3":statusDesc="进行中...";break;
						case "4":statusDesc="已完成";break;
					}
					$("<li class='order-list' id='list"+data.data[i].id +"' data-class='items"+ data.data[i].status +"'>"+
                        "<div class='row-fluid'>"+
                           "<section class='order-item'>"+
                              "<span class='order-name'>"+data.data[i].service_id.name +"</span>"+
                              "<span class='order-state'>"+ statusDesc +"</span>"+  
                              "<span class='order-time'>"+"预约时间："+data.data[i].book_time +"</span>"+
                              "<input type='button' value='删除' class='delete-order-btn'>"+
                              "<input type='button' value='修改' class='modify-order-btn'>"+
                              "<input type='button' value='评价' class='evaluate-order-btn'>"+
                              "<span class='order-people'>"+"上门师傅："+data.data[i].worker_id.name +"</span>" +
                            "</section>"+   
                        "</div>"+
                    "</li>").appendTo($(wrap));
                    var numStatus=parseInt(status);
                    if(numStatus>1 && numStatus<4){
                    	console.log("numStatus",numStatus);
                    	$("#list"+data.data[i].id).children("div.row-fluid").children("section.order-item").children(".delete-order-btn").hide();
                    	$("#list"+data.data[i].id).children("div.row-fluid").children("section.order-item").children(".modify-order-btn").hide();
                    	$("#list"+data.data[i].id).children("div.row-fluid").children("section.order-item").children(".evaluate-order-btn").hide();
                    }else if(numStatus == 1){
                    	$("#list"+data.data[i].id).children("div.row-fluid").children("section.order-item").children(".delete-order-btn").show();
                    	$("#list"+data.data[i].id).children("div.row-fluid").children("section.order-item").children(".modify-order-btn").show();
                    	$("#list"+data.data[i].id).children("div.row-fluid").children("section.order-item").children(".evaluate-order-btn").hide();
                    }else if(numStatus == 4 && data.data[i].comment =="0"){
                    	$("#list"+data.data[i].id).children("div.row-fluid").children("section.order-item").children(".delete-order-btn").hide();
                    	$("#list"+data.data[i].id).children("div.row-fluid").children("section.order-item").children(".modify-order-btn").hide();
                    	$("#list"+data.data[i].id).children("div.row-fluid").children("section.order-item").children(".evaluate-order-btn").show();
                    }
                    //删除订单
					$("section.order-item").on("click",".delete-order-btn",function(){
						var orderId=$.trim($(this).parent("section.order-item").parent("div.row-fluid").parent("li.order-list").attr("id")).slice(4);
						deleteOrder(orderId);
					});
					//进入订单详情页 && 更改订单
					$("div.row-fluid").on("click",".order-item",function(){
						var orderid=$.trim($(this).parent("div.row-fluid").parent("li.order-list").attr("id")).slice(4);
						var orderstatus=$.trim($(this).parent("div.row-fluid").parent("li.order-list").attr("data-class")).slice(5);
						window.location.href="orderDetail#"+orderid+"#"+orderstatus;
						// window.location.href="orderDetail#1#1";
					});
					// $("div.row-fluid").on("click",".modify-order-btn",function(){
					// 	window.location.href="orderDetail#"+order+"#"+status;
					// });
					// $("div.row-fluid").on("click",".evaluate-order-btn",function(){
					// 	window.location.href="orderDetail#"+order+"#"+status;
					// });
				}
			}

		});
	}
	//获取订单列表 end

	$("#my_orders").on("click",function(){
		getOrders([1,2,3],"ul.order-going-ul");
	});
	$("#orders_going").on("click",function(){
		getOrders([1,2,3],"ul.order-going-ul");
	});
	$("#orders_done").on("click",function(){
		getOrders([4],"ul.order-done-ul");
	});

	
	

});