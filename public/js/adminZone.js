$(function(){
  
  //--------------初始化页面
  // var strUrl=window.location.href;
  // console.log(strUrl);
  // var id=strUrl.split("#")[1];
  // console.log(id);
  var id=parseInt($.cookie("uid"));
  var token=$.cookie("key");
  function getPagesInfo(data){
    $.cookie("image_url",data.data[0].image_url);
    // console.log(data);
    $(".avatar-view img").attr("src",data.data[0].image_url);
    $("#name_input").attr("value",data.data[0].name);
    $("#tel_input").attr("value",data.data[0].phone);
    $("#address_input").attr("value",data.data[0].address);
    switch(data.data[0].gender){
      case '0':break;
      case '1':$("#gender").prop("checked","checked");break;
      case '2':$("#gender1").prop("checked","checked");break;
    }
    // $(".balance").html(" 您的账户余额为 "+data.data[0].balance+" 元");
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
  // function getData(data){
  //   return data;
  // }
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
  //- ----------修改基本信息
  function modifyInfo(name,phone,gender,address){
    console.log("2 clicked");
    console.log(name,phone,gender,address);
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
    console.log("1 clicked");
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
  
  

});